import { WorkType } from "./WorkType";

export interface EstimateItem {
	id?: number;
  name?: string,
  price?: number,
  unit?: string,
  item_type?: 'Service' | 'Machine',
  category?: 'Basic'| 'Sub-total Equipment & Materials'| 'TARP'| 'Sub-total Service Labor'
  work_type?: WorkType
}