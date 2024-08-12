import {getServerAuth} from "@/lib/auth";
import {LoginButton, LogoutButton} from "@/components/Auth";

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
