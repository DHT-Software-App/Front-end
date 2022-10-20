import { Customer } from "types/Customer";
import axios, { AxiosError, AxiosResponse } from "axios";
import { HTTPResponse } from "utils/Responses/HTTPResponse";
import {
	InvalidAttribute,
	InvalidAttributeError,
} from "utils/errors/InvalidAttributeError";
import { SuccessResponse } from "utils/Responses/SuccessResponse";
import { ResponseError } from "utils/errors/ResponseError";
import { MetaResponse, RequestQueryParams } from "utils/params/query";

const { REACT_APP_BACKEND_API } = process.env;

export class CustomerService {
  static async getAll(access_token: string, requestQueryParams: RequestQueryParams<Customer>): Promise<{customers: Customer[], meta: MetaResponse} | undefined> {
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
			const endpoint = `${REACT_APP_BACKEND_API}/customers`;

			const { data } = await axios.get(endpoint, {
				headers: {
					Authorization: `Bearer ${access_token}`,
					"Content-Type": "application/json",
					Accept: "application/json",
				},
				params: queryParams
			});

			const customers: Customer[] = data.data.map((data: any) => {
				const {
					data: { id, attributes },
				} = data;

				const customer: Customer = { id, ...attributes };
				
				return customer;
			});

			const meta: MetaResponse = {
				...data.meta
			}

			return {
				customers,
				meta
			};


		} catch (error) {

		}
	}

	static async getById(id: number, access_token: string): Promise<Customer> {
		try {
			return {};
		} catch (error) {
			throw error;
		}
	}

	static async create(
		customer: Customer,
		access_token: string
	): Promise<Customer | void> {
		try {
			let endpoint = `${REACT_APP_BACKEND_API}/customers`;

			const { data } = await axios.post(endpoint, customer, {
				headers: {
					Authorization: `Bearer ${access_token}`,
					"Content-Type": "application/json",
					Accept: "application/json",
				},
			});

      const {
				data: { id, attributes },
			} = data;

			const created_customer: Customer = {
				id,
        ...attributes
			};

			return created_customer;
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
		customer: Customer,
		access_token: string
	): Promise<Customer | void> {
		try {
			let endpoint = `${REACT_APP_BACKEND_API}/customers/${customer.id}`;

			const { data } = await axios.put(
				endpoint,
				customer,
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
			} = data;

			const updated_customer: Customer = { id, ...attributes };

			return updated_customer;
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
			const endpoint = `${REACT_APP_BACKEND_API}/customers/${id}`;

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