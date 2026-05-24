export interface IAppError extends Error {
  statusCode?: number;
  errors?: any;
}