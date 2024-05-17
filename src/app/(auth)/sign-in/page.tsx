'use client'

import { signIn, signOut, useSession } from 'next-auth/react'

import { Button } from '@/components/ui/button'

export default function IndexPage() {
  const { data: session } = useSession()

  if (session) {
    return (
      <div>
        signed in as {session.user?.email}
        <Button onClick={() => signOut()}>sign out</Button>
      </div>
    )
  }
  return (
    <div>
      <p>sign-in</p>
      <Button onClick={() => signIn('github')}>sign in with Github</Button>
    </div>
  )
}
