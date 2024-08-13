import {getServerAuth} from "@/lib/auth";
import {LoginButton, LogoutButton} from "@/components/auth";

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
