import {DefaultSession, getServerSession, type NextAuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {compare} from "bcrypt";
import {prisma} from "@/lib/prisma";

declare module 'next-auth' {
  interface Session {
    user: DefaultSession['user'] & {
      id: string
      name: string
      email: string
      role: string
    }
  }
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt'
  },
  providers: [
    CredentialsProvider({
      name: 'Sign in',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'hello@example.com'
        },
        password: {label: 'Password', type: 'password'}
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        })

        if (!user) {
          return null
        }

        const isPasswordValid = credentials.password === user.password

        if (!isPasswordValid) {
          return null
        }

        return {
          id: user.id + '',
          email: user.email,
          name: user.name,
          role: user.role
        }
      }
    })
  ],
  callbacks: {
    session: ({session, token}) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          role: token.role
        }
      }
    },
    jwt: ({token, user}) => {
      if (!user) {
        return token
      }

      const u = user as unknown as any
      return {
        ...token,
        id: u.id,
        role: u.role
      }
    }
  }
}


export function getServerAuth() {
  return getServerSession(authOptions)
}
