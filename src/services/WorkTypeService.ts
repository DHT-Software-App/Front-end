import { WorkType } from "types/WorkType";
import axios from "axios";

const { REACT_APP_BACKEND_API } = process.env;

export class WorkTypeService {
  static async getAll(access_token: string): Promise<WorkType[]> {
		try {
			const endpoint = `${REACT_APP_BACKEND_API}/work_types`;

			const { data } = await axios.get(endpoint, {
				headers: {
					Authorization: `Bearer ${access_token}`,
					"Content-Type": "application/json",
					Accept: "application/json",
				},
			});

			const work_types: WorkType[] = data.data.map((data: any) => {
				const {
					data: { id, attributes },
				} = data;

				const work_type: WorkType = { id, ...attributes };
				
				return work_type;
			});

			return work_types;
		} catch (error) {
			return [];
		}
	}
}