import { indexTable } from "../index-table";
import { uniq, capitalize } from "es-toolkit";

interface CategorySelectAbstraction {
  value: string;
  label: string;
}

export const DEFAULT_CATEGORY: CategorySelectAbstraction = {
  label: "All categories",
  value: "All categories",
};

const categories: CategorySelectAbstraction[] = [
  DEFAULT_CATEGORY,
  ...uniq(indexTable.flatMap((it) => it.categories)).map((value) => ({
    value: value,
    label: capitalize(value),
  })).sort()
];

class GlobalStore {
  readonly categories = categories;
  currentTab = $state<string>("icons");
  currentCategory = $state<string>(DEFAULT_CATEGORY.value);
  search = $state("");
}

export const store = new GlobalStore();
