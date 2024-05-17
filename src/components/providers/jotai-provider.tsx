'use client'

import { createStore, Provider } from 'jotai'
import { queryClientAtom } from 'jotai-tanstack-query'
import { useHydrateAtoms } from 'jotai/utils'

import { queryClient } from './react-query-provider'

const atomStore = createStore()

const HydrateAtoms = ({ children }: React.PropsWithChildren) => {
  // initialising on state with prop on render here
  useHydrateAtoms([[queryClientAtom, queryClient]])
  return children
}

function JotaiProvider({ children }: React.PropsWithChildren) {
  return (
    <Provider store={atomStore}>
      <HydrateAtoms>{children}</HydrateAtoms>
    </Provider>
  )
}

export { JotaiProvider, HydrateAtoms, atomStore }
