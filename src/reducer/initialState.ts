import { SortableProperty, SortDirection } from "@/types/types";

export const initialState = {
  data: null,
  filters: {
    searchTerm: "",
    currentPage: 1,
  },
  sort: {
    sortBy: undefined as SortableProperty | undefined,
    sortDirection: "asc" as SortDirection,
  },
  favorites: [],
  filteredItems: [],
  showFavoritesModal: false,
};
