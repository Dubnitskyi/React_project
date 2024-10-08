'use client'

import {NextSSRPlugin} from "@uploadthing/react/next-ssr-plugin";
import {PropsWithChildren} from "react";
import {SessionProvider} from "next-auth/react";
import {extractRouterConfig} from "uploadthing/server";
import {ourFileRouter} from "@/app/api/uploadthing/core";
import {Toaster} from "@/components/ui/sonner";

export const Providers = ({children}: PropsWithChildren) => {
  return (
    <SessionProvider>
      <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)}/>
      {children}
      <Toaster/>
    </SessionProvider>
  )
}
