/**
 * TypeScript 函数类型
 * 
 * 学习目标：
 * 1. 掌握函数参数和返回值的类型标注
 * 2. 理解可选参数和默认参数
 * 3. 学习剩余参数
 * 4. 了解函数类型表达式
 * 
 * 运行：npx ts-node 01-basics/04-functions.ts
 */

console.log('=== TypeScript 函数类型 ===\n');

// ============================================
// 1. 函数声明
// ============================================

/**
 * 函数参数和返回值类型标注
 */

function add(a: number, b: number): number {
  return a + b;
}

function greet(name: string): string {
  return `Hello, ${name}!`;
}

function log(message: string): void {
  console.log(message);
}

console.log('1. 函数声明：');
console.log('  add(3, 5):', add(3, 5));
console.log('  greet("Alice"):', greet('Alice'));
log('  这是一个 void 函数');

// ❌ 类型不匹配会报错
// add('3', 5);  // Argument of type 'string' is not assignable to parameter of type 'number'
// add(3);       // Expected 2 arguments, but got 1

// ============================================
// 2. 函数表达式
// ============================================

// 箭头函数
const subtract = (a: number, b: number): number => {
  return a - b;
};

// 简写形式
const multiply = (a: number, b: number): number => a * b;

// 匿名函数
const divide = function(a: number, b: number): number {
  return a / b;
};

console.log('\n2. 函数表达式：');
console.log('  subtract(10, 3):', subtract(10, 3));
console.log('  multiply(4, 5):', multiply(4, 5));
console.log('  divide(20, 4):', divide(20, 4));

// ============================================
// 3. 可选参数
// ============================================

/**
 * 使用 ? 标记可选参数
 * 可选参数必须在必需参数之后
 */

function buildName(firstName: string, lastName?: string): string {
  if (lastName) {
    return `${firstName} ${lastName}`;
  }
  return firstName;
}

console.log('\n3. 可选参数：');
console.log('  buildName("Alice"):', buildName('Alice'));
console.log('  buildName("Alice", "Smith"):', buildName('Alice', 'Smith'));

// ❌ 可选参数必须在必需参数之后
// function badFunction(optional?: string, required: string) {}  // 错误

// ============================================
// 4. 默认参数
// ============================================

/**
 * 默认参数：如果未传值，使用默认值
 */

function createTodo(title: string, priority: number = 0): object {
  return { title, priority };
}

console.log('\n4. 默认参数：');
console.log('  createTodo("Learn TS"):', createTodo('Learn TS'));
console.log('  createTodo("Important", 3):', createTodo('Important', 3));

// 有默认值的参数自动成为可选参数
// 可以放在必需参数之前（但通常放在后面）

function greetUser(greeting: string = 'Hello', name: string): string {
  return `${greeting}, ${name}!`;
}

console.log('  greetUser(undefined, "Bob"):', greetUser(undefined, 'Bob'));

// ============================================
// 5. 剩余参数
// ============================================

/**
 * 剩余参数：收集任意数量的参数到数组中
 * 使用 ...参数名 语法
 */

function sum(...numbers: number[]): number {
  return numbers.reduce((total, n) => total + n, 0);
}

function joinStrings(separator: string, ...strings: string[]): string {
  return strings.join(separator);
}

console.log('\n5. 剩余参数：');
console.log('  sum(1, 2, 3, 4, 5):', sum(1, 2, 3, 4, 5));
console.log('  sum(10, 20):', sum(10, 20));
console.log('  joinStrings("-", "a", "b", "c"):', joinStrings('-', 'a', 'b', 'c'));

// ============================================
// 6. 函数类型表达式
// ============================================

/**
 * 定义函数类型
 */

// 方式1：类型别名
type MathOperation = (a: number, b: number) => number;

const addOp: MathOperation = (a, b) => a + b;
const subtractOp: MathOperation = (a, b) => a - b;

console.log('\n6. 函数类型表达式：');
console.log('  addOp(5, 3):', addOp(5, 3));
console.log('  subtractOp(5, 3):', subtractOp(5, 3));

// 方式2：接口（用于对象方法）
interface Calculator {
  add: (a: number, b: number) => number;
  subtract: (a: number, b: number) => number;
}

const calculator: Calculator = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b
};

console.log('  calculator.add(10, 5):', calculator.add(10, 5));

// ============================================
// 7. 函数返回类型推断
// ============================================

/**
 * TypeScript 可以推断返回类型，但显式标注更清晰
 */

// 推断为 number
function inferredReturn(x: number) {
  return x * 2;
}

// 推断为 string | number
function multiReturn(flag: boolean) {
  if (flag) {
    return 'yes';
  }
  return 42;
}

console.log('\n7. 返回类型推断：');
console.log('  inferredReturn(5):', inferredReturn(5));
console.log('  multiReturn(true):', multiReturn(true));
console.log('  multiReturn(false):', multiReturn(false));

// ============================================
// 8. void 和 never
// ============================================

/**
 * void: 函数没有返回值（返回 undefined）
 * never: 函数永远不会返回
 */

function logMessage(msg: string): void {
  console.log(msg);
  // 可以 return; 或不写 return
}

function throwError(message: string): never {
  throw new Error(message);
  // 这个函数永远不会正常返回
}

function infiniteLoop(): never {
  while (true) {
    // 永远循环
  }
}

console.log('\n8. void 类型：');
logMessage('  这是一条日志');

// never 类型的函数不能正常调用
// throwError('Error!');  // 会抛出错误

// ============================================
// 9. 函数重载
// ============================================

/**
 * 函数重载：同一个函数名，不同的参数类型
 */

// 重载签名
function process(value: string): string;
function process(value: number): number;
function process(value: boolean): string;

// 实现签名
function process(value: string | number | boolean): string | number {
  if (typeof value === 'string') {
    return value.toUpperCase();
  } else if (typeof value === 'number') {
    return value * 2;
  } else {
    return value ? 'true' : 'false';
  }
}

console.log('\n9. 函数重载：');
console.log('  process("hello"):', process('hello'));
console.log('  process(5):', process(5));
console.log('  process(true):', process(true as boolean));

// ============================================
// 10. 高阶函数
// ============================================

/**
 * 高阶函数：接收函数作为参数，或返回函数
 */

// 接收函数作为参数
function applyOperation(
  a: number,
  b: number,
  operation: (x: number, y: number) => number
): number {
  return operation(a, b);
}

console.log('\n10. 高阶函数：');
console.log('  applyOperation(5, 3, (a, b) => a + b):', 
  applyOperation(5, 3, (a, b) => a + b));
console.log('  applyOperation(5, 3, (a, b) => a * b):', 
  applyOperation(5, 3, (a, b) => a * b));

// 返回函数
function createMultiplier(factor: number): (n: number) => number {
  return (n: number) => n * factor;
}

const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log('  double(5):', double(5));
console.log('  triple(5):', triple(5));

// ============================================
// 12. 回调函数类型
// ============================================

/**
 * 定义回调函数的类型
 */

type Callback<T> = (error: Error | null, result?: T) => void;

function fetchData(id: string, callback: Callback<string>): void {
  // 模拟异步操作
  setTimeout(() => {
    if (id === 'error') {
      callback(new Error('Not found'));
    } else {
      callback(null, `Data for ${id}`);
    }
  }, 100);
}

console.log('\n12. 回调函数：');
fetchData('123', (error, result) => {
  if (error) {
    console.log('  错误:', error.message);
  } else {
    console.log('  结果:', result);
  }
});

export {};
