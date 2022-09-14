import { Calendar } from "types/Calendar";
import axios, { AxiosError, AxiosResponse } from "axios";
import { HTTPResponse } from "utils/Responses/HTTPResponse";
import {
	InvalidAttribute,
	InvalidAttributeError,
} from "utils/errors/InvalidAttributeError";
import { SuccessResponse } from "utils/Responses/SuccessResponse";
import { ResponseError } from "utils/errors/ResponseError";
import { Employee } from "types/Employee";
import { Job } from "types/Job";
import { format, parseISO } from "date-fns";

const { REACT_APP_BACKEND_API } = process.env;

export class CalendarService {
  static async getAll(access_token: string): Promise<Calendar[]> {
		try {
			const endpoint = `${REACT_APP_BACKEND_API}/calendars?include=employee,job`;

			const { data } = await axios.get(endpoint, {
				headers: {
					Authorization: `Bearer ${access_token}`,
					"Content-Type": "application/json",
					Accept: "application/json",
				},
			});

			const calendars: Calendar[] = data.data.map((data: any) => {
				const {
					data: { id, attributes },
					included,
				} = data;

				const calendar: Calendar = { id, ...attributes };

				calendar.start_date = parseISO(calendar.start_date?.toString()!);
				calendar.end_date = parseISO(calendar.end_date?.toString()!);

				included.map((data: any) => {
					const {
						data: { id, attributes, type },
					} = data;

					switch (type) {
						case "employees": {
							const employee: Employee = { id, ...attributes };

							calendar.employee = employee;
							break;
						}

            case "jobs": {
							const job: Job = { id, ...attributes };
							job.date_of_loss = parseISO(job.date_of_loss?.toString()!);

							calendar.job = job;
							break;
						}

						default:
							break;
					}
				});

				return calendar;
			});

			return calendars;
		} catch (error) {
			return [];
		}
	}

	static async getById(id: number, access_token: string): Promise<Calendar> {
		try {
			return {};
		} catch (error) {
			throw error;
		}
	}

	static async create(
		calendar: Calendar,
		access_token: string
	): Promise<Calendar | void> {
		try {
			let endpoint = `${REACT_APP_BACKEND_API}/calendars?include=employee,job`;

			const {
				job,
				employee,
				...restCalendarPropierties
			} = calendar;

			const { data } = await axios.post(endpoint, {
				...restCalendarPropierties,
				start_date: format(restCalendarPropierties.start_date!, 'yyyy-MM-dd HH:mm:ss'),
				end_date: format(restCalendarPropierties.end_date!, 'yyyy-MM-dd HH:mm:ss'),
				job_id: job?.id,
				employee_id: employee?.id
			}, {
				headers: {
					Authorization: `Bearer ${access_token}`,
					"Content-Type": "application/json",
					Accept: "application/json",
				},
			});

      const {
				data: { id, attributes },
        included
			} = data;

			const created_calendar: Calendar = {
				id,
        ...attributes,
			};

			created_calendar.start_date = parseISO(format(restCalendarPropierties.start_date!,'yyyy-MM-dd HH:mm:ss'));
			created_calendar.end_date = parseISO(format(restCalendarPropierties.end_date!, 'yyyy-MM-dd HH:mm:ss'));

      included.map((data: any) => {
        const {
          data: { id, attributes, type },
        } = data;

        switch (type) {
          case "employees": {
            const employee: Employee = { id, ...attributes };

            created_calendar.employee = employee;
            break;
          }

          case "jobs": {
            const job: Job = { id, ...attributes };

            created_calendar.job = job;
            break;
          }

          default:
            break;
        }
      });

			return created_calendar;
		} catch (error) {
			if (error instanceof AxiosError) {
				const { status, data } = error.response as AxiosResponse;

				// BAD REQUEST
				if (status === HTTPResponse.BAD_REQUEST) {
					// InvalidAttribute
					if (data.errors) {
						const { errors } = data;

						throw errors.map((error: {}) => {
							return new InvalidAttributeError(error as InvalidAttribute);
						});
					}

					if (data.success) {
						throw [new ResponseError(data as SuccessResponse)];
					}
				}
			}
		}
	}

	static async update(
		calendar: Calendar,
		access_token: string
	): Promise<Calendar | void> {
		try {
			
			let endpoint = `${REACT_APP_BACKEND_API}/calendars/${calendar.id}?include=employee,job`;

			const {
				job,
				employee,
				...restCalendarPropierties
			} = calendar;

			const { data } = await axios.put(endpoint,{
					...restCalendarPropierties,
					start_date: format(restCalendarPropierties.start_date!, 'yyyy-MM-dd HH:mm:ss'),
					end_date: format(restCalendarPropierties.end_date!, 'yyyy-MM-dd HH:mm:ss'),
					job_id: job?.id,
					employee_id: employee?.id
				},
				{
					headers: {
						Authorization: `Bearer ${access_token}`,
						"Content-Type": "application/json",
						Accept: "application/json",
					},
				}
			);

			const {
				data: { id, attributes },
        included
			} = data;

			const updated_calendar: Calendar = { id, ...attributes };


			updated_calendar.start_date = parseISO(format(restCalendarPropierties.start_date!,'yyyy-MM-dd HH:mm:ss'));
			updated_calendar.end_date = parseISO(format(restCalendarPropierties.end_date!, 'yyyy-MM-dd HH:mm:ss'));
			
      included.map((data: any) => {
        const {
          data: { id, attributes, type },
        } = data;

        switch (type) {
          case "employees": {
            const employee: Employee = { id, ...attributes };

            updated_calendar.employee = employee;
            break;
          }

          case "jobs": {
            const job: Job = { id, ...attributes };

            updated_calendar.job = job;
            break;
          }

          default:
            break;
        }
      });

			
			return updated_calendar;
		} catch (error) {
			if (error instanceof AxiosError) {
				const {
					status,
					data: { errors },
				} = error.response as AxiosResponse;

				// BAD REQUEST
				if (status === HTTPResponse.BAD_REQUEST) {
					throw errors.map((error: {}) => {
						return new InvalidAttributeError(error as InvalidAttribute);
					});
				}
			}
		}
	}

	static async delete(
		id: number,
		access_token: string
	): Promise<SuccessResponse | void> {
		try {
			const endpoint = `${REACT_APP_BACKEND_API}/calendars/${id}`;

			const { data } = await axios.delete(endpoint, {
				headers: {
					Authorization: `Bearer ${access_token}`,
					"Content-Type": "application/json",
					Accept: "application/json",
				},
			});

			return data as SuccessResponse;
		} catch (error) {
			if (error instanceof AxiosError) {
				const {
					status,
					data: { errors },
				} = error.response as AxiosResponse;

				// BAD REQUEST
				if (status === HTTPResponse.BAD_REQUEST) {
					throw errors.map((error: {}) => {
						return new InvalidAttributeError(error as InvalidAttribute);
					});
				}
			}
		}
	}
}

