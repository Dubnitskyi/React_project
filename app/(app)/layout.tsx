import {PropsWithChildren} from "react";
import {Container} from "@/components/layout/Container";
import {Header} from "@/components/layout/Header";

export default function AppLayout({children}: PropsWithChildren) {
  return (
    <Container>
      <Header/>
      {children}
    </Container>
  )
}
