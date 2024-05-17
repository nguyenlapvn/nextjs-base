'use client'

import * as React from 'react'

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error
  reset(): void
}) {
  React.useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="h-svh grid place-content-center text-center">
      <h1 className="font-semibold text-xl">Lỗi</h1>
      <pre>{JSON.stringify(error.message, null, 2)}</pre>
    </div>
  )
}
