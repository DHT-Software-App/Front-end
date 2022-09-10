import { Client } from "./Client";
import { Customer } from "./Customer";
import { InsuranceCompany } from "./InsuranceCompany";
import { WorkType } from "./WorkType";

export interface Job {
  id?: number;
  policy_number?: string;
  claim_number?:string;
  notes?:string;
  date_of_loss?:Date;
  type_of_loss?:string;
  status?: 'new' | 'on going' | 'completed';
  state?: string;
  street?: string;
  city?: string;
  zip?: number;
  company?: string;
  client?: Client;
  customer?: Customer;
  insurance?: InsuranceCompany; 
  work_type?: WorkType;
}