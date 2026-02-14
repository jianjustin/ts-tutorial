import * as fs from 'fs/promises';
import { DataSource } from '../models/DataSource';
import { User } from '../types';

// ============================================
// JSON 读取器
// ============================================

/**
 * JSON文件读取器
 */
export class JsonReader extends DataSource<User> {
  
  /**
   * 实现抽象方法：读取JSON文件
   * 
   * 💡 知识点：
   * - JSON.parse() 的类型问题
   * - 需要进行类型转换和验证
   */
  async read(): Promise<User[]> {
    try {
      // 1. 读取文件内容
      const content = await fs.readFile(this.filePath, 'utf-8');
      
      // 2. 解析JSON
      const data = JSON.parse(content);
      
      // 3. 返回数据（类型为unknown，需要验证）
      return data as User[];
      
    } catch (error) {
      throw new Error(`JSON读取失败: ${error}`);
    }
  }

  /**
   * 实现抽象方法：验证数据
   */
  validate(data: unknown): data is User[] {
    // 1. 检查是否是数组
    if (!Array.isArray(data)) {
      return false;
    }

    // 2. 检查数组是否为空
    if (data.length === 0) {
      return true;
    }

    // 3. 检查每个元素
    return data.every(item => this.isUser(item));
  }

  /**
   * 辅助方法：检查对象是否是User类型
   * 
   * 💡 知识点：
   * - 使用更简洁的验证方式
   * - 利用数组的every方法
   */
  private isUser(obj: any): obj is User {
    const requiredFields = ['id', 'name', 'age', 'email', 'role', 'active'];
    const types = {
      id: 'number',
      name: 'string',
      age: 'number',
      email: 'string',
      role: 'string',
      active: 'boolean'
    };

    // 检查所有必需字段是否存在且类型正确
    return requiredFields.every(field => 
      field in obj && typeof obj[field] === types[field as keyof typeof types]
    );
  }

  /**
   * 额外功能：读取并过滤
   * 
   * 💡 知识点：
   * - 方法可以有额外的业务逻辑
   * - 展示类的灵活性
   */
  public async readActive(): Promise<User[]> {
    const users = await this.read();
    return users.filter(user => user.active);
  }

  /**
   * 额外功能：按角色筛选
   */
  public async readByRole(role: string): Promise<User[]> {
    const users = await this.read();
    return users.filter(user => user.role === role);
  }
}

// ============================================
// 通用JSON读取器（高级用法）
// ============================================

/**
 * 通用JSON读取器
 * 
 * 💡 知识点：
 * 1. 泛型参数
 * 2. 验证函数作为参数
 * 3. 更灵活的设计
 */
export class GenericJsonReader<T> extends DataSource<T> {
  
  /**
   * 构造函数，接收验证函数
   * 
   * 💡 知识点：
   * - 函数作为参数
   * - 类型安全的验证
   */
  constructor(
    filePath: string,
    private validator: (data: unknown) => data is T[]
  ) {
    super(filePath);
  }

  async read(): Promise<T[]> {
    const content = await fs.readFile(this.filePath, 'utf-8');
    const data = JSON.parse(content);
    return data as T[];
  }

  validate(data: unknown): data is T[] {
    return this.validator(data);
  }
}