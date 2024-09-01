import {PropsWithChildren} from "react";
import {getServerAuth} from "@/lib/auth";
import {redirect} from "next/navigation";
import {Button} from "@/components/ui/button";
import Link from "next/link";

export default async function AdminLayout({children}: PropsWithChildren) {
  const session = await getServerAuth()
  if (session?.user?.role !== 'ADMIN') {
    redirect('/')
  }

  return (
    <div>
      <nav className="flex gap-2">
        <Link href="/admin/users">
          <Button>Users</Button>
        </Link>
        <Link href="/admin/tags">
          <Button>Tags</Button>
        </Link>
        <Link href="/admin/files">
          <Button>Files</Button>
        </Link>
        <Link href="/admin/categories">
          <Button>Categories</Button>
        </Link>
      </nav>
      {children}
    </div>
  )
}
