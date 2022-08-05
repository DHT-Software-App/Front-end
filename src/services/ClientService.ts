import { Client } from "types/Client";
import axios, { AxiosError, AxiosResponse } from "axios";
import { HTTPResponse } from "utils/Responses/HTTPResponse";
import {
	InvalidAttribute,
	InvalidAttributeError,
} from "utils/errors/InvalidAttributeError";
import { SuccessResponse } from "utils/Responses/SuccessResponse";
import { ResponseError } from "utils/errors/ResponseError";

const { REACT_APP_BACKEND_API } = process.env;

export class ClientService {
  static async getAll(access_token: string): Promise<Client[]> {
		try {
			const endpoint = `${REACT_APP_BACKEND_API}/clients`;

			const { data } = await axios.get(endpoint, {
				headers: {
					Authorization: `Bearer ${access_token}`,
					"Content-Type": "application/json",
					Accept: "application/json",
				},
			});

			const clients: Client[] = data.data.map((data: any) => {
				const {
					data: { id, attributes },
				} = data;

				const client: Client = { id, ...attributes };
				
				return client;
			});

			return clients;
		} catch (error) {
			return [];
		}
	}

	static async getById(id: number, access_token: string): Promise<Client> {
		try {
			return {};
		} catch (error) {
			throw error;
		}
	}

	static async create(
		client: Client,
		access_token: string
	): Promise<Client | void> {
		try {
			let endpoint = `${REACT_APP_BACKEND_API}/clients`;

			const { data } = await axios.post(endpoint, client, {
				headers: {
					Authorization: `Bearer ${access_token}`,
					"Content-Type": "application/json",
					Accept: "application/json",
				},
			});

      const {
				data: { id, attributes },
			} = data;

			const created_client: Client = {
				id,
        ...attributes
			};

			return created_client;
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
		client: Client,
		access_token: string
	): Promise<Client | void> {
		try {
			let endpoint = `${REACT_APP_BACKEND_API}/clients/${client.id}`;

			const { data } = await axios.put(
				endpoint,
				client,
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

			const updated_client: Client = { id, ...attributes };

			return updated_client;
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
			const endpoint = `${REACT_APP_BACKEND_API}/clients/${id}`;

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

