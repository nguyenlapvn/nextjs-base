import 'next-auth/jwt'

import type { AuthOptions } from 'next-auth'
import GithubProvider from 'next-auth/providers/github'

const useSecureCookies = process.env.AUTH_URL!.startsWith('https://')
const hostName = new URL(process.env.AUTH_URL!).hostname
const port = new URL(process.env.AUTH_URL!).port
const cookiePrefix = useSecureCookies ? '__Secure-' : `${hostName}-${port}-`
const domain =
  hostName === 'localhost'
    ? hostName
    : hostName.substring(hostName.indexOf('.'))

type GithubProfile = {
  login: string
  id: number
  node_id: string
  avatar_url: string
  gravatar_id: string
  url: string
  html_url: string
  followers_url: string
  following_url: string
  gists_url: string
  starred_url: string
  subscriptions_url: string
  organizations_url: string
  repos_url: string
  events_url: string
  received_events_url: string
  type: string
  site_admin: boolean
  name: any
  company: any
  blog: string
  location: any
  email: string
  hireable: any
  bio: any
  twitter_username: any
  public_repos: number
  public_gists: number
  followers: number
  following: number
  created_at: string
  updated_at: string
  private_gists: number
  total_private_repos: number
  owned_private_repos: number
  disk_usage: number
  collaborators: number
  two_factor_authentication: boolean
  plan: {
    name: string
    space: number
    collaborators: number
    private_repos: number
  }
}

export const authConfig = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  debug: true,
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async signIn({ account, profile, user }) {
      if (account && account.provider === 'github') {
        console.log('callback', account, profile as GithubProfile, user)

        return true
      }
      return true // Do different verification for other providers that don't have `email_verified`
    },
    jwt({ token, trigger, user, session }) {
      return { ...token, ...user, ...session }
    },
    session({ token, session }) {
      // delete session.user
      return { ...token, ...session }
    },
  },
  pages: {
    signIn: '/sign-in',
    signOut: '/sign-in',
    error: '/sign-in', // Error code passed in query string as ?error=
    verifyRequest: '/verify-request', // (used for check email message)
    newUser: '/sign-up', // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  cookies: {
    sessionToken: {
      name: `${cookiePrefix}next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: useSecureCookies,
        domain,
      },
    },
  },
} satisfies AuthOptions
