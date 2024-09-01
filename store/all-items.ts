import {atom, useAtom} from "jotai";

interface Filters {
  category: string;
  tag: string;
  user: string;
}

const defaultFilters: Filters = {
  category: "all",
  tag: "all",
  user: "all"
}

const allItemsFilters = atom<Filters>(defaultFilters)

export function useAllItemsFilter() {
  return useAtom(allItemsFilters)
}
