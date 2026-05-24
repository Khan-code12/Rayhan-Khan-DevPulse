import { ISSUE_TYPES } from '../../constants/issueTypes.js';
import { ISSUE_STATUS } from '../../constants/issueStatus.js';

export type TIssueType = typeof ISSUE_TYPES[keyof typeof ISSUE_TYPES];
export type TIssueStatus = typeof ISSUE_STATUS[keyof typeof ISSUE_STATUS];

export interface IIssueNode {
  id: number;
  title: string;
  description: string;
  type: TIssueType;
  status: TIssueStatus;
  reporter_id: number;
  created_at: Date;
  updated_at: Date;
}