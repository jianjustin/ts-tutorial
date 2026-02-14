/**
 * 📌 TypeScript 知识点：
 * 1. 函数重载 (Function Overloading)
 * 2. 类型守卫函数
 * 3. 工具类型 (Utility Types)
 * 4. 联合类型和类型窄化
 */

import { Sale, User, FileType } from '../types';

// ============================================
// 1️⃣ 类型守卫函数
// ============================================

/**
 * 检查是否是Sale类型
 * 
 * 💡 知识点：类型谓词 (Type Predicate)
 * - 使用 "obj is Sale" 语法
 * - 帮助TypeScript推断类型
 */
export function isSale(obj: unknown): obj is Sale {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'id' in obj &&
    'product' in obj &&
    'price' in obj
  );
}

/**
 * 检查是否是User类型
 */
export function isUser(obj: unknown): obj is User {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'id' in obj &&
    'name' in obj &&
    'email' in obj
  );
}

/**
 * 检查是否是数值
 */
export function isNumber(value: unknown): value is number {
  return typeof value === 'number' && !isNaN(value);
}

/**
 * 检查是否是字符串
 */
export function isString(value: unknown): value is string {
  return typeof value === 'string';
}

// ============================================
// 2️⃣ 函数重载
// ============================================

/**
 * 格式化值
 * 
 * 💡 知识点：函数重载
 * - 多个函数签名
 * - 一个实现
 * - TypeScript根据参数类型选择正确的签名
 */

