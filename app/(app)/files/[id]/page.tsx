import {prisma} from "@/lib/prisma";
import {Badge} from "@/components/ui/badge";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import Image from "next/image";

const UPLOAD_THING_URL = "https://utfs.io/f/"
const BLANK_IMAGE = "https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png"

export default async function FilePage({params}: {params: {id: string}}) {
  const file = await prisma.file.findUnique({
    where: {
      id: +params.id
    },
    include: {
      category: true,
      user: true,
      tags: true,
    }
  });

  if (!file) {
    return (
      <div>File not found</div>
    )
  }

  return (
    <div>
      <h1 className="text-xl font-bold">{file.name}</h1>
      <h2>{file.description}</h2>
      <h4>File type: {file.fileType}</h4>
      {file.fileId}
      <h4>
        Category: <Badge variant="outline">{file.category.name}</Badge>
      </h4>

      <div className="flex gap-2 items-center h-10">
        <Avatar className="size-6">
          <AvatarImage
            src={BLANK_IMAGE}
            className="bg-gray-100 p-1"
          />
          <AvatarFallback/>
        </Avatar>
        {file.user.name}
      </div>
      <div className="flex gap-1">
        {file.tags.map((tag) => (
          <Badge key={tag.id} style={{backgroundColor: tag.color}}>{tag.name}</Badge>
        ))}
      </div>
      <Image width={500} height={500} src={UPLOAD_THING_URL + file.fileId} alt="image"/>
    </div>
  )
}
