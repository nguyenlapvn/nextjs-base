'use client'

import * as React from 'react'
import { useSnapshot } from 'valtio'

import { dialogProxy } from '@/lib/proxy/dialog'
import { mergeEventHandlers } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

export function GlobalDialog() {
  const snap = useSnapshot(dialogProxy)

  const handleClose = React.useCallback(() => {
    snap.onOpenChange(false)
  }, [])

  const content = React.useCallback(() => {
    switch (snap.type) {
      case 'confirm':
        return (
          <>
            <DialogHeader>
              <DialogTitle>{snap.confirmProps?.title}</DialogTitle>
              {snap.confirmProps?.description && (
                <DialogDescription>
                  {snap.confirmProps?.description}
                </DialogDescription>
              )}
            </DialogHeader>

            {snap.confirmProps?.footer &&
              snap.confirmProps.footer.length > 0 && (
                <DialogFooter>
                  {snap.confirmProps.footer.map(({ text, ...props }, key) => (
                    <Button
                      key={key}
                      {...props}
                      onClick={mergeEventHandlers(handleClose, props.onClick)}
                    >
                      {text}
                    </Button>
                  ))}
                </DialogFooter>
              )}
          </>
        )
      default:
        return null
    }
  }, [])

  return (
    <Dialog open={snap.isOpen} onOpenChange={snap.onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">{content()}</DialogContent>
    </Dialog>
  )
}
