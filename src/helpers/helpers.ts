import { IItem, SortableProperty } from "@/types/types";
import { SortDirection } from "@mui/material";

export function sortByProperty(
  items: IItem[],
  property: SortableProperty,
  direction: SortDirection
) {
  const isPriceSort = property === 'price';
  
  const sortedItems = [...items].sort((itemA: IItem, itemB: IItem) => {
    const a = isPriceSort
      ? parseFloat(itemA[property])
      : itemA[property].toLowerCase();
    const b = isPriceSort
      ? parseFloat(itemB[property])
      : itemB[property].toLowerCase();

    if (a === b) return 0;
    return a < b ? -1 : 1;
  });

  return direction === 'asc' ? sortedItems : sortedItems.reverse();
}
