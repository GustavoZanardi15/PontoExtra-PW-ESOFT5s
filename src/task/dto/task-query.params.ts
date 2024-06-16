import { Status } from "../entities/task.entity";

export interface TaskQueryParams {
  longestDescription?: boolean;
  startConclusionDate?: string;
  endConclusionDate?: string;
}
