/**
 * TypeScript 对象和接口
 * 学习目标：
 * 1. 理解对象类型的定义
 * 2. 掌握 interface 的使用
 * 3. 学习可选属性和只读属性
 * 4. 了解索引签名
 */

let user: { name: string; age: number } = {
  name: 'Alice',
  age: 25
};

console.log('1. 内联对象类型：');
console.log('  user:', user);

// ✅ 可以访问属性
console.log('  name:', user.name);
console.log('  age:', user.age);

// ❌ 不能添加未定义的属性
// user.email = 'alice@example.com';  // Property 'email' does not exist

// ❌ 不能遗漏必需属性
// let badUser: { name: string; age: number } = {
//   name: 'Bob'  // Property 'age' is missing
// };

// ============================================
// 2. 使用 interface 定义对象类型
// ============================================

/**
 * interface: 定义对象的"形状"
 * 
 * 优点：
 * - 可复用
 * - 可扩展
 * - 语义清晰
 */

interface Person {
  name: string;
  age: number;
}

let person1: Person = {
  name: 'Bob',
  age: 30
};

let person2: Person = {
  name: 'Charlie',
  age: 35
};

console.log('\n2. interface 定义：');
console.log('  person1:', person1);
console.log('  person2:', person2);

// ============================================
// 3. 可选属性
// ============================================

/**
 * 使用 ? 标记可选属性
 */

interface User {
  id: string;
  name: string;
  email?: string;      // 可选
  phone?: string;      // 可选
}

let user1: User = {
  id: '1',
  name: 'Alice'
  // email 和 phone 可以不提供
};

let user2: User = {
  id: '2',
  name: 'Bob',
  email: 'bob@example.com'
  // phone 可以不提供
};

console.log('\n3. 可选属性：');
console.log('  user1:', user1);
console.log('  user2:', user2);

// 访问可选属性时要注意可能是 undefined
if (user1.email) {
  console.log('  user1 的 email:', user1.email);
} else {
  console.log('  user1 没有 email');
}

// ============================================
// 4. 只读属性
// ============================================

/**
 * readonly: 属性只能在创建时赋值，之后不能修改
 */

interface ReadonlyUser {
  readonly id: string;
  name: string;
}

let readonlyUser: ReadonlyUser = {
  id: 'user-123',
  name: 'Alice'
};

console.log('\n4. 只读属性：');
console.log('  readonlyUser:', readonlyUser);

// ✅ 可以修改普通属性
readonlyUser.name = 'Alice Smith';
console.log('  修改 name 后:', readonlyUser);

// ❌ 不能修改只读属性
// readonlyUser.id = 'new-id';  // Cannot assign to 'id' because it is a read-only property

// ============================================
// 5. 接口继承
// ============================================

/**
 * 接口可以继承其他接口
 */

interface Animal {
  name: string;
  age: number;
}

interface Dog extends Animal {
  breed: string;
  bark(): void;
}

let dog: Dog = {
  name: 'Buddy',
  age: 3,
  breed: 'Golden Retriever',
  bark() {
    console.log('Woof woof!');
  }
};

console.log('\n5. 接口继承：');
console.log('  dog:', dog);
dog.bark();

// ============================================
// 6. 多重继承
// ============================================

interface Named {
  name: string;
}

interface Aged {
  age: number;
}

interface Student extends Named, Aged {
  studentId: string;
}

let student: Student = {
  name: 'David',
  age: 20,
  studentId: 'S12345'
};

console.log('\n6. 多重继承：');
console.log('  student:', student);

// ============================================
// 7. 索引签名
// ============================================

/**
 * 索引签名：对象可以有任意数量的属性
 */

interface StringDictionary {
  [key: string]: string;
}

let dictionary: StringDictionary = {
  hello: '你好',
  goodbye: '再见',
  thanks: '谢谢'
};

console.log('\n7. 索引签名：');
console.log('  dictionary:', dictionary);
console.log('  hello:', dictionary['hello']);
console.log('  goodbye:', dictionary.goodbye);

// 可以动态添加属性
dictionary.welcome = '欢迎';
dictionary['bye'] = '拜拜';
console.log('  添加后:', dictionary);

// ============================================
// 8. 混合索引签名
// ============================================

interface UserWithMetadata {
  id: string;
  name: string;
  [key: string]: string;  // 可以有其他任意字符串属性
}

let userWithMeta: UserWithMetadata = {
  id: '1',
  name: 'Alice',
  role: 'admin',
  department: 'Engineering'
};

console.log('\n8. 混合索引签名：');
console.log('  userWithMeta:', userWithMeta);

// ============================================
// 9. 函数类型
// ============================================

/**
 * 接口也可以描述函数类型
 */

interface SearchFunc {
  (source: string, subString: string): boolean;
}

let mySearch: SearchFunc = function(src, sub) {
  return src.indexOf(sub) > -1;
};

console.log('\n9. 函数类型接口：');
console.log('  搜索 "hello" 在 "hello world" 中:', mySearch('hello world', 'hello'));

export {};
