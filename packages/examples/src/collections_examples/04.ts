(function maps() {
    const map = new Map();
    map.set("apple", 10);
    map.set("banana", 20);
    // OK
    console.log(map.get("apple"));
    // OK
    console.log(map.get("lemon"));
})();