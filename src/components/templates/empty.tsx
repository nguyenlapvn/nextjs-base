import * as React from 'react'
import Image from 'next/image'

import { cn } from '@/lib/utils'

export function Empty(props: {
  title?: React.ReactNode
  description?: React.ReactNode
  image?: React.ReactElement
  className?: string
}) {
  return (
    <div className={cn('grid place-content-center py-12', props.className)}>
      <div className="mb-8 flex justify-center mx-auto aspect-video relative pt-[67%]">
        {props.image || <Image fill alt="empty" src="/images/empty.jpg" />}
      </div>
      <div className="text-center">
        <div className="mb-2 h6">{props.title || 'Chưa có nội dung'}</div>
        <div className="opacity-80 text-small">{props.description}</div>
      </div>
    </div>
  )
}
