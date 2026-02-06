(function() {
    function error(message: string): never {
        throw new Error(message);
      }
      - //* 推断的返回值类型为never*
      function fail() {
        return error("Something failed");
      }
      error("error");
})()