import chalk from 'chalk';

(
    function trutness() {
        console.log(chalk.bgBlueBright("\n8.2 thrutness"));
        let falsy = [0, NaN, "", BigInt(0), null, undefined];
        falsy.forEach((x) => {
            if (!x) {
                console.log(`${x} is false.`);
            }
        });
        let truthy = [1, "a", BigInt(1), { a: 1 }, function () { }];
        truthy.forEach((x) => {
            if (x) {
                console.log(`${x} is true.`);
            }
        });
    })();