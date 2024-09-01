import {prisma} from "@/lib/prisma";
import {AllSidebar} from "@/components/all/AllSidebar";
import {FileCard} from "@/components/FileCard";

export default async function AllPage() {
  const [tags, categories, files] = await Promise.all([
    prisma.tag.findMany(),
    prisma.category.findMany(),
    prisma.file.findMany({
      include: {
        tags: true,
        category: true,
        user: true,
      }
    })
  ])

  return (
    <div className="flex gap-5">
      <AllSidebar
        tags={tags}
        categories={categories}
      />
      <div className="flex gap-2">
        {files.map((file) => (
          <FileCard key={file.id} {...file} />
        ))}
      </div>
    </div>
  )
}
