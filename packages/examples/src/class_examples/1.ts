interface IAnimal {
    name: string;
    age: number;
    makeSound(): void;
}

class Dog implements IAnimal {
    name: string;
    age: number;

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }

    makeSound(): void {
        console.log("Woof! Woof!");
    }
}

let myDog: IAnimal = new Dog("Buddy", 4);
myDog.makeSound(); // 输出: Woof! Woof!