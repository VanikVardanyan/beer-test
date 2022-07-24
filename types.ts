export interface IBeer {
  image_url: string;
  name: string;
  tagline: string;
  description: string;
  abv: string;
  food_pairing: string;
  id: string;
  checkedsBeer?: boolean;
}

export interface IPagination {
  totalPage: number;
  page: number;
  row: number;
  handleChange: (item: number) => void;
  handleNavigate: (type: string) => void;
  handleChangeRow: (type: number) => void;
}
