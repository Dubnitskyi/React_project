'use client'

import {FileCard} from "@/components/FileCard";
import {FullFile} from "@/types";
import {useAllItemsFilter} from "@/store/all-items";

interface AllCardsProps {
  files: FullFile[]
}

export function AllCards({files}: AllCardsProps) {
  const [filters] = useAllItemsFilter()

  const filteredFiles = files
    .filter(({user}) => filters.user === 'all' || user.id === +filters.user)
    .filter(({category}) => filters.category === 'all' || category.id === +filters.category)
    .filter(({tags}) => filters.tag === 'all' || tags.some(({id}) => id === +filters.tag))

  return (
    <div className="flex justify-center flex-wrap gap-2">
      {filteredFiles.map((file) => (
        <FileCard key={file.id} {...file} />
      ))}
    </div>
  )
}
