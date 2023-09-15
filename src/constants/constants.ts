import { SortableProperty, SortDirection } from "@/types/types";

export const labelBySortableProperty: { [K in SortableProperty]: string } = {
  title: "Titulo",
  description: "Descripción",
  price: "Precio",
  email: "Email",
};

export const labelBySortDirection: { [K in SortDirection]: string } = {
  asc: "Ascendente",
  desc: "Descendente"
};

export const sortDirectionData = [
  { shortLabel: "asc", label: "Ascendente" },
  { shortLabel: "desc", label: "Descendente" },
];
export const itemsApiURl =
  "https://frontend-tech-test-data.s3-eu-west-1.amazonaws.com/items.json";
export const itemsPerPage = 5;
