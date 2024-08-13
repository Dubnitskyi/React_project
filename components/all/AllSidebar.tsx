import {Category, Tag} from "@prisma/client";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";

interface Props {
  tags: Tag[]
  categories: Category[]
}


export function AllSidebar({tags, categories}: Props) {
  return (
    <div className="w-48">
      <div>
        Category
      </div>
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="All"/>
        </SelectTrigger>
        <SelectContent>
          {categories.map(({id, name}) => (
            <SelectItem value={id.toString()}>
              {name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