// 重载签名1：格式化数字
export function formatValue(value: number): string;
// 重载签名2：格式化字符串
export function formatValue(value: string): string;
// 重载签名3：格式化布尔值
export function formatValue(value: boolean): string;
// 实现签名（必须兼容所有重载签名）
export function formatValue(value: number | string | boolean): string {
  if (typeof value === 'number') {
    return value.toLocaleString('zh-CN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }
  
  if (typeof value === 'boolean') {
    return value ? '是' : '否';
  }
  
  return value;
}

// ============================================
// 3️⃣ 工具函数
// ============================================

/**
 * 安全获取对象属性
 * 
 * 💡 知识点：
 * - 可选链 (?.)
 * - 空值合并 (??)
 * - 泛型函数
 */
export function safeGet<T extends Record<string, any>, K extends keyof T>(
  obj: T | null | undefined,
  key: K,
  defaultValue: T[K]
): T[K] {
  return obj?.[key] ?? defaultValue;
}

/**
 * 深拷贝对象
 * 
 * 💡 知识点：
 * - JSON序列化
 * - 泛型约束
 */
export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * 数组去重
 * 
 * 💡 知识点：
 * - Set数据结构
 * - 扩展运算符 (...)
 */
export function unique<T>(array: T[]): T[] {
  return [...new Set(array)];
}

/**
 * 按字段去重
 * 
 * 💡 知识点：
 * - 泛型约束
 * - keyof操作符
 * - Map数据结构
 */
export function uniqueBy<T extends Record<string, any>, K extends keyof T>(
  array: T[],
  key: K
): T[] {
  const seen = new Map<T[K], T>();
  array.forEach(item => {
    if (!seen.has(item[key])) {
      seen.set(item[key], item);
    }
  });
  return Array.from(seen.values());
}

// ============================================
// 4️⃣ 数据转换
// ============================================

/**
 * 选择对象的部分属性
 * 
 * 💡 知识点：
 * - Pick工具类型
 * - 数组的reduce方法
 */
export function pick<T extends Record<string, any>, K extends keyof T>(
  obj: T,
  keys: K[]
): Pick<T, K> {
  return keys.reduce((result, key) => {
    if (key in obj) {
      result[key] = obj[key];
    }
    return result;
  }, {} as Pick<T, K>);
}

/**
 * 排除对象的部分属性
 * 
 * 💡 知识点：
 * - Omit工具类型
 * - Object.entries
 */
export function omit<T extends Record<string, any>, K extends keyof T>(
  obj: T,
  keys: K[]
): Omit<T, K> {
  const keysToOmit = new Set(keys);
  return Object.entries(obj).reduce((result, [key, value]) => {
    if (!keysToOmit.has(key as K)) {
      result[key as keyof Omit<T, K>] = value;
    }
    return result;
  }, {} as Omit<T, K>);
}

/**
 * 将对象数组转换为键值对
 * 
 * 💡 知识点：
 * - Record工具类型
 * - 泛型函数
 */
export function keyBy<T extends Record<string, any>, K extends keyof T>(
  array: T[],
  key: K
): Record<string, T> {
  return array.reduce((result, item) => {
    const keyValue = String(item[key]);
    result[keyValue] = item;
    return result;
  }, {} as Record<string, T>);
}

// ============================================
// 5️⃣ 验证函数
// ============================================

/**
 * 检查对象是否有所有必需的键
 * 
 * 💡 知识点：
 * - 数组的every方法
 * - in操作符
 */
export function hasKeys<T extends Record<string, any>>(
  obj: unknown,
  keys: (keyof T)[]
): obj is T {
  if (typeof obj !== 'object' || obj === null) {
    return false;
  }
  return keys.every(key => key in obj);
}

/**
 * 验证邮箱格式
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * 验证日期格式 (YYYY-MM-DD)
 */
export function isValidDate(date: string): boolean {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(date)) {
    return false;
  }
  const dateObj = new Date(date);
  return !isNaN(dateObj.getTime());
}

// ============================================
// 6️⃣ 文件工具
// ============================================

/**
 * 检测文件类型（带泛型重载）
 * 
 * 💡 知识点：
 * - 函数重载
 * - 字面量类型
 */
export function detectFileType(filePath: string): FileType {
  const extension = filePath.split('.').pop()?.toLowerCase();
  
  switch (extension) {
    case 'csv':
      return FileType.CSV;
    case 'json':
      return FileType.JSON;
    case 'xml':
      return FileType.XML;
    default:
      return FileType.UNKNOWN;
  }
}

/**
 * 获取文件扩展名
 */
export function getFileExtension(filePath: string): string {
  return filePath.split('.').pop()?.toLowerCase() || '';
}

/**
 * 获取文件名（不含扩展名）
 */
export function getFileName(filePath: string): string {
  const parts = filePath.split('/');
  const fullName = parts[parts.length - 1];
  return fullName.split('.')[0];
}

// ============================================
// 7️⃣ 数学工具
// ============================================

/**
 * 计算百分比
 */
export function percentage(value: number, total: number): number {
  if (total === 0) return 0;
  return (value / total) * 100;
}

/**
 * 四舍五入到指定小数位
 */
export function round(value: number, decimals: number = 2): number {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}

/**
 * 数值范围限制
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

// ============================================
// 📚 知识点详解
// ============================================

/**
 * 1. 函数重载 vs 联合类型:
 * 
 *    函数重载（更精确）：
 *    function format(value: number): string;
 *    function format(value: string): string;
 *    
 *    联合类型（更简单）：
 *    function format(value: number | string): string;
 * 
 *    选择标准：
 *    - 需要不同返回类型：使用重载
 *    - 返回类型相同：使用联合类型
 * 
 * 2. 工具类型汇总:
 * 
 *    - Partial<T>: 所有属性可选
 *    - Required<T>: 所有属性必需
 *    - Readonly<T>: 所有属性只读
 *    - Pick<T, K>: 选择部分属性
 *    - Omit<T, K>: 排除部分属性
 *    - Record<K, V>: 创建键值对类型
 * 
 * 3. 类型守卫的应用场景:
 * 
 *    - 判断联合类型的具体类型
 *    - 验证外部数据（API、文件）
 *    - 类型窄化
 *    - 安全的类型转换
 * 
 * 4. 泛型函数的威力:
 * 
 *    - 类型安全
 *    - 代码复用
 *    - 智能提示
 *    - 编译时检查
 */

// ============================================
// 💡 使用示例
// ============================================

/**
 * // 类型守卫
 * if (isSale(data)) {
 *   console.log(data.price); // TypeScript知道这是Sale
 * }
 * 
 * // 函数重载
 * const num = formatValue(1234.5678); // "1,234.57"
 * const bool = formatValue(true);     // "是"
 * 
 * // 工具函数
 * const picked = pick(user, ['id', 'name']);
 * const unique = uniqueBy(sales, 'id');
 * 
 * // 数学工具
 * const percent = percentage(50, 200);  // 25
 * const rounded = round(3.14159, 2);    // 3.14
 */
