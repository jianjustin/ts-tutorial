(function callSignatures() {
    let add = Object.assign((a, b) => a + b, {
        description: "Adds two numbers.",
    });
    function multiple(a, b) { return a * b; }
    ;
    multiple.description = "Multiplies two numbers.";
    console.log(add.description);
    console.log(add(3, 5));
    
    (function logResult(fn) {
        let result = fn(3, 5);
        console.log(fn.description);
        console.log(`3 * 5 = ${result}`);
    })(multiple);
})();