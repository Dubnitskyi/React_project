import {getServerAuth} from "@/lib/auth";
import {LogoutButton} from "@/components/auth/LogoutButton";
import {LoginButton} from "@/components/auth/LoginButton";

export default async function Home() {
  const session = await getServerAuth()

  return (
    <main>
      {
        session
          ? <LogoutButton/>
          : <LoginButton/>
      }

      {JSON.stringify(session, null, 2)}
    </main>
  );
}
