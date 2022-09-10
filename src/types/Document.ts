import { DocumentType } from "./DocumentType";
import { Job } from "./Job";

export interface Document {
  id?:number;
  description?: string;
  url?: string;
  job?: Job;
  document_type?: DocumentType;
}