import {prisma} from "@/lib/prisma";
import {AllSidebar} from "@/components/all/AllSidebar";
import {AllCards} from "@/components/all/AllCards";
import {Suspense} from "react";

export default async function AllPage() {
  const [tags, categories, users, files] = await Promise.all([
    prisma.tag.findMany(),
    prisma.category.findMany(),
    prisma.user.findMany(),
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
      <Suspense fallback="loading...">
        <AllSidebar
          tags={tags}
          categories={categories}
          users={users}
        />
        <AllCards files={files} />
      </Suspense>
    </div>
  )
}
