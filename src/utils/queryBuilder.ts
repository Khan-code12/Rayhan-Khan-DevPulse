export const buildDynamicFilters = (baseSql: string, filters: Record<string, any>) => {
  let query = baseSql;
  const values: any[] = [];
  let index = 1;

  Object.entries(filters).forEach(([key, val]) => {
    if (val && key !== 'sort') {
      query += ` AND ${key} = $${index}`;
      values.push(val);
      index++;
    }
  });

  return { query, values };
};