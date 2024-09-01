import {LoginButton} from "@/components/auth/LoginButton";
import {LogoutButton} from "@/components/auth/LogoutButton";
import {getServerAuth} from "@/lib/auth";
import {Button} from "@/components/ui/button";
import Link from "next/link";

export async function Header() {
  const session = await getServerAuth()
  const isAdmin = session?.user?.role === 'ADMIN'

  return (
    <div className="w-full flex justify-between items-center border-b pb-2 mb-8">
      <Link href="/">
        <Button variant="outline" className="text-indigo-700 font-bold">
          Sharing platform
        </Button>
      </Link>
      <div className="flex gap-2">
        {isAdmin && (
          <Link href="/admin">
            <Button>Admin page</Button>
          </Link>
        )}
        {
          session
            ? (
              <>
                <Link href="/create">
                  <Button>
                    Upload
                  </Button>
                </Link>
                <LogoutButton/>
              </>
            )
            : <LoginButton/>
        }
      </div>
    </div>
  )
}
