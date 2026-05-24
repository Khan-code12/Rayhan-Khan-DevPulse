export const validateIssueCreation = (body: any): string | null => {
  const { title, description, type } = body;
  if (!title || title.length > 150) return 'Short descriptive headline maximum 150 characters is required';
  if (!description || description.length < 20) return 'Detailed explanation minimum 20 characters must be provided';
  if (type !== 'bug' && type !== 'feature_request') return 'Type mapping parameter must validate to bug or feature_request constants';
  return null;
};

export const validateIssueModification = (body: any): string | null => {
  const { title, description, type, status } = body;
  if (title && title.length > 150) return 'Updated headline bounds cannot exceed 150 characters';
  if (description && description.length < 20) return 'Updated text structural details framework requires minimum 20 length';
  if (type && type !== 'bug' && type !== 'feature_request') return 'Type selection mapping is invalid';
  if (status && status !== 'open' && status !== 'in_progress' && status !== 'resolved') return 'Status workflows rules are invalid';
  return null;
};