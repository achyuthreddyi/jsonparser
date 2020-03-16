// function nullparser(input){
//     if(! input.startsWith('null')) return null
//     return [null , input.slice(4)]


    
    
// }
// console.log(nullparser('nullabcd'))
let abc = 'ACHYUTH'
let nullparser = input =>input.startsWith('null')? [null,input.slice(4)] :null
console.log(nullparser(('nullabcd')))
console.log(typeof('nullabcd'))
for(let i=0; i<abc.length;i++){
    console.log(abc[i])

}


