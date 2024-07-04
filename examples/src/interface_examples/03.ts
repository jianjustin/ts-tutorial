(
    function contract() {
        interface IAnimal {
            readonly sound: string; //只读属性
        };

        function makeSound(animal: IAnimal) {
            console.log(`${animal.sound}`);
        }

        let dog: IAnimal = { sound: "bark" };
        let cat: IAnimal = { sound: "meoy" };

        makeSound(dog);
        makeSound(cat);
    }
)();