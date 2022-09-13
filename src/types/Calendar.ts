import { Employee } from "./Employee";
import { Job } from "./Job";

export interface Calendar {
  id?: number;
  contacts?: string[];
  address?: string;
  start_date?: Date;
  end_date?: Date;
  notes?: string;
  employee?: Employee,
  job?: Job
}