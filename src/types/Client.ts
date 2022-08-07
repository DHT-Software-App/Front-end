export interface Client {
  id?: number;
  firstname?: string;
  lastname?: string;
  email_address_1?: string;
  email_address_2?: string;
  contacts?: string[];
  state?: string;
  street?: string;
  city?: string;
  zip?: number;
  company?: string;
}