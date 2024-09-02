import {UploadForm} from "@/components/UploadForm";
import {prisma} from "@/lib/prisma";

export default async function CreatePage() {
  const [categories, tags] = await Promise.all([
    prisma.category.findMany(),
    prisma.tag.findMany()
  ])

  return (
    <div>
      <UploadForm categories={categories} tags={tags}/>
    </div>
  )
}
