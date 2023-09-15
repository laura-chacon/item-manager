export interface IItem {
  title: string;
  description: string;
  price: string;
  email: string;
  image: string;
  isFavorite: boolean;
}

export interface ItemsResponse {
  items: IItem[];
}

export interface State {
  data: ItemsResponse | null;
  filters: Filters;
  sort: {
    sortBy?: SortableProperty;
    sortDirection: SortDirection;
  };
  favorites: IItem[];
  filteredItems: IItem[];
  showFavoritesModal: boolean;
}

export type SortableProperty = keyof Omit<IItem, "image" | "isFavorite">;

export interface Filters {
  searchTerm: string;
  currentPage: number;
}

export type SortDirection = "asc" | "desc";
