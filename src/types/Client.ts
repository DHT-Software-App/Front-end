export interface Client {
  id?:number;
  person_contact:string;
  company:string;
  email:string;
  street:string;
  zip:number;
  client_status:boolean;
  id_city?:number;
  id_state?:number;
}