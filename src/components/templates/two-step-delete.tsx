import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'

import { cn } from '@/lib/utils'
import { Button, ButtonProps } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Icons } from '@/components/icons'
import { Spinner } from '@/components/templates/spinner'

type Props = ButtonProps & {
  onDelete: () => void
  isDeleting?: boolean
}

export const TwoStepDelete = forwardRef<HTMLButtonElement, Props>(
  function TwoStepDelete(
    { onDelete, isDeleting = false, children, className, ...props }: Props,
    ref
  ) {
    const [armed, setArmed] = useState(false)
    const innerRef = useRef<HTMLButtonElement>(null)

    useImperativeHandle<HTMLButtonElement | null, HTMLButtonElement | null>(
      ref,
      () => innerRef.current
    )

    const handleTwoStepDelete = () => {
      if (!armed) {
        setArmed(true)
        return
      }
      onDelete()
      setArmed(false)
    }

    const disarmOnClickOutside = useCallback(
      (e: MouseEvent) => {
        if (
          innerRef.current &&
          !innerRef.current.contains(e.target as Node) &&
          armed
        ) {
          setArmed(false)
        }
      },
      [armed]
    )

    useEffect(() => {
      document.addEventListener('mousedown', disarmOnClickOutside)
      return () => {
        document.removeEventListener('mousedown', disarmOnClickOutside)
      }
    }, [disarmOnClickOutside])

    return (
      <Tooltip open={armed}>
        <TooltipTrigger asChild>
          <Button
            {...props}
            size={!armed || isDeleting ? 'icon' : 'default'}
            variant={armed ? 'destructive' : 'ghost'}
            className={cn(
              '!transition-all',
              { '!bg-grey-40': isDeleting },
              className
            )}
            onClick={handleTwoStepDelete}
            ref={innerRef}
          >
            <Spinner className={cn({ hidden: !isDeleting })} />
            <div className={cn({ hidden: armed || isDeleting })}>
              {children || <Icons.Delete className="text-grey-50" size={20} />}
            </div>
            <span
              className={cn('text-white', {
                hidden: !armed || isDeleting,
              })}
            >
              {'Xác nhận'}
            </span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{'Bạn có chắc'}</p>
        </TooltipContent>
      </Tooltip>
    )
  }
)
