import { debounce, throttle } from 'lodash-es'

/**
 * 创建防抖函数。
 * @param handler 需要防抖处理的函数。
 * @param wait 等待时间。
 * @returns 处理后的防抖函数。
 */
export function createDebounce<T extends (...args: never[]) => unknown>(handler: T, wait = 300) {
  return debounce(handler, wait)
}

/**
 * 创建节流函数。
 * @param handler 需要节流处理的函数。
 * @param wait 等待时间。
 * @returns 处理后的节流函数。
 */
export function createThrottle<T extends (...args: never[]) => unknown>(handler: T, wait = 300) {
  return throttle(handler, wait)
}
