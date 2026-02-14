import { XMLParser } from 'fast-xml-parser';
import { DataSource } from '../models/DataSource';
import { Sale, FileType } from '../types';
import * as fs from 'fs';

export class XmlReader extends DataSource<Sale> {
  constructor(filePath: string) {
    super(filePath);
    this.fileType = FileType.XML;
  }

  async read(): Promise<Sale[]> {
    try {
      const content = fs.readFileSync(this.filePath, 'utf-8');
      const parser = new XMLParser(/* 配置选项 */);

      const data: Sale[] = [];
      
      const jsonObj = parser.parse(content);
      //jsonObj解析
      //console.log('解析后的 JSON 对象:', JSON.stringify(jsonObj, null, 2));
      
      if (jsonObj && jsonObj.sales && jsonObj.sales.sale) {
        const salesArray = Array.isArray(jsonObj.sales.sale) ? jsonObj.sales.sale : [jsonObj.sales.sale]; 
        salesArray.forEach((item: unknown) => {
          if (this.isSale(item)) {
            data.push(item);
          }
        });
      }
      return data;  
    } catch (error) {
      throw new Error(`XML 解析失败: ${error}`);
    }
  }

  validate(data: unknown): data is Sale[] {
    // 1. 检查是否是数组
    if (!Array.isArray(data)) {
      console.error('数据验证失败: 不是数组');
      return false;
    }

    // 2. 检查数组是否为空
    if (data.length === 0) {
        console.warn('数据验证警告: 数组为空');
      return true; // 空数组也是有效的
    }

    // 3. 检查每个元素是否符合Sale接口
    return data.every(item => this.isSale(item));
  }

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
}