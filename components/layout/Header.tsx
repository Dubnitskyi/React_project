import {LoginButton} from "@/components/auth/LoginButton";

export function Header() {
  return (
    <div className="h-10">
      <h2 className="text-indigo-700 font-bold text-">
        Sharing platform
      </h2>

      <LoginButton/>
    </div>
  )
}
