import {prisma} from "@/lib/prisma";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Badge} from "@/components/ui/badge";
import {Suspense} from "react";

export default async function AdminCategoriesPage() {
  const files = await prisma.file.findMany({
    include: {
      tags: true,
      category: true,
    }
  })

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Id</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Tags</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <Suspense fallback="loading...">
            {files.map(({id, name, description, category, tags}) => (
              <TableRow key={id}>
                <TableCell>{id}</TableCell>
                <TableCell>{name}</TableCell>
                <TableCell>{description}</TableCell>
                <TableCell>{category.name}</TableCell>
                <TableCell className="flex gap-1">
                  {tags.map(({id, name, color}) => (
                    <Badge key={id} style={{backgroundColor: color}}>{name}</Badge>
                  ))}
                </TableCell>
              </TableRow>
            ))}
          </Suspense>
        </TableBody>
      </Table>
    </div>
  )
}
