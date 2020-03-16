const fs = require('fs')

// let data = fs.readFile('simpy.txt', 'utf-8', (err, data) => { 
//     if (err) throw err; 
  
   
//     console.log(data); 
// }) 
// // data = data.toString()

let data1 = fs.readFileSync('simpy.txt')
data1 = data1.toString()
console.log((data1))
a = data.toString();    

console.log('achyuth',typeof(data))
const nullparser = input =>input.startsWith('null')? [null,input.slice(5)] :null
// const boolparser = input =>input.startsWith('true') ?[true,input.slice(5)]:(input.startsWith('\'false')?[false,input.slice(6)]:null)


// const stringparser = function(input){
//     let i=1; internal ='', extra =0;
//     console.log('ach',typeof(input))

//     // for(let i=0; i<input.length;i++){
//     //     console.log(input[i])
//     // }
//     // if(input[0] === '\''){
//         if(input.startsWith('\'')){
//         while(i< input.length){ mjh

//             console.log(input[i])
//             if ( input[i] === '"' && input[i-1] !='\\') return [internal,input.slice(internal.length+extra+2)]
//             if (input[i] != '\\') internal = internal.concat(input[i]) 
//             console.log(internal)
//             i +=1
//         }

//     }
//     else return 'here null'
// }

console.log(nullparser(data1))
// console.log(boolparser(data))