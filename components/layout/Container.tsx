import {PropsWithChildren} from "react";

export function Container({children}: PropsWithChildren) {
  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-4">
      {children}
    </main>
  )
}
