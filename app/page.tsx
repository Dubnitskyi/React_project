import {getServerAuth} from "@/lib/auth";
import {LoginButton, LogoutButton} from "@/components/auth";
import {UploadForm} from "@/components/UploadForm";

export default async function Home() {
  const session = await getServerAuth()

  return (
    <main>
      {
        session
          ? <LogoutButton/>
          : <LoginButton/>
      }
      <UploadForm/>

      {JSON.stringify(session, null, 2)}
    </main>
  );
}
