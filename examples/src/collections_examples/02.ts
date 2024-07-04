(function tuples() {
    let person: [string, number, boolean] = ["John", 30, true];
    console.log(person[0]);
    console.log(person[1]);
    console.log(person[2]);
    const [name, age, isEmployed] = person;
    console.log(name);
    console.log(age);
    console.log(isEmployed);
    person.forEach(item => {
        console.log(item);
    });
    const upperCaseName = person[0].toUpperCase();
        console.log(upperCaseName);
})();