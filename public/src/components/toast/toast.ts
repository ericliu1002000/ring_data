import { closeToast, showFailToast, showSuccessToast, showToast } from 'vant'
import type { ToastOptions } from 'vant'

type TToastInput = string | ToastOptions
const APP_TOAST_CLASS = 'app-toast'
const APP_TOAST_SUCCESS_CLASS = 'app-toast--success'
const APP_TOAST_FAIL_CLASS = 'app-toast--fail'

/**
 * 提取类名字符串。
 * @param value 待提取值。
 * @returns 合法类名或空值。
 */
function getClassName(value: unknown): string | undefined {
  return typeof value === 'string' ? value : undefined
}

/**
 * 合并提示类名。
 * @param classNames 需合并的类名集合。
 * @returns 拼接后的类名字符串。
 */
function joinClassNames(...classNames: Array<string | undefined>): string {
  return classNames.filter(Boolean).join(' ')
}

/**
 * 归一化提示参数。
 * @param input 字符串或完整提示配置。
 * @returns 合并默认值后的提示配置。
 */
function normalizeToastOptions(input: TToastInput): string | ToastOptions {
  if (typeof input === 'string') {
    return {
      message: input,
      position: 'bottom',
    }
  }

  return {
    position: 'bottom',
    ...input,
  }
}

/**
 * 显示普通提示。
 * @param input 提示内容或提示配置。
 * @returns 无返回结果。
 */
export function openToast(input: TToastInput): void {
  const options = normalizeToastOptions(input)

  if (typeof options === 'string') {
    showToast(options)
    return
  }

  showToast({
    ...options,
    className: joinClassNames(APP_TOAST_CLASS, getClassName(options.className)),
  })
}

/**
 * 显示成功提示。
 * @param input 提示内容或提示配置。
 * @returns 无返回结果。
 */
export function openSuccessToast(input: TToastInput): void {
  const options = normalizeToastOptions(input)

  if (typeof options === 'string') {
    showSuccessToast({
      message: options,
      position: 'bottom',
      className: joinClassNames(APP_TOAST_CLASS, APP_TOAST_SUCCESS_CLASS),
    })
    return
  }

  showSuccessToast({
    ...options,
    className: joinClassNames(
      APP_TOAST_CLASS,
      APP_TOAST_SUCCESS_CLASS,
      getClassName(options.className),
    ),
  })
}

/**
 * 显示失败提示。
 * @param input 提示内容或提示配置。
 * @returns 无返回结果。
 */
export function openFailToast(input: TToastInput): void {
  const options = normalizeToastOptions(input)

  if (typeof options === 'string') {
    showFailToast({
      message: options,
      position: 'bottom',
      className: joinClassNames(APP_TOAST_CLASS, APP_TOAST_FAIL_CLASS),
    })
    return
  }

  showFailToast({
    ...options,
    className: joinClassNames(
      APP_TOAST_CLASS,
      APP_TOAST_FAIL_CLASS,
      getClassName(options.className),
    ),
  })
}

/**
 * 关闭所有提示。
 * @param immediate 是否立即关闭。
 * @returns 无返回结果。
 */
export function closeAllToast(immediate = true): void {
  closeToast(immediate)
}
