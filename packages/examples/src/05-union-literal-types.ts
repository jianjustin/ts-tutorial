/**
 * TypeScript 联合类型和字面量类型
 * 
 * 学习目标：
 * 1. 理解联合类型的概念
 * 2. 掌握字面量类型
 * 3. 学习类型收窄
 * 4. 了解类型断言
 */

console.log('=== TypeScript 联合类型和字面量类型 ===\n');

// ============================================
// 1. 联合类型基础
// ============================================

/**
 * 联合类型：一个值可以是几种类型之一
 * 使用 | 符号
 */

let value: string | number;

value = 'hello';  // ✅
console.log('1. 联合类型：');
console.log('  value (string):', value);

value = 42;       // ✅
console.log('  value (number):', value);

// value = true;  // ❌ Type 'boolean' is not assignable

// ============================================
// 2. 联合类型的函数参数
// ============================================

function printId(id: string | number): void {
  console.log('  ID:', id);
}

console.log('\n2. 联合类型参数：');
printId('abc-123');
printId(456);

// ============================================
// 3. 类型收窄（Type Narrowing）
// ============================================

/**
 * 在使用联合类型时，TypeScript 需要知道具体是哪种类型
 * 使用类型守卫来"收窄"类型
 */

function processValue(value: string | number): string {
  // 使用 typeof 类型守卫
  if (typeof value === 'string') {
    // 这里 value 被收窄为 string 类型
    return value.toUpperCase();
  } else {
    // 这里 value 被收窄为 number 类型
    return value.toFixed(2);
  }
}

console.log('\n3. 类型收窄：');
console.log('  processValue("hello"):', processValue('hello'));
console.log('  processValue(3.14159):', processValue(3.14159));

// ============================================
// 4. 字面量类型
// ============================================

/**
 * 字面量类型：使用具体的值作为类型
 */

// 字符串字面量类型
let direction: 'up' | 'down' | 'left' | 'right';

direction = 'up';      // ✅
direction = 'down';    // ✅
// direction = 'forward';  // ❌ Type '"forward"' is not assignable

console.log('\n4. 字面量类型：');
console.log('  direction:', direction);

// 数字字面量类型
let diceRoll: 1 | 2 | 3 | 4 | 5 | 6;
diceRoll = 3;   // ✅
// diceRoll = 7;   // ❌

console.log('  diceRoll:', diceRoll);

// 布尔字面量类型（少见）
let isTrue: true;
isTrue = true;   // ✅
// isTrue = false;  // ❌

// ============================================
// 5. 类型别名 + 字面量类型
// ============================================

/**
 * 将字面量联合类型命名，提高可读性
 */

type Direction = 'north' | 'south' | 'east' | 'west';
type DiceRoll = 1 | 2 | 3 | 4 | 5 | 6;
type Status = 'pending' | 'approved' | 'rejected';

function move(direction: Direction): void {
  console.log(`Moving ${direction}`);
}

function updateStatus(status: Status): void {
  console.log(`Status updated to: ${status}`);
}

console.log('\n5. 类型别名 + 字面量：');
move('north');
updateStatus('approved');

// ============================================
// 6. Todo App 中的字面量类型 ⭐⭐⭐
// ============================================

/**
 * Todo App 大量使用字面量类型来确保类型安全
 * 
 * 来自 packages/shared/src/types/Todo.ts
 */

// 优先级：只能是 0, 1, 2, 3
type TodoPriority = 0 | 1 | 2 | 3;

// 项目类型
type ItemType = 'task' | 'event' | 'note';

// 子弹状态
type BulletStatus = 'open' | 'completed' | 'migrated' | 'scheduled' | 'cancelled';

// 区域类型
type AreaType = 'inbox' | 'today' | 'anytime' | 'upcoming' | 'someday' | 'logbook';

console.log('\n6. Todo App 字面量类型：');

// 使用这些类型
let priority: TodoPriority = 2;
let itemType: ItemType = 'task';
let status: BulletStatus = 'open';
let area: AreaType = 'today';

console.log('  priority:', priority);
console.log('  itemType:', itemType);
console.log('  status:', status);
console.log('  area:', area);

// ❌ 这些都会报错：
// priority = 5;  // Type '5' is not assignable to type 'TodoPriority'
// itemType = 'reminder';  // Type error
// status = 'pending';     // Type error
// area = 'archive';       // Type error

/**
 * 💡 为什么使用字面量类型而不是 string？
 * 
 * 如果用 string：
 * let status: string = 'anything';  // 任何字符串都可以
 * 
 * 使用字面量类型：
 * let status: BulletStatus = 'open';  // 只能是指定的几个值
 * 
 * 好处：
 * 1. 类型安全 - 防止拼写错误
 * 2. 自动补全 - IDE 会提示可用的值
 * 3. 重构安全 - 修改值时会自动找出所有使用的地方
 */

// ============================================
// 7. 函数返回值的字面量类型
// ============================================

