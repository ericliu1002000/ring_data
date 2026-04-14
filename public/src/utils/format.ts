import dayjs from 'dayjs'

/**
 * 格式化日期时间。
 * @param value 需要格式化的日期值。
 * @param template 输出模板。
 * @returns 格式化后的日期字符串。
 */
export function formatDate(
  value: string | number | Date,
  template = 'YYYY-MM-DD HH:mm:ss',
): string {
  return dayjs(value).format(template)
}

/**
 * 格式化手机号中间位。
 * @param mobile 手机号。
 * @returns 脱敏后的手机号。
 */
export function formatMobile(mobile: string): string {
  if (mobile.length < 11) {
    return mobile
  }

  return `${mobile.slice(0, 3)}****${mobile.slice(7)}`
}

/**
 * 格式化金额。
 * @param amount 金额数值。
 * @param fractionDigits 小数位数。
 * @returns 带货币符号的金额文本。
 */
export function formatCurrency(amount: number, fractionDigits = 2): string {
  return `¥${amount.toFixed(fractionDigits)}`
}
