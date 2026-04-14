const mobilePattern = /^1\d{10}$/
const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{6,20}$/

/**
 * 校验手机号格式。
 * @param mobile 手机号。
 * @returns 是否符合手机号规范。
 */
export function isMobile(mobile: string): boolean {
  return mobilePattern.test(mobile)
}

/**
 * 校验密码强度。
 * @param password 密码文本。
 * @returns 是否符合密码规范。
 */
export function isPassword(password: string): boolean {
  return passwordPattern.test(password)
}

/**
 * 校验必填项。
 * @param value 待校验内容。
 * @returns 是否存在有效值。
 */
export function isRequired(value: string | number | null | undefined): boolean {
  return String(value ?? '').trim().length > 0
}
