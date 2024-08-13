import {prisma} from "@/lib/prisma";
import {AllSidebar} from "@/components/all/AllSidebar";

export default async function AllPage() {
  const [tags, categories, files] = await Promise.all([
    prisma.tag.findMany(),
    prisma.category.findMany(),
    prisma.file.findMany()
  ])

  return (
    <div className="flex">
      <AllSidebar
        tags={tags}
        categories={categories}
      />
      <div>
        {JSON.stringify(files)}
      </div>
    </div>
  )
}
