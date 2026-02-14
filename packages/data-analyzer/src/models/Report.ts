/**
 * 📌 TypeScript 知识点：
 * 1. 类的定义和使用
 * 2. 泛型类
 * 3. 方法链（Method Chaining）
 */

import { AnalysisResult, ReportConfig } from '../types';

// ============================================
// 报告生成器类
// ============================================

/**
 * 报告生成器
 * 
 * 💡 知识点：
 * 1. 泛型类 - 可以处理不同类型的数据
 * 2. 构造函数参数属性 - 简化代码
 * 3. 方法链 - 返回this实现链式调用
 */
export class Report<T> {
  private config: ReportConfig;

  /**
   * 构造函数
   * 
   * 💡 知识点：参数属性
   * - 在参数前加访问修饰符，自动创建并赋值属性
   */
  constructor(
    private result: AnalysisResult<T>,
    config?: Partial<ReportConfig>
  ) {
    // 默认配置 + 用户配置
    this.config = {
      title: '数据分析报告',
      showSummary: true,
      showDetails: true,
      format: 'table',
      ...config
    };
  }

  /**
   * 设置报告标题
   * 
   * 💡 知识点：方法链
   * - 返回this，可以连续调用方法
   */
  public setTitle(title: string): this {
    this.config.title = title;
    return this;
  }

  /**
   * 设置是否显示摘要
   */
  public showSummary(show: boolean): this {
    this.config.showSummary = show;
    return this;
  }

  /**
   * 设置是否显示详情
   */
  public showDetails(show: boolean): this {
    this.config.showDetails = show;
    return this;
  }

  /**
   * 生成报告
   */
  public generate(): string {
    const lines: string[] = [];
    
    // 1. 标题
    lines.push('='.repeat(60));
    lines.push(this.config.title.toUpperCase());
    lines.push('='.repeat(60));
    lines.push('');

    // 2. 摘要
    if (this.config.showSummary) {
      lines.push('📊 数据摘要:');
      lines.push(`   总记录数: ${this.result.summary.total}`);
      lines.push(`   分析时间: ${this.result.summary.timestamp.toLocaleString('zh-CN')}`);
      lines.push('');
    }

    // 3. 聚合结果
    if (this.result.aggregates) {
      lines.push('📈 统计信息:');
      Object.entries(this.result.aggregates).forEach(([key, value]) => {
        lines.push(`   ${key}: ${this.formatNumber(value)}`);
      });
      lines.push('');
    }

    // 4. 详细数据
    if (this.config.showDetails && this.result.data.length > 0) {
      lines.push('📋 详细数据:');
      
      if (this.config.format === 'json') {
        lines.push(JSON.stringify(this.result.data, null, 2));
      } else {
        lines.push(this.generateTable(this.result.data));
      }
      lines.push('');
    }

    lines.push('='.repeat(60));
    
    return lines.join('\n');
  }

  /**
   * 生成表格
   * 
   * 💡 知识点：泛型约束
   * - T extends Record<string, any> 确保T是对象类型
   */
  private generateTable(data: T[]): string {
    if (data.length === 0) return '无数据';

    const lines: string[] = [];
    const sample = data[0] as Record<string, any>;
    const headers = Object.keys(sample);

    // 计算列宽
    const colWidths = headers.map(header => {
      const maxContentWidth = Math.max(
        ...data.map(row => String((row as any)[header]).length)
      );
      return Math.max(header.length, maxContentWidth) + 2;
    });

    // 表头
    const headerRow = headers
      .map((h, i) => h.padEnd(colWidths[i]))
      .join('|');
    lines.push('   ' + headerRow);
    lines.push('   ' + colWidths.map(w => '-'.repeat(w)).join('+'));

    // 数据行
    data.slice(0, 10).forEach(row => {
      const rowData = headers
        .map((h, i) => String((row as any)[h]).padEnd(colWidths[i]))
        .join('|');
      lines.push('   ' + rowData);
    });

    if (data.length > 10) {
      lines.push(`   ... 还有 ${data.length - 10} 条记录`);
    }

    return lines.join('\n');
  }

  /**
   * 格式化数字
   */
  private formatNumber(value: number): string {
    if (Number.isInteger(value)) {
      return value.toLocaleString('zh-CN');
    }
    return value.toFixed(2);
  }

  /**
   * 导出为JSON
   */
  public toJSON(): string {
    return JSON.stringify({
      title: this.config.title,
      summary: this.result.summary,
      aggregates: this.result.aggregates,
      data: this.result.data
    }, null, 2);
  }

  /**
   * 打印报告到控制台
   */
  public print(): void {
    console.log(this.generate());
  }
}
