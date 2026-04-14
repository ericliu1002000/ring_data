/**
 * 设置本地存储。
 * @param key 存储键名。
 * @param value 需要存储的数据。
 * @returns 无返回结果。
 */
export function setStorage<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value))
}

/**
 * 获取本地存储。
 * @param key 存储键名。
 * @param defaultValue 默认值。
 * @returns 解析后的存储数据。
 */
export function getStorage<T>(key: string, defaultValue: T): T {
  const rawValue = localStorage.getItem(key)

  if (!rawValue) {
    return defaultValue
  }

  try {
    return JSON.parse(rawValue) as T
  } catch {
    return defaultValue
  }
}

/**
 * 删除本地存储。
 * @param key 存储键名。
 * @returns 无返回结果。
 */
export function removeStorage(key: string): void {
  localStorage.removeItem(key)
}

/**
 * 清空本地存储。
 * @param keys 需要清理的键名列表。
 * @returns 无返回结果。
 */
export function clearStorage(keys: string[]): void {
  keys.forEach((key) => localStorage.removeItem(key))
}
