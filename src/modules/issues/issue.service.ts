import { pool } from '../../config/db.js';
import { buildDynamicFilters } from '../../utils/queryBuilder.js';
import { UserService } from '../users/user.service.js';
import { IAppError } from '../../interfaces/common.interface.js';

export class IssueService {
  static async logNewIssue(body: any, reporterId: number) {
    const { title, description, type } = body;
    const query = `
      INSERT INTO issues (title, description, type, status, reporter_id)
      VALUES ($1, $2, $3, 'open', $4)
      RETURNING *;
    `;
    const { rows } = await pool.query(query, [title, description, type, reporterId]);
    return rows[0];
  }

  // Dual-query dataset optimization algorithm to extract lists securely WITHOUT SQL JOINs
  static async collectAllIssues(queries: any) {
    const { type, status, sort = 'newest' } = queries;
    const { query: partialQuery, values } = buildDynamicFilters(`SELECT * FROM issues WHERE 1=1`, { type, status });
    
    const orderingOrder = sort === 'oldest' ? 'ASC' : 'DESC';
    const dynamicFinalQuery = `${partialQuery} ORDER BY created_at ${orderingOrder};`;

    const { rows: issues } = await pool.query(dynamicFinalQuery, values);
    if (issues.length === 0) return [];

    const uniqueIds = Array.from(new Set(issues.map(i => i.reporter_id)));
    const reporters = await UserService.findBatchUsers(uniqueIds);
    const lookupMap = new Map(reporters.map(r => [r.id, r]));

    return issues.map(issue => {
      const { reporter_id, ...issueContent } = issue;
      return {
        ...issueContent,
        reporter: lookupMap.get(reporter_id) || null,
      };
    });
  }

  static async collectSingleIssue(id: number) {
    const { rows } = await pool.query(`SELECT * FROM issues WHERE id = $1;`, [id]);
    const issue = rows[0];
    if (!issue) return null;

    const dataProfiles = await UserService.findBatchUsers([issue.reporter_id]);
    const { reporter_id, ...issueContent } = issue;
    
    return {
      ...issueContent,
      reporter: dataProfiles[0] || null,
    };
  }

  static async dispatchUpdates(id: number, userId: number, role: string, fields: any) {
    const record = await pool.query(`SELECT * FROM issues WHERE id = $1;`, [id]);
    const existingIssue = record.rows[0];

    if (!existingIssue) {
      const err: IAppError = new Error('Requested resource does not exist');
      err.statusCode = 404;
      throw err;
    }

    if (role !== 'maintainer') {
      if (existingIssue.reporter_id !== userId) {
        const err: IAppError = new Error('Valid token but insufficient role/permissions');
        err.statusCode = 403;
        throw err;
      }
      if (existingIssue.status !== 'open') {
        const err: IAppError = new Error('Business logic conflict: editing resolved issue or not matching open state status');
        err.statusCode = 409;
        throw err;
      }
      delete fields.status; // Contributor overrides removal loop protection execution logic
    }

    const updatesArray: string[] = [];
    const valuesArray: any[] = [];
    let counter = 1;

    Object.entries(fields).forEach(([k, v]) => {
      if (v !== undefined) {
        updatesArray.push(`${k} = $${counter}`);
        valuesArray.push(v);
        counter++;
      }
    });

    if (updatesArray.length === 0) return existingIssue;

    valuesArray.push(id);
    const script = `UPDATE issues SET ${updatesArray.join(', ')} WHERE id = $${counter} RETURNING *;`;
    const finalResult = await pool.query(script, valuesArray);
    return finalResult.rows[0];
  }

  static async deleteIssueData(id: number): Promise<boolean> {
    const { rowCount } = await pool.query(`DELETE FROM issues WHERE id = $1;`, [id]);
    return (rowCount ?? 0) > 0;
  }
}