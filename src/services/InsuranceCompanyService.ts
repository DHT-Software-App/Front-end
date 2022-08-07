import { InsuranceCompany } from "types/InsuranceCompany";
import axios, { AxiosError, AxiosResponse } from "axios";
import { HTTPResponse } from "utils/Responses/HTTPResponse";
import {
	InvalidAttribute,
	InvalidAttributeError,
} from "utils/errors/InvalidAttributeError";
import { SuccessResponse } from "utils/Responses/SuccessResponse";
import { ResponseError } from "utils/errors/ResponseError";

const { REACT_APP_BACKEND_API } = process.env;

export class InsuranceCompanyService {
  static async getAll(access_token: string): Promise<InsuranceCompany[]> {
		try {
			const endpoint = `${REACT_APP_BACKEND_API}/insurance_companies`;

			const { data } = await axios.get(endpoint, {
				headers: {
					Authorization: `Bearer ${access_token}`,
					"Content-Type": "application/json",
					Accept: "application/json",
				},
			});

			const insuranceCompanies: InsuranceCompany[] = data.data.map((data: any) => {
				const {
					data: { id, attributes },
				} = data;

				const insuranceCompany: InsuranceCompany = { id, ...attributes };
				
				return insuranceCompany;
			});

			return insuranceCompanies;
		} catch (error) {
			return [];
		}
	}

	static async getById(id: number, access_token: string): Promise<InsuranceCompany> {
		try {
			return {};
		} catch (error) {
			throw error;
		}
	}

	static async create(
		insuranceCompany: InsuranceCompany,
		access_token: string
	): Promise<InsuranceCompany | void> {
		try {
			let endpoint = `${REACT_APP_BACKEND_API}/insurance_companies`;

			const { data } = await axios.post(endpoint, insuranceCompany, {
				headers: {
					Authorization: `Bearer ${access_token}`,
					"Content-Type": "application/json",
					Accept: "application/json",
				},
			});

      const {
				data: { id, attributes },
			} = data;

			const created_insurance_company: InsuranceCompany = {
				id,
        ...attributes
			};

			return created_insurance_company;
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
		insuranceCompany: InsuranceCompany,
		access_token: string
	): Promise<InsuranceCompany | void> {
		try {
			let endpoint = `${REACT_APP_BACKEND_API}/insurance_companies/${insuranceCompany.id}`;

			const { data } = await axios.put(
				endpoint,
				insuranceCompany,
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

			const updated_insurance_company: InsuranceCompany = { id, ...attributes };

			return updated_insurance_company;
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
			const endpoint = `${REACT_APP_BACKEND_API}/insurance_companies/${id}`;

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

