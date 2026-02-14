/**
 * 📌 TypeScript 知识点：
 * 1. 高级泛型用法
 * 2. 泛型约束
 * 3. 条件类型
 * 4. 映射类型
 * 5. 函数式编程
 */

import {
  Dataset,
  FilterFunction,
  CompareFunction,
  AnalysisResult,
  SortOrder,
  AggregateOperation,
  AggregateResult
} from '../types';

// ============================================
// 数据分析器
// ============================================

/**
 * 数据分析器类
 * 
 * 💡 知识点：泛型类
 * - T: 数据类型参数
 * - 可以处理任何类型的数据
 * - 保持类型安全
 */
export class DataAnalyzer<T extends Record<string, any>> {
  private data: Dataset<T>;

  /**
   * 构造函数
   * @param data 要分析的数据集
   */
  constructor(data: Dataset<T>) {
    this.data = [...data]; // 复制数组，避免修改原始数据
  }

  // ============================================
  // 1️⃣ 过滤功能
  // ============================================

  /**
   * 过滤数据
   * 
   * 💡 知识点：
   * - 高阶函数：接收函数作为参数
   * - 返回this实现方法链
   */
  public filter(predicate: FilterFunction<T>): this {
    this.data = this.data.filter(predicate);
    return this;
  }

  /**
   * 按字段值过滤
   * 
   * 💡 知识点：
   * - keyof T: 获取T的所有键
   * - T[K]: 获取键K对应的值类型
   */
  public filterBy<K extends keyof T>(
    field: K,
    value: T[K]
  ): this {
    this.data = this.data.filter(item => item[field] === value);
    return this;
  }

  /**
   * 按数值范围过滤
   * 
   * 💡 知识点：泛型约束
   * - extends number 确保字段是数值类型
   */
  public filterByRange<K extends keyof T>(
    field: K,
    min: T[K] extends number ? number : never,
    max: T[K] extends number ? number : never
  ): this {
    this.data = this.data.filter(item => {
      const value = item[field] as unknown as number;
      return value >= min && value <= max;
    });
    return this;
  }

  // ============================================
  // 2️⃣ 排序功能
  // ============================================

  /**
   * 自定义排序
   * 
   * 💡 知识点：比较函数
   */
  public sort(compareFn: CompareFunction<T>): this {
    this.data.sort(compareFn);
    return this;
  }

  /**
   * 按字段排序
   * 
   * 💡 知识点：
   * - 联合类型
   * - 类型守卫
   */
  public sortBy(
    field: keyof T,
    order: SortOrder = SortOrder.ASC
  ): this {
    this.data.sort((a, b) => {
      const aVal = a[field];
      const bVal = b[field];

      // 数值比较
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return order === SortOrder.ASC ? aVal - bVal : bVal - aVal;
      }

      // 字符串比较
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        const comparison = aVal.localeCompare(bVal, 'zh-CN');
        return order === SortOrder.ASC ? comparison : -comparison;
      }

      return 0;
    });
    return this;
  }

  // ============================================
  // 3️⃣ 聚合功能
  // ============================================

  /**
   * 分组统计
   * 
   * 💡 知识点：
   * - Record<K, V> 创建键值对类型
   * - 数组reduce方法
   */
  public groupBy<K extends keyof T>(
    field: K
  ): Record<string, T[]> {
    return this.data.reduce((groups, item) => {
      const key = String(item[field]);
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(item);
      return groups;
    }, {} as Record<string, T[]>);
  }

  /**
   * 统计聚合
   * 
   * 💡 知识点：
   * - 条件类型
   * - 数值字段筛选
   */
  public aggregate<K extends keyof T>(
    field: K,
    operation: AggregateOperation
  ): number {
    const values = this.data
      .map(item => item[field])
      .filter(val => typeof val === 'number') as number[];

    if (values.length === 0) return 0;

    switch (operation) {
      case 'sum':
        return values.reduce((sum, val) => sum + val, 0);
      
      case 'avg':
        return values.reduce((sum, val) => sum + val, 0) / values.length;
      
      case 'min':
        return Math.min(...values);
      
      case 'max':
        return Math.max(...values);
      
      case 'count':
        return values.length;
      
      default:
        return 0;
    }
  }

  /**
   * 多字段聚合
   * 
   * 💡 知识点：
   * - Partial<Record<K, V>> 部分键值对
   * - 方法重载的替代方案
   */
  public multiAggregate(
    config: Partial<Record<keyof T, AggregateOperation>>
  ): AggregateResult {
    const result: AggregateResult = {};

    for (const [field, operation] of Object.entries(config)) {
      if (operation) {
        const value = this.aggregate(field as keyof T, operation);
        result[`${String(field)}_${operation}`] = value;
      }
    }

    return result;
  }

  // ============================================
  // 4️⃣ 工具方法
  // ============================================

  /**
   * 限制结果数量
   */
  public limit(count: number): this {
    this.data = this.data.slice(0, count);
    return this;
  }

  /**
   * 跳过指定数量
   */
  public skip(count: number): this {
    this.data = this.data.slice(count);
    return this;
  }

  /**
   * 去重
   * 
   * 💡 知识点：
   * - Set数据结构
   * - JSON序列化
   */
  public distinct(): this {
    const seen = new Set<string>();
    this.data = this.data.filter(item => {
      const key = JSON.stringify(item);
      if (seen.has(key)) {
        return false;
      }
      seen.add(key);
      return true;
    });
    return this;
  }

  // ============================================
  // 5️⃣ 结果获取
  // ============================================

  /**
   * 获取结果
   */
  public getResults(): T[] {
    return [...this.data];
  }

  /**
   * 生成分析结果
   * 
   * 💡 知识点：
   * - 组合多个功能
   * - 返回完整的分析结果
   */
  public analyze(
    aggregateConfig?: Partial<Record<keyof T, AggregateOperation>>
  ): AnalysisResult<T> {
    return {
      data: this.getResults(),
      summary: {
        total: this.data.length,
        timestamp: new Date()
      },
      aggregates: aggregateConfig ? this.multiAggregate(aggregateConfig) : undefined
    };
  }

  /**
   * 重置数据
   */
  public reset(newData: Dataset<T>): this {
    this.data = [...newData];
    return this;
  }
}

