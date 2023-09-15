import { IItem, ItemsResponse, SortableProperty, SortDirection } from "@/types/types";

export type Action =
  | { type: "CLOSE_MODAL" }
  | { type: "OPEN_MODAL" }
  | { type: "SET_CURRENT_PAGE"; payload: number }
  | { type: "SET_DATA"; payload: ItemsResponse }
  | { type: "SET_SEARCH_TERM"; payload: string }
  | { type: "SET_SORT_BY"; payload: SortableProperty }
  | { type: "SET_SORT_DIRECTION"; payload: SortDirection }
  | { type: "TOGGLE_FAVORITE"; payload: IItem }
  | { type: "UNSET_SORT_BY" };
