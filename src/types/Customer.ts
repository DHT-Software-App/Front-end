export interface Customer {
  id?:number;
  firstname?:string;
  lastname?:string;
  insured_firstname?:string;
  insured_lastname?:string;
  email_address?:string;
  contacts?: string[];
  state?:string;
  street?:string;
  city?:string;
  zip?:number;
  has_insured?:boolean;
}