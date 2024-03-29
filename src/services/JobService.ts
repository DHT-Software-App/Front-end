import { Job } from "types/Job";
import axios, { AxiosError, AxiosResponse } from "axios";
import { HTTPResponse } from "utils/Responses/HTTPResponse";
import {
	InvalidAttribute,
	InvalidAttributeError,
} from "utils/errors/InvalidAttributeError";
import { SuccessResponse } from "utils/Responses/SuccessResponse";
import { ResponseError } from "utils/errors/ResponseError";
import { Customer } from "types/Customer";
import { Client } from "types/Client";
import { WorkType } from "types/WorkType";
import { InsuranceCompany } from "types/InsuranceCompany";
import { format, parseISO } from "date-fns";
import { MetaResponse, RequestQueryParams } from "utils/params/query";

const { REACT_APP_BACKEND_API } = process.env;

export class JobService {
  static async getAll(access_token: string, requestQueryParams: RequestQueryParams<Job>): Promise<{
		jobs: Job[],
		meta: MetaResponse
	} | undefined> {
		let queryParams: any = {};

		if(requestQueryParams.filter) {
			queryParams[`filter[${requestQueryParams.filter?.[0]}]`]  = requestQueryParams.filter?.[1]
		}

		if(requestQueryParams.order && requestQueryParams.orderBy) {
			queryParams['sort'] = (requestQueryParams.order == 'asc' ? '' : '-') + requestQueryParams.orderBy;
		}

		if(requestQueryParams.page) {
			queryParams['page'] = requestQueryParams.page;
		}

		if(requestQueryParams.per_page) {
			queryParams['per_page'] = requestQueryParams.per_page;
		}

		try {
			const endpoint = `${REACT_APP_BACKEND_API}/jobs?include=client,customer,work_type,insurance`;

			const { data } = await axios.get(endpoint, {
				headers: {
					Authorization: `Bearer ${access_token}`,
					"Content-Type": "application/json",
					Accept: "application/json",
				},
				params: queryParams
			});

			const jobs: Job[] = data.data.map((data: any) => {
				const {
					data: { id, attributes },
					included,
				} = data;

				const job: Job = { id, ...attributes };

				job.date_of_loss = parseISO(job.date_of_loss?.toString()!);

				included.map((data: any) => {
					const {
						data: { id, attributes, type },
					} = data;

					switch (type) {
						case "customers": {
							const customer: Customer = { id, ...attributes };

							job.customer = customer;
							break;
						}

            case "clients": {
							const client: Client = { id, ...attributes };

							job.client = client;
							break;
						}

            case "work_types": {
							const work_type: WorkType = { id, ...attributes };

							job.work_type = work_type;
							break;
						}

            case "insurances": {
							const insurance: InsuranceCompany = { id, ...attributes };

							job.insurance = insurance;
							break;
						}

						default:
							break;
					}
				});


				return job;
			});

			const meta: MetaResponse = {
					...data.meta
			}

			return {
				jobs,
				meta
			};
		} catch (error) {
		
		}
	}

	static async getById(id: number, access_token: string): Promise<Job> {
		try {
			return {};
		} catch (error) {
			throw error;
		}
	}

	static async create(
		job: Job,
		access_token: string
	): Promise<Job | void> {
		try {
			let endpoint = `${REACT_APP_BACKEND_API}/jobs?include=customer,client,work_type,insurance`;

			const {
				customer,
				client,
				work_type,
				insurance,
				...restJobProperties
			} = job;


			const { data } = await axios.post(endpoint, {
				...restJobProperties,
				date_of_loss: format(restJobProperties.date_of_loss!, 'yyyy-MM-dd HH:mm:ss'),
				customer_id: customer?.id, 
				client_id: client?.id, 
				work_type_id: work_type?.id, 
				insurance_id: insurance?.id,
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

			const created_job: Job = {
				id,
        ...attributes,
			};

			created_job.date_of_loss = parseISO(format(restJobProperties.date_of_loss!, 'yyyy-MM-dd HH:mm:ss'));

      included.map((data: any) => {
        const {
          data: { id, attributes, type },
        } = data;

        switch (type) {
          case "customers": {
            const customer: Customer = { id, ...attributes };

            created_job.customer = customer;
            break;
          }

          case "clients": {
            const client: Client = { id, ...attributes };

            created_job.client = client;
            break;
          }

          case "work_types": {
            const work_type: WorkType = { id, ...attributes };

            created_job.work_type = work_type;
            break;
          }

          case "insurances": {
            const insurance: InsuranceCompany = { id, ...attributes };

            created_job.insurance = insurance;
            break;
          }

          default:
            break;
        }
      });

			return created_job;
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
		job: Job,
		access_token: string
	): Promise<Job | void> {
		try {
			let endpoint = `${REACT_APP_BACKEND_API}/jobs/${job.id}?include=client,customer,work_type,insurance`;

			const {
				customer,
				client,
				work_type,
				insurance,
				...restJobProperties
			} = job;

			const { data } = await axios.put(endpoint, {
				...restJobProperties,
				date_of_loss: format(restJobProperties.date_of_loss!, 'yyyy-MM-dd HH:mm:ss'),
				customer_id: customer?.id, 
				client_id: client?.id, 
				work_type_id: work_type?.id, 
				insurance_id: insurance?.id,
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

			const updated_job: Job = { id, ...attributes };

			updated_job.date_of_loss = parseISO(format(restJobProperties.date_of_loss!, 'yyyy-MM-dd HH:mm:ss'));


      included.map((data: any) => {
        const {
          data: { id, attributes, type },
        } = data;

        switch (type) {
          case "customers": {
            const customer: Customer = { id, ...attributes };

            updated_job.customer = customer;
            break;
          }

          case "clients": {
            const client: Client = { id, ...attributes };

            updated_job.client = client;
            break;
          }

          case "work_types": {
            const work_type: WorkType = { id, ...attributes };

            updated_job.work_type = work_type;
            break;
          }

          case "insurances": {
            const insurance: InsuranceCompany = { id, ...attributes };

            updated_job.insurance = insurance;
            break;
          }

          default:
            break;
        }
      });


			return updated_job;
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
			const endpoint = `${REACT_APP_BACKEND_API}/jobs/${id}`;

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