// ============================================
// 辅助函数
// ============================================

/**
 * 创建分析器
 * 
 * 💡 知识点：
 * - 工厂函数
 * - 类型推断
 */
export function createAnalyzer<T extends Record<string, any>>(
  data: Dataset<T>
): DataAnalyzer<T> {
  return new DataAnalyzer(data);
}

// ============================================
// 📚 知识点详解
// ============================================

/**
 * 1. 泛型约束的层次:
 * 
 *    基础约束：
 *    <T extends Record<string, any>>
 *    - T必须是对象类型
 * 
 *    字段约束：
 *    <K extends keyof T>
 *    - K必须是T的键之一
 * 
 *    值约束：
 *    T[K] extends number
 *    - 字段K的值必须是number
 * 
 * 2. 方法链的威力:
 * 
 *    analyzer
 *      .filter(item => item.price > 100)
 *      .sortBy('date', SortOrder.DESC)
 *      .limit(10)
 *      .getResults();
 * 
 *    每个方法返回this，可以连续调用
 * 
 * 3. 类型安全的好处:
 * 
 *    // ✅ 正确：price是Sale的字段
 *    analyzer.filterBy('price', 100);
 * 
 *    // ❌ 错误：其他不是Sale的字段
 *    analyzer.filterBy('invalid', 100); // 编译错误
 * 
 *    // ✅ 正确：类型匹配
 *    analyzer.filterBy('product', '电脑');
 * 
 *    // ❌ 错误：类型不匹配
 *    analyzer.filterBy('product', 100); // 编译错误
 * 
 * 4. 函数式编程思想:
 * 
 *    - filter、map、reduce等高阶函数
 *    - 不可变数据（复制数组）
 *    - 链式调用
 *    - 纯函数（不修改外部状态）
 * 
 * 5. 性能考虑:
 * 
 *    - 复制数组避免修改原数据
 *    - 链式调用在最后才执行
 *    - 可以添加懒加载优化
 */

// ============================================
// 💡 使用示例
// ============================================

/**
 * import { createAnalyzer } from './analyzers/DataAnalyzer';
 * import { Sale } from './types';
 * 
 * // 创建分析器
 * const analyzer = createAnalyzer<Sale>(salesData);
 * 
 * // 链式调用
 * const result = analyzer
 *   .filterBy('category', '电子产品')
 *   .filterByRange('price', 100, 2000)
 *   .sortBy('price', SortOrder.DESC)
 *   .limit(5)
 *   .analyze({
 *     price: 'sum',
 *     quantity: 'sum'
 *   });
 * 
 * // 分组统计
 * const groups = analyzer.groupBy('category');
 * 
 * // 获取结果
 * const data = analyzer.getResults();
 */
