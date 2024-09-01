import {prisma} from "@/lib/prisma";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Suspense} from "react";

export default async function AdminCategoriesPage() {
  const categories = await prisma.category.findMany()

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Id</TableHead>
            <TableHead>Name</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <Suspense fallback="loading...">
            {categories.map(({id, name}) => (
              <TableRow key={id}>
                <TableCell>{id}</TableCell>
                <TableCell>{name}</TableCell>
              </TableRow>
            ))}
          </Suspense>
        </TableBody>
      </Table>
    </div>
  )
}
