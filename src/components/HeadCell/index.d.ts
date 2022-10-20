export type HeadCell<T> = {
  disablePadding: boolean;
  id: keyof T;
  label: string;
  numeric: boolean;
}