(function sets() {
    const s = new Set([1, 2, "John"]);
    // OK
    s.add(1);
    console.assert(s.size === 4, "Fail: nothing was added, because 1 already exists in the set.");
})();