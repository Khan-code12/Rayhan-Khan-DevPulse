import type { Request, Response } from 'express';
import { IssueService } from './issue.service.js';
import { sendSuccess } from '../../utils/response.js';

export class IssueController {
  static insert = async (req: Request, res: Response) => {
    const data = await IssueService.logNewIssue(req.body, req.user!.id);
    return sendSuccess(res, 201, 'Issue created successfully', data);
  };

  static fetchAll = async (req: Request, res: Response) => {
    const data = await IssueService.collectAllIssues(req.query);
    return sendSuccess(res, 200, 'Issues listed contextually', data);
  };

  static fetchOne = async (req: Request, res: Response) => {
    const data = await IssueService.collectSingleIssue(Number(req.params.id));
    if (!data) {
      res.status(404).json({ success: false, message: 'Requested resource does not exist' });
      return;
    }
    return sendSuccess(res, 200, 'Issue profile data targeted', data);
  };

  static updateData = async (req: Request, res: Response) => {
    const data = await IssueService.dispatchUpdates(Number(req.params.id), req.user!.id, req.user!.role, req.body);
    return sendSuccess(res, 200, 'Issue updated successfully', data);
  };

  static destroyData = async (req: Request, res: Response) => {
    const deleted = await IssueService.deleteIssueData(Number(req.params.id));
    if (!deleted) {
      res.status(404).json({ success: false, message: 'Requested resource does not exist' });
      return;
    }
    return sendSuccess(res, 200, 'Issue deleted successfully');
  };
}