export type TableHeaderType = {
  label: string;
  align?: 'left' | 'right' | 'center' | undefined;
  w?: number;
};

export type TableType = {
  headers?: TableHeaderType[];
  body: React.ReactNode;
  paginate?: boolean;
  total?: number;
  page?: number;
  found?: boolean;
  isLoading?: boolean;
  isError?: boolean;
  error?: any;
  pageHandler?: (value: number | any) => void;
};
