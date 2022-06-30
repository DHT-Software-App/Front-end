export interface Employee {
	id?: number;
	firstname: string;
	lastname: string;
	street: string;
	zip: number;
	email:string;
	employee_status:boolean;
	id_city?: number;
	id_state?: number;
}