import {atom} from "jotai";
import {useAtom} from "jotai";

interface Filters {
  category: string;
  tags: string[] | "all";
}

const allItemsFilters = atom<Filters>({
  category: "all",
  tags: "all"
})

export function useAllItemsFilter() {
  return useAtom(allItemsFilters)
}
