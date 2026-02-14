/**
 * 📌 TypeScript 知识点：
 */

import { FileType } from '../types';

// ============================================
// 抽象数据源类
// ============================================

/**
 * 抽象数据源类
 * 
 * 💡 知识点：
 * 1. abstract 关键字 - 不能直接实例化
 * 2. 定义通用接口，强制子类实现特定方法
 * 3. 可以包含具体实现的方法
 * 
 * 📖 设计模式：模板方法模式
 * - 定义算法的骨架，让子类实现具体步骤
 */
export abstract class DataSource<T> {
  // protected：子类可以访问，外部不能访问
  protected filePath: string;
  protected fileType: FileType;

  /**
   * 构造函数
   * @param filePath 文件路径
   */
  constructor(filePath: string) {
    this.filePath = filePath;
    this.fileType = this.detectFileType(filePath);
  }

  /**
   * 抽象方法：读取数据
   * 子类必须实现这个方法
   * 
   * 💡 知识点：抽象方法
   * - 只有声明，没有实现
   * - 强制子类提供具体实现
   */
  abstract read(): Promise<T[]>;

  /**
   * 抽象方法：验证数据
   * @param data 要验证的数据
   */
  abstract validate(data: unknown): data is T[];

  /**
   * 具体方法：检测文件类型
   * 
   * 💡 知识点：私有方法
   * - 只在类内部使用
   * - 提供辅助功能
   */
  private detectFileType(path: string): FileType {
    const extension = path.split('.').pop()?.toLowerCase();
    
    switch (extension) {
      case 'csv':
        return FileType.CSV;
      case 'json':
        return FileType.JSON;
      default:
        return FileType.UNKNOWN;
    }
  }

  /**
   * 公共方法：获取文件信息
   * 
   * 💡 知识点：公共方法
   * - 外部可以调用
   * - 提供对外接口
   */
  public getFileInfo(): { path: string; type: FileType } {
    return {
      path: this.filePath,
      type: this.fileType
    };
  }

  /**
   * 公共方法：加载数据（模板方法）
   * 
   * 💡 知识点：模板方法模式
   * - 定义执行流程
   * - 调用抽象方法
   */
  public async load(): Promise<T[]> {
    console.log(`📂 正在读取文件: ${this.filePath}`);
    
    try {
      // 1. 读取数据
      const data = await this.read();
      
      // 2. 验证数据
      if (!this.validate(data)) {
        throw new Error('数据格式验证失败');
      }
      
      // 3. 返回数据
      console.log(`✅ 成功读取 ${data.length} 条记录`);
      return data;
      
    } catch (error) {
      console.error(`❌ 读取文件失败:`, error);
      throw error;
    }
  }
}
