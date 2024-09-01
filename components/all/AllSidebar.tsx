'use client'

import {Category, Tag, User} from "@prisma/client";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {useAllItemsFilter} from "@/store/all-items";

interface Props {
  tags: Tag[]
  categories: Category[]
  users: User[]
}

export function AllSidebar({tags, categories, users}: Props) {
  const [filters, setFilters] = useAllItemsFilter()

  function onCategoryChange(value: string) {
    setFilters({
      ...filters,
      category: value
    })
  }

  function onTagChange(value: string) {
    setFilters({
      ...filters,
      tag: value
    })
  }

  function onUserChange(value: string) {
    setFilters({
      ...filters,
      user: value
    })
  }

  return (
    <div className="w-48 space-y-4">
      <div>
        <div>
          Category
        </div>
        <Select value={filters.category ?? "all"} onValueChange={onCategoryChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All"/>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">
              All
            </SelectItem>
            {categories.map(({id, name}) => (
              <SelectItem key={id} value={id.toString()}>
                {name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <div>
          Tag
        </div>
        <Select value={filters.tag ?? "all"} onValueChange={onTagChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All"/>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">
              All
            </SelectItem>
            {tags.map(({id, name}) => (
              <SelectItem key={id} value={id.toString()}>
                {name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <div>
          User
        </div>
        <Select value={filters.user ?? "all"} onValueChange={onUserChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All"/>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">
              All
            </SelectItem>
            {users.map(({id, name}) => (
              <SelectItem key={id} value={id.toString()}>
                {name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
