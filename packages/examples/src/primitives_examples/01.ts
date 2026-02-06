import chalk from 'chalk';

(
function types() {
    console.log(chalk.bgBlueBright("\nstarting"));
    let one = 1;
    console.log(`'${one}' is of type number.`);
    
    let message = "message";
    console.log(`'${message}' is of type string.`);
    
    let flag = true;
    console.log(`'${flag}' is of type boolean.`);
    
    let none = null;
    console.log(`'${none}' is of type null.`);
    
    let missing = undefined;
    console.log(`'${missing}' is of type undefined.`);
    
    const s = Symbol('mySymbol');
    console.log(`'${s.toString()}' is of type symbol.`);
    
    const bigNumber = BigInt(9007199254740991);
    console.log(`'${bigNumber.toString()}' is of type bigint.`);
})();

