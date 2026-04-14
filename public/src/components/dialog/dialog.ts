import { showConfirmDialog } from 'vant'

interface IConfirmDialogOptions {
  title: string
  message: string
  className?: string
  confirmButtonColor?: string
}

/**
 * 打开统一确认弹窗。
 * @param options 弹窗配置。
 * @returns 用户确认结果。
 */
async function openDialog(options: IConfirmDialogOptions): Promise<boolean> {
  try {
    await showConfirmDialog({
      title: options.title,
      message: options.message,
      className: options.className || 'app-confirm-dialog',
      theme: 'round-button',
      cancelButtonColor: '#EEF2F6',
      confirmButtonColor: options.confirmButtonColor || '#1677FF',
      teleport: 'body',
    })
    return true
  } catch {
    return false
  }
}

/**
 * 打开确认弹窗。
 * @param title 标题。
 * @param message 内容。
 * @returns 用户确认结果。
 */
export async function openConfirmDialog(title: string, message: string): Promise<boolean> {
  return openDialog({
    title,
    message,
  })
}

/**
 * 打开危险确认弹窗。
 * @param title 标题。
 * @param message 内容。
 * @returns 用户确认结果。
 */
export async function openDangerConfirmDialog(title: string, message: string): Promise<boolean> {
  return openDialog({
    title,
    message,
    className: 'app-confirm-dialog app-confirm-dialog--danger',
    confirmButtonColor: '#FF4D4F',
  })
}
