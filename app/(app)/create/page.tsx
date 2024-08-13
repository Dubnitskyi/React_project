import {UploadForm} from "@/components/UploadForm";
import {prisma} from "@/lib/prisma";

export default async function CreatePage() {
  const categories = await prisma.category.findMany()

  return (
    <div>
      <UploadForm categories={categories} />
    </div>
  )
}
