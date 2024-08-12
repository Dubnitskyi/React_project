import {getServerAuth} from "@/lib/auth";

export default async function Home() {
  const session = getServerAuth()

  return (
    <main>
      {JSON.stringify(session, null, 2)}
    </main>
  );
}
