interface SearchFunc {
  (source: string, subString: string): boolean;
}

let mySearch: SearchFunc; //定义为SearchFunc的接口类型
mySearch = function(source: string, subString: string) {
  let result = source.search(subString);
  return result > -1;
}