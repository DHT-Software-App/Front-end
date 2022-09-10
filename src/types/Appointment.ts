export interface Appointment {
  id?: number;
  contacts?: string[];
  address?: string;
  start_date?: Date;
  end_date?: Date;
  notes?: string;
}