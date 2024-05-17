import { clsx, type ClassValue } from 'clsx'
import { format } from 'date-fns'
import _ from 'lodash'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function mergeEventHandlers<E>(
  ...handlers: (((event: E) => void) | undefined)[]
) {
  return (event: E) => {
    handlers.forEach((handler) => {
      if (handler instanceof Function) {
        handler(event)
      }
    })
  }
}

export function slugify(str: string) {
  // Chuyển hết sang chữ thường
  str = str.toLowerCase()
  // xóa dấu
  str = str
    .normalize('NFD') // chuyển chuỗi sang unicode tổ hợp
    .replace(/[\u0300-\u036f]/g, '') // xóa các ký tự dấu sau khi tách tổ hợp
  // Thay ký tự đĐ
  str = str.replace(/[đĐ]/g, 'd')
  // Xóa ký tự đặc biệt
  str = str.replace(/([^0-9a-z-\s])/g, '')
  // Xóa khoảng trắng thay bằng ký tự -
  str = str.replace(/(\s+)/g, '-')
  // Xóa ký tự - liên tiếp
  str = str.replace(/-+/g, '-')
  // xóa phần dư - ở đầu & cuối
  str = str.replace(/^-+|-+$/g, '')
  // return
  return str
}

export function uniqueArray(arr: any[]) {
  const jsonObject = arr.map((item) => JSON.stringify(item))
  const uniqueSet = new Set(jsonObject)
  return Array.from(uniqueSet).map((item) => JSON.parse(item))
}

export function formatNumber(num: number, option: any = {}) {
  return new Intl.NumberFormat('vi-VN', option).format(num)
}

export const formatCurrency = (num: number, fixed?: number) => {
  if (!_.isNumber(num)) return num
  let suffix = ''
  let number = num

  if (num / Math.pow(10, 6) >= 1) {
    number = num / Math.pow(10, 6)
    suffix = 'tr'
  }
  if (num / Math.pow(10, 9) >= 1) {
    number = num / Math.pow(10, 9)
    suffix = 'tỷ'
  }
  if (fixed !== undefined) {
    number = Number(number.toFixed(fixed))
  }
  return {
    raw: num,
    number,
    suffix,
    label: number + suffix,
  }
}

export const formatNumberSort = (n: number, d: number) => {
  if (n / 100 < 10) return n.toLocaleString()
  let x = ('' + n).length,
    p = Math.pow
  d = p(10, d)
  x -= x % 3
  return Math.round((n * d) / p(10, x)) / d + ' KMGTPE'[x / 3]
}

export function arrayMove(arr: any[], fromIndex: number, toIndex: number) {
  const newArr = [...arr]
  newArr.splice(fromIndex, 1)
  newArr.splice(toIndex, 0, arr[fromIndex])
  return newArr
}

export function formatCommonDate(
  date: string,
  strFormat = 'dd/MM/yyyy HH:mm:ss',
  defaultValue = '-'
) {
  if (!date) return defaultValue
  return format(new Date(date), strFormat)
}