function getItemType(input: string): ItemType {
  if (input === 'event') {
    return 'event';
  } else if (input === 'note') {
    return 'note';
  } else {
    return 'task';  // 默认值
  }
}

console.log('\n7. 返回字面量类型：');
console.log('  getItemType("event"):', getItemType('event'));
console.log('  getItemType("other"):', getItemType('other'));

// ============================================
// 8. 字面量类型的类型收窄
// ============================================

function handleBulletStatus(status: BulletStatus): string {
  switch (status) {
    case 'open':
      return '○ Open';
    case 'completed':
      return '✓ Completed';
    case 'migrated':
      return '→ Migrated';
    case 'scheduled':
      return '< Scheduled';
    case 'cancelled':
      return 'X Cancelled';
    default:
      // 穷尽性检查：如果所有 case 都覆盖了，这里永远不会到达
      const exhaustiveCheck: never = status;
      throw new Error(`Unhandled status: ${exhaustiveCheck}`);
  }
}

console.log('\n8. 字面量类型的 switch：');
console.log('  handleBulletStatus("open"):', handleBulletStatus('open'));
console.log('  handleBulletStatus("completed"):', handleBulletStatus('completed'));

// ============================================
// 9. 对象字面量类型
// ============================================

interface TodoBasic {
  id: string;
  title: string;
  priority: TodoPriority;     // 使用字面量类型
  itemType: ItemType;         // 使用字面量类型
  bulletStatus: BulletStatus; // 使用字面量类型
  area: AreaType;            // 使用字面量类型
}

const todo: TodoBasic = {
  id: 'todo-1',
  title: 'Learn TypeScript',
  priority: 1,
  itemType: 'task',
  bulletStatus: 'open',
  area: 'today'
};

console.log('\n9. 完整的 Todo 对象：');
console.log('  todo:', todo);

// 修改状态
function completeTodo(t: TodoBasic): void {
  t.bulletStatus = 'completed';
  console.log('  Todo completed!');
}

completeTodo(todo);

// ============================================
// 10. null 联合类型
// ============================================

/**
 * 处理可能为 null 的值
 */

let deadline: string | null = '2026-02-10';

console.log('\n10. null 联合类型：');
console.log('  deadline:', deadline);

// 修改为 null
deadline = null;
console.log('  deadline (no deadline):', deadline);

// 使用前检查
if (deadline !== null) {
  console.log('  截止日期是:', deadline);
} else {
  console.log('  没有截止日期');
}

// ============================================
// 11. undefined 联合类型
// ============================================

/**
 * 可选属性自动是 T | undefined 类型
 */

interface TodoWithOptional {
  id: string;
  title: string;
  description?: string;  // 等同于 description: string | undefined
}

const todoWithDesc: TodoWithOptional = {
  id: '1',
  title: 'Task',
  description: 'Details'
};

const todoWithoutDesc: TodoWithOptional = {
  id: '2',
  title: 'Task'
  // description 可以不提供
};

console.log('\n11. undefined 联合类型：');
console.log('  todoWithDesc.description:', todoWithDesc.description);
console.log('  todoWithoutDesc.description:', todoWithoutDesc.description);

// ============================================
// 12. 类型断言（Type Assertion）
// ============================================

/**
 * 有时你比 TypeScript 更了解类型
 */

// 场景：从 API 获取数据
function getTodoFromAPI(): any {
  return {
    id: '1',
    title: 'Todo',
    priority: 1,
    itemType: 'task',
    bulletStatus: 'open',
    area: 'inbox'
  };
}

// 使用 as 断言类型
const apiTodo = getTodoFromAPI() as TodoBasic;

console.log('\n12. 类型断言：');
console.log('  apiTodo:', apiTodo);
console.log('  apiTodo.priority:', apiTodo.priority);

// ⚠️ 类型断言不做运行时检查！
// 如果数据不符合类型，运行时可能出错

// ============================================
// 13. 辨别联合类型（Discriminated Unions）
// ============================================

/**
 * 使用公共属性来区分联合类型
 */

interface TaskItem {
  type: 'task';
  isDone: boolean;
}

interface EventItem {
  type: 'event';
  startTime: string;
  endTime: string;
}

interface NoteItem {
  type: 'note';
  content: string;
}

type TodoItem = TaskItem | EventItem | NoteItem;

function processTodoItem(item: TodoItem): string {
  // TypeScript 根据 type 字段自动收窄类型
  switch (item.type) {
    case 'task':
      // 这里 item 是 TaskItem
      return `Task: ${item.isDone ? 'Done' : 'Not done'}`;
    case 'event':
      // 这里 item 是 EventItem
      return `Event: ${item.startTime} - ${item.endTime}`;
    case 'note':
      // 这里 item 是 NoteItem
      return `Note: ${item.content}`;
  }
}

console.log('\n13. 辨别联合：');
console.log('  task:', processTodoItem({ type: 'task', isDone: false }));
console.log('  event:', processTodoItem({ type: 'event', startTime: '9:00', endTime: '10:00' }));

export {};
