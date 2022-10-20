import { EstimateItem } from "types/EstimateItem";
import axios, { AxiosError, AxiosResponse } from "axios";
import { HTTPResponse } from "utils/Responses/HTTPResponse";
import {
	InvalidAttribute,
	InvalidAttributeError,
} from "utils/errors/InvalidAttributeError";
import { SuccessResponse } from "utils/Responses/SuccessResponse";
import { ResponseError } from "utils/errors/ResponseError";
import { WorkType } from "types/WorkType";
import { MetaResponse, RequestQueryParams } from "utils/params/query";

const { REACT_APP_BACKEND_API } = process.env;

export class EstimateItemService {
  static async getAll(access_token: string, requestQueryParams: RequestQueryParams<EstimateItem>): Promise<{
		estimate_items: EstimateItem[],
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
			const endpoint = `${REACT_APP_BACKEND_API}/estimate_items?include=work_type`;

			const { data } = await axios.get(endpoint, {
				headers: {
					Authorization: `Bearer ${access_token}`,
					"Content-Type": "application/json",
					Accept: "application/json",
				},
				params: queryParams
			});

			const estimate_items: EstimateItem[] = data.data.map((data: any) => {
				const {
					data: { id, attributes },
					included,
				} = data;

				const estimate_item: EstimateItem = { id, ...attributes };


				included.map((data: any) => {
					const {
						data: { id, attributes, type },
					} = data;

					switch (type) {
     
            case "work_types": {
							const work_type: WorkType = { id, ...attributes };

							estimate_item.work_type = work_type;
							break;
						}


						default:
							break;
					}
				});


				return estimate_item;
			});

			const meta: MetaResponse = {
					...data.meta
			}

			return {
				estimate_items,
				meta
			};
		} catch (error) {
		
		}
	}

	static async getById(id: number, access_token: string): Promise<EstimateItem> {
		try {
			return {};
		} catch (error) {
			throw error;
		}
	}

	static async create(
		estimate_item: EstimateItem,
		access_token: string
	): Promise<EstimateItem | void> {
		try {
			let endpoint = `${REACT_APP_BACKEND_API}/estimate_items?include=work_type`;

			const {
				work_type,
				...restEstimateItemProperties
			} = estimate_item;


			const { data } = await axios.post(endpoint, {
				...restEstimateItemProperties,
				work_type_id: work_type?.id, 
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

			const created_estimate_item: EstimateItem = {
				id,
        ...attributes,
			};


      included.map((data: any) => {
        const {
          data: { id, attributes, type },
        } = data;

        switch (type) {

          case "work_types": {
            const work_type: WorkType = { id, ...attributes };

            created_estimate_item.work_type = work_type;
            break;
          }

          default:
            break;
        }
      });

			return created_estimate_item;
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
		estimate_item: EstimateItem,
		access_token: string
	): Promise<EstimateItem | void> {
		try {
			let endpoint = `${REACT_APP_BACKEND_API}/estimate_items/${estimate_item.id}?include=work_type`;

			const {
				work_type,
				...restEstimateItemProperties
			} = estimate_item;

			const { data } = await axios.put(endpoint, {
				...restEstimateItemProperties,
				work_type_id: work_type?.id, 
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

			const updated_estimate_item: EstimateItem = { id, ...attributes };


      included.map((data: any) => {
        const {
          data: { id, attributes, type },
        } = data;

        switch (type) {
    
          case "work_types": {
            const work_type: WorkType = { id, ...attributes };

            updated_estimate_item.work_type = work_type;
            break;
          }

          default:
            break;
        }
      });


			return updated_estimate_item;
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
			const endpoint = `${REACT_APP_BACKEND_API}/estimate_items/${id}`;

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

