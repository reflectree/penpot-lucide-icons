import { indexTable } from "../index-table";
import { uniq } from "es-toolkit";

const categories = uniq(indexTable.flatMap((it) => it.categories));

class GlobalStore {
  readonly categories = categories;
  currentCategory = $state<string>();
  search = $state("");
}

export const store = new GlobalStore();
