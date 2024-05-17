import { proxy } from 'valtio'

import { ButtonProps } from '@/components/ui/button'

type ConfirmProps = {
  title?: string
  description?: string
  footer?: ({ text: string } & ButtonProps)[]
}

type DialogProxy = {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  type: 'confirm'
  confirm: (props: ConfirmProps) => void
  confirmProps?: ConfirmProps
}

export const dialogProxy = proxy<DialogProxy>({
  isOpen: false,
  onOpenChange: (open) => {
    dialogProxy.isOpen = open
  },
  type: 'confirm',
  confirm: (props) => {
    dialogProxy.type = 'confirm'
    dialogProxy.isOpen = true
    dialogProxy.confirmProps = props
  },
})
