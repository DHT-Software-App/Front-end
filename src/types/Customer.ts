export interface Customer {
  id?:number;
  first_name:string;
  last_name:string;
  email:string;
  street:string;
  zip:number;
  id_city?:number;
  id_state?:number;
}