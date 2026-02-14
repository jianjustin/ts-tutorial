import * as fs from 'fs/promises';
import { DataSource } from '../models/DataSource';
import { Sale } from '../types';

/**
 * CSV文件读取器
 */
export class CsvReader extends DataSource<Sale> {
  
  /**
   * 实现抽象方法：读取CSV文件
   */
  async read(): Promise<Sale[]> {
    try {
      // 1. 读取文件内容
      const content = await fs.readFile(this.filePath, 'utf-8');
      
      // 2. 解析CSV
      const lines = content.trim().split('\n');
      
      // 3. 转换为对象数组
      const data: Sale[] = [];
      
      for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',').map(v => v.trim());
        const sale: Sale = {
          id: Number(values[0]),
          product: values[1],
          category: values[2],
          price: Number(values[3]),
          quantity: Number(values[4]),
          date: values[5]
        };
        data.push(sale);
      }
      
      return data;
      
    } catch (error) {
      throw new Error(`CSV读取失败: ${error}`);
    }
  }

  /**
   * 实现抽象方法：验证数据
   */
  validate(data: unknown): data is Sale[] {
    // 1. 检查是否是数组
    if (!Array.isArray(data)) {
      return false;
    }

    // 2. 检查数组是否为空
    if (data.length === 0) {
      return true; // 空数组也是有效的
    }

    // 3. 检查每个元素是否符合Sale接口
    return data.every(item => this.isSale(item));
  }

  /**
   * 辅助方法：检查对象是否是Sale类型
   * 
   * 💡 知识点：
   * - 运行时类型检查
   * - typeof 和 in 操作符
   * - 类型谓词 (Type Predicate)
   */
  private isSale(obj: any): obj is Sale {
    return (
      typeof obj === 'object' &&
      obj !== null &&
      'id' in obj && typeof obj.id === 'number' &&
      'product' in obj && typeof obj.product === 'string' &&
      'category' in obj && typeof obj.category === 'string' &&
      'price' in obj && typeof obj.price === 'number' &&
      'quantity' in obj && typeof obj.quantity === 'number' &&
      'date' in obj && typeof obj.date === 'string'
    );
  }

  /**
   * 额外功能：解析特定格式的CSV
   * 
   * 💡 知识点：方法重载
   */
  public async readWithDelimiter(delimiter: string = ','): Promise<Sale[]> {
    const content = await fs.readFile(this.filePath, 'utf-8');
    const lines = content.trim().split('\n');
    // const headers = lines[0].split(delimiter).map(h => h.trim()); // 保留用于调试
    
    const data: Sale[] = [];
    
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(delimiter).map(v => v.trim());
      const sale: Sale = {
        id: Number(values[0]),
        product: values[1],
        category: values[2],
        price: Number(values[3]),
        quantity: Number(values[4]),
        date: values[5]
      };
      data.push(sale);
    }
    
    return data;
  }
}
