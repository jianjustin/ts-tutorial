/**
 * 📊 TypeScript 数据分析工具 - 主程序
 * 
 * 💡 这个文件展示了如何：
 * 1. 整合所有模块
 * 2. 使用命令行参数
 * 3. 错误处理
 * 4. 异步流程控制
 */

import { CsvReader } from './readers/CsvReader';
import { JsonReader } from './readers/JsonReader';
import { createAnalyzer } from './analyzers/DataAnalyzer';
import { XmlReader } from './readers/XmlReader';
import { Report } from './models/Report';
import { FileType, SortOrder } from './types';
import { detectFileType } from './utils/helpers';

// ============================================
// 主程序
// ============================================
async function main() {
  console.log('========================================');
  console.log('📊 TypeScript 数据分析工具');
  console.log('========================================\n');

  try {
    // 1. 获取命令行参数
    const args = process.argv.slice(2);
    
    if (args.length === 0) {
      console.log('📖 使用方法:');
      console.log('   npm run dev <文件路径>');
      console.log('\n📝 示例:');
      console.log('   npm run dev data/sales.csv');
      console.log('   npm run dev data/users.json\n');
      return;
    }

    const filePath = args[0];
    const fileType = detectFileType(filePath);

    // 2. 根据文件类型选择读取器
    if (fileType === FileType.CSV) {
      await analyzeSalesData(filePath);
    } else if (fileType === FileType.JSON) {
      await analyzeUserData(filePath);
    } else if (fileType === FileType.XML) {
      await analyzeSalesDataWithXml(filePath);
    } else {
      console.error('❌ 不支持的文件类型');
      console.log('   支持的格式: .csv, .json\n');
    }

  } catch (error) {
    console.error('❌ 程序执行失败:', error);
    process.exit(1);
  }
}

async function analyzeSalesData(filePath: string) {
  console.log('📂 分析销售数据...\n');

  // 1. 读取数据
  const reader = new CsvReader(filePath);
  const sales = await reader.load();

  console.log(`✅ 读取到 ${sales.length} 条销售记录\n`);

  // 2. 创建分析器并进行分析
  const analyzer = createAnalyzer(sales);

  // 示例1：分析电子产品销售
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📊 示例1：电子产品销售分析');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  const electronicsResult = analyzer
    .reset(sales) // 重置数据
    .filterBy('category', '电子产品')
    .sortBy('price', SortOrder.DESC)
    .analyze({
      price: 'sum',
      quantity: 'sum'
    });

  const electronicsReport = new Report(electronicsResult, {
    title: '电子产品销售报告'
  });
  electronicsReport.print();

  // 示例2：高价值商品分析
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📊 示例2：高价值商品分析（价格>500）');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  const highValueResult = analyzer
    .reset(sales)
    .filter(item => item.price > 500)
    .sortBy('price', SortOrder.DESC)
    .limit(5)
    .analyze({
      price: 'avg',
      quantity: 'sum'
    });

  new Report(highValueResult, {
    title: '高价值商品TOP5'
  }).print();

  // 示例3：按类别分组统计
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📊 示例3：按类别分组统计');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  const groups = analyzer.reset(sales).groupBy('category');
  
  console.log('📦 商品类别统计:');
  for (const [category, items] of Object.entries(groups)) {
    const totalRevenue = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    console.log(`   ${category}: ${items.length}个商品, 总收入: ¥${totalRevenue.toLocaleString('zh-CN')}`);
  }
  console.log('');
}

async function analyzeUserData(filePath: string) {
  console.log('📂 分析用户数据...\n');

  // 1. 读取数据
  const reader = new JsonReader(filePath);
  const users = await reader.load();

  console.log(`✅ 读取到 ${users.length} 条用户记录\n`);

  // 2. 创建分析器
  const analyzer = createAnalyzer(users);

  // 示例1：活跃用户分析
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📊 示例1：活跃用户分析');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  const activeResult = analyzer
    .filterBy('active', true)
    .sortBy('age', SortOrder.ASC)
    .analyze({
      age: 'avg'
    });

  new Report(activeResult, {
    title: '活跃用户报告'
  }).print();

  // 示例2：开发者统计
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📊 示例2：开发者统计');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  const devResult = analyzer
    .reset(users)
    .filterBy('role', 'developer')
    .analyze({
      age: 'avg'
    });

  new Report(devResult, {
    title: '开发者统计报告'
  }).print();

  // 示例3：按角色分组
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📊 示例3：按角色分组统计');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  const roleGroups = analyzer.reset(users).groupBy('role');
  
  console.log('👥 用户角色统计:');
  for (const [role, userList] of Object.entries(roleGroups)) {
    const avgAge = userList.reduce((sum, u) => sum + u.age, 0) / userList.length;
    console.log(`   ${role}: ${userList.length}人, 平均年龄: ${avgAge.toFixed(1)}岁`);
  }
  console.log('');
}

async function analyzeSalesDataWithXml(filePath: string) {
  console.log('📂 分析 XML 格式的销售数据...\n');
  
  // 1. 读取数据
  const reader = new XmlReader(filePath);
  const sales = await reader.load();
  console.log(`✅ 读取到 ${sales.length} 条销售记录\n`);

  // 2. 创建分析器并进行分析
  const analyzer = createAnalyzer(sales);

  // 示例：分析电子产品销售
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📊 XML 示例：电子产品销售分析');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  const electronicsResult = analyzer
    .reset(sales) // 重置数据
    .filterBy('category', '电子产品')
    .sortBy('price', SortOrder.DESC)
    .analyze({
      price: 'sum',
      quantity: 'sum'
    });

  const electronicsReport = new Report(electronicsResult, {
    title: 'XML 电子产品销售报告'
  });
  electronicsReport.print();
}

main().catch(error => {
  console.error('💥 未捕获的错误:', error);
  process.exit(1);
});