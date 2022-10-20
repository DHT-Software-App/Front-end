export type Order = 'asc' | 'desc';
export type Filter<T> = [keyof T, string];
export type OrderBy<T> = keyof T;

export interface RequestQueryParams<T> {
  filter?: Filter<T>,
  orderBy?: OrderBy<T>,
  order?: Order,
  page?: number,
  per_page?: number
}

export interface MetaResponse {
  current_page?: number;
  page?: number,
  per_page?: number,
  total?: number
}



// export interface RequestQueryParams extends Record<RequestQueryParamsKeys, string | string[]> {
//   filter: D
// }