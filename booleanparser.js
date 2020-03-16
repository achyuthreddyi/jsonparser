
let boolparser = input =>input.startsWith('true') ?[true,input.slice(4)]:(input.startsWith('false')?[false,input.slice(5)]:null)
console.log(boolparser('avjghfkjghs'))
console.log(boolparser('falseabcd'))
console.log(boolparser('trueabcd'))
// console.log(boolparser(data))