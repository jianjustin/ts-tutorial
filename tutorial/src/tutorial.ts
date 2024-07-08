console.log("app")

let greeting:string = "hello typescript"
greeting = greeting.toUpperCase()
console.log(greeting)

let age: number = 25
age = age + 5
console.log(`age=${age}`)

let isAdult: boolean = age>=18
console.log(`isAdult=${isAdult}`)

let tax: number|string = 10
tax = "money"
console.log(`tax=${tax}`)

const books = ["book1", 'book2', 'book3']
let foundbook: string | undefined
for (let book of books) {
    if (book == 'book1'){
        foundbook = book
        console.log(`book found! is ${foundbook.toUpperCase()}`)
        break
    }
}
console.log(`found book ${foundbook?.toLowerCase()}`)

let car: {brand: string; year: number} = {brand:"tesla", year: 2020}
car.toString = function ()   {
    return `year:${this.year},brand:${this.brand}`
}
console.log(`car is ${car}`)