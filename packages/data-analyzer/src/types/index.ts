/**
 * 文件类型枚举
 */
export enum FileType {
  CSV = 'csv',
  JSON = 'json',
  XML = 'xml',
  UNKNOWN = 'unknown'
}

/**
 * 排序方式枚举
 */
export enum SortOrder {
  ASC = 'asc',   // 升序
  DESC = 'desc'  // 降序
}

/**
 * 销售记录接口
 */
export interface Sale {
  id: number;
  product: string;
  category: string;
  price: number;
  quantity: number;
  date: string;
}

/**
 * 用户接口
 */
export interface User {
  id: number;
  name: string;
  age: number;
  email: string;
  role: string;
  active: boolean;
}

/**
 * 通用数据记录接口
 */
export interface DataRecord {
  [key: string]: string | number | boolean;
}

/**
 * 数据集类型
 */
export type Dataset<T> = T[];

/**
 * 过滤函数类型
 */
export type FilterFunction<T> = (item: T) => boolean;

/**
 * 比较函数类型
 * 用于排序
 */
export type CompareFunction<T> = (a: T, b: T) => number;

/**
 * 聚合结果类型
 */
export type AggregateResult = Record<string, number>;


/**
 * 支持的数据类型
 */
export type SupportedData = Sale | User | DataRecord;

/**
 * 统计操作类型
 */
export type AggregateOperation = 'sum' | 'avg' | 'min' | 'max' | 'count';

/**
 * 数值字段约束
 */
export type NumericField<T> = {
  [K in keyof T]: T[K] extends number ? K : never;
}[keyof T];

/**
 * 分析配置接口
 */
export interface AnalyzerConfig<T> {
  sortBy?: keyof T;           // 排序字段（可选）
  sortOrder?: SortOrder;       // 排序方式（可选）
  limit?: number;              // 限制结果数量（可选）
  groupBy?: keyof T;          // 分组字段（可选）
}

/**
 * 报告配置接口
 */
export interface ReportConfig {
  title: string;               // 报告标题
  showSummary: boolean;        // 是否显示摘要
  showDetails: boolean;        // 是否显示详情
  format?: 'table' | 'json';  // 输出格式（可选）
}

/**
 * 分析结果接口
 */
export interface AnalysisResult<T> {
  data: T[];                   // 处理后的数据
  summary: {
    total: number;             // 总记录数
    timestamp: Date;           // 分析时间
  };
  aggregates?: AggregateResult; // 聚合结果（可选）
}
