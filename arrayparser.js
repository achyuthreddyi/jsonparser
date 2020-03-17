const fs = require('fs')
let input = fs.readFileSync('simpy.txt')
// console.log(data)
input = input.toString()

// nothing but

const arrayparser = function(input){
    let finalresult = []
    // input = input.trim()
    if(input.startsWith('[')){
        console.log(typeof(input))
        input = input.slice(1)
        console.log(input)
        input = input.slice(1)
        console.log(input)
        while(input[0] != ']'){
            // input.trim()
            let a= valueparser(input)
            if (a === null ) return null 
            finalresult.push(a[0])
            input = a[1]
            if (input[0] === ','){
                input = input.slice(1)
                

            }
            if (input.startsWith(']')) return null

        }
        return [finalresult,input.slice(1)]

    }
    return null 
    

}







  // input.slice(a[0].length)
        // console.log(finalresult)
        // console.log(a)
        // let a= finalresult.push(valueparser(input)[0])
        // console.log(valueparser(finalresult))
        // console.log(finalresult)

let nullparser = input =>input.startsWith('null')? [null,input.slice(4)] :null
function numberParse (input) {
    const regex = /(^[-]?[1-9]\d*([.]\d+)?([eE][+-]?\d+)?)|(^[-]?0([.]\d+)([eE][+-]?\d+)?)|(^[-]?0[eE][+-]?\d+)|(^[-]?0)/
    // const regex1 =/ (^[-]?0([.]\d+)([eE][+-]?\d+)?)/ //number with e 
    // const regex2 = /(^[-]?0[eE][+-]?\d+)])/ // 
    // const regex3 = /^[-]?0$/ // for only zero
    
    const result = input.match(regex)
    // console.log (result)
      
    if (result === null) return null
    return [(input.slice(0, result[0].length)) * 1,input.slice(result[0].length)]
      
    
  }



  const stringParser = function( input ){
    let i = 1, captured = '', extra = 0;
    if( input.startsWith('"')){
     
        while( i < input.length ){
      if( input[i] === '"' && input[i-1] != '\\')  return [captured, input.slice(captured.length + extra+2)];
      if( input[i] != '\\' ) captured = captured.concat(input[i]);
      else if( input[i] === '\\' ){
        switch (input[i+1]){
            // update this using short circuiting
          case '\\' : captured += '\\'; extra++; break;
          case '"' : captured+= '\"'; extra++; break;
          case '/' : captured += '\/'; extra++; break;
          case 'b' : captured+= '\b'; extra++; break;
          case 'f' : captured+= '\f'; extra++; break;
          case 'n' : captured += '\n'; extra++; break;
          case 'r' : captured += '\r'; extra++; break;
          case 't' : captured += '\t'; extra++; break;       
          case 'u': abc = parseInt(input.slice(i+2,i+6),16); 
          // console.log(abc)
                    captured +="\/u"+  abc.toString(16);extra +=5;i+=4;break;                  
          default : return null;
        } 
        i++;
      }
      else return null;
      i++;
    }
      if( captured[captured.length-1] != '"' )  return null;
      return [captured, input.slice(captured.length + extra+2)];
    }
    else return null;
  }

let boolparser = input =>input.startsWith('true') ?[true,input.slice(4)]:(input.startsWith('false')?[false,input.slice(5)]:null)




let valueparser  =  function(input){
    let valueresult ;
    //  update this using short circuiting
    valueresult = nullparser(input)
    if (valueresult !=null) return valueresult
    valueresult = boolparser(input)
    if (valueresult !=null) return valueresult 
    valueresult = numberParse(input)
    if (valueresult !=null) return valueresult 
    valueresult = stringParser(input)
    if (valueresult !=null) return valueresult
    valueresult = arrayparser(input)
    if (valueresult !=null) return valueresult 
}

// console.log(valueparser(input))
console.log(valueparser(input))