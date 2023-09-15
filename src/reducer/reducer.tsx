import { useReducer } from "react";
import { sortByProperty } from "@/helpers/helpers";
import { IItem, State } from "@/types/types";
import { Action } from "@/reducer/actionTypes";
import { initialState } from "@/reducer/initialState";

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "CLOSE_MODAL":
      return {
        ...state,
        showFavoritesModal: false,
      };
    case "OPEN_MODAL":
      return {
        ...state,
        showFavoritesModal: true,
      };
    case "SET_CURRENT_PAGE":
      return {
        ...state,
        filters: {
          ...state.filters,
          currentPage: action.payload,
        },
      };
    case "SET_DATA":
      const { payload: newData } = action;
      const updatedFilteredItems = newData.items.map((item: IItem) => ({
        ...item,
        isFavorite: false,
      }));
      return {
        ...state,
        data: newData,
        filteredItems: updatedFilteredItems,
      };
    case "SET_SEARCH_TERM":
      if (state.data && state.data.items) {
        const results = state.data.items.filter((item: IItem) => {
          if (action.payload === "") return true;
          return (
            item.title.toLowerCase().includes(action.payload.toLowerCase()) ||
            item.description
              .toLowerCase()
              .includes(action.payload.toLowerCase())
          );
        });
        return {
          ...state,
          filteredItems: results,
          filters: {
            ...state.filters,
            searchTerm: action.payload,
            currentPage: 1,
          },
        };
      }
      return state;
    case "SET_SORT_BY":
      return {
        ...state,
        filteredItems: sortByProperty(
          state.filteredItems,
          action.payload,
          state.sort.sortDirection
        ),
        sort: {
          ...state.sort,
          sortBy: action.payload,
        },
        filters: {
          ...state.filters,
          currentPage: 1,
        }
      };
    case "SET_SORT_DIRECTION":
      return {
        ...state,
        filteredItems: sortByProperty(
          state.filteredItems,
          state.sort.sortBy!,
          action.payload
        ),
        sort: {
          ...state.sort,
          sortDirection: action.payload,
        },
        filters: {
          ...state.filters,
          currentPage: 1,
        }
      };
    case "TOGGLE_FAVORITE":
      const { payload: item } = action;
      const updatedFavorites = [...state.favorites];
      const existingIndex = updatedFavorites.findIndex(
        (favoriteItem) => favoriteItem.title === item.title
      );
      if (existingIndex !== -1) {
        updatedFavorites.splice(existingIndex, 1);
      } else {
        updatedFavorites.push(item);
      }
      return {
        ...state,
        favorites: updatedFavorites,
        filteredItems: state.filteredItems.map((filteredItem) =>
          filteredItem.title === item.title
            ? { ...filteredItem, isFavorite: !filteredItem.isFavorite }
            : filteredItem
        ),
      };
    case "UNSET_SORT_BY":
      if (state.data !== null) {
        return {
          ...state,
          filteredItems: state.data.items,
          filters: {
            ...state.filters,
            currentPage: 1,
          },
          sort: {
            ...state.sort,
            sortBy: undefined,
          },
        };
      }
      return state;
    default:
      return state;
  }
}

export const useMyReducer = () => {
  return useReducer(reducer, initialState);
};
