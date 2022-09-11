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

			const { data } = await axios.post(endpoint, calendar, {
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

            calendar.job = job;
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

			const { data } = await axios.put(
				endpoint,
				calendar,
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

            calendar.job = job;
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

				console.log(error);

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
