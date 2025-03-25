import { FormControl, ValidatorFn } from '@angular/forms';

type FieldType =
  | 'text'
  | 'password'
  | 'textarea'
  | 'select'
  | 'camera'
  | 'email'
  | 'tel';

interface FieldExtra {
  hide?: boolean;
  search?: boolean;
  searchControl?: FormControl;
  labelKey?: string;
  multiple?: boolean;
  required?: boolean;
  loader?: boolean;
}

interface Field<T> {
  name: string;
  type: FieldType;
  label: string;
  placeholder?: string;
  options?: T[];
  validators?: ValidatorFn[];
  errorMessages: { [key: string]: string };
  extra?: FieldExtra;
}

interface TableColumn<T> {
  columnDef: string;
  header: string;
  cell: (element: T) => string;
}

interface PaginatedList<T> {
  totalPages: number;
  pageSize: number;
  totalCount: number;
  currentPage: number;
  items: T[];
}

export type { FieldExtra, Field, TableColumn, PaginatedList };
