import Link from "next/link";
import {Badge} from "@/components/ui/badge";
import {Avatar, AvatarFallback, AvatarImage} from "./ui/avatar";
import {FullFile} from "@/types";

const BLANK_IMAGE = "https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png"

interface FileCardProps extends FullFile{
}

export function FileCard({id, name, tags, category, user}: FileCardProps) {
  return (
    <Link href={`/files/${id}`}>
      <div className="py-2 px-4 rounded-xl border space-y-1 w-64 h-28">
        <div className="text-lg h-8">
          {name}
        </div>
        <div className="flex gap-2 h-6 truncate">
          <Badge variant="outline">
            {category.name}
          </Badge>
          {tags.map((tag) => (
            <Badge key={tag.id} style={{backgroundColor: tag.color}}>{tag.name}</Badge>
          ))}
        </div>
        <div className="flex gap-2 items-center h-10">
          <Avatar className="size-6">
            <AvatarImage
              src={BLANK_IMAGE}
              className="bg-gray-100 p-1"
            />
            <AvatarFallback/>
          </Avatar>
          {user.name}
        </div>
      </div>
    </Link>
  )
}
