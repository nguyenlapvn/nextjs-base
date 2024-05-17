import { z, type ZodType } from 'zod'

import { PAGE_SIZE_OPTIONS } from '@/lib/constants'

export function numericEnum<TValues extends readonly number[]>(
  values: TValues
) {
  return z.number().superRefine((val, ctx) => {
    if (!values.includes(val)) {
      ctx.addIssue({
        code: z.ZodIssueCode.invalid_enum_value,
        options: [...values],
        received: val,
      })
    }
  }) as ZodType<TValues[number]>
}

export const pageSize = numericEnum(PAGE_SIZE_OPTIONS).default(20)

export const limit = pageSize

export type PageSize = z.infer<typeof pageSize>

export type Limit = PageSize

export const page = z.number().default(1)

export type Page = z.infer<typeof page>

export const key = z.string().default('')

export type Key = z.infer<typeof key>
