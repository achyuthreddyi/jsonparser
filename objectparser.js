const fs = require('fs')
let input = fs.readFileSync('simpy.txt')
input = input.toString()




let objectparser = function(input){

  let result ={},key=[],value=[]
  while(input.length>1){

    if(input.startsWith('{'))
    {
      // console.log(input) 
      // input = input.trim()
      // console.log(input)
      input = input.slice(1).trim()
      console.log('trimmed',input)
      // console.log(1)
      key = stringParser(input)
      // console.log('key',key)
      if(key === null || key[1][0] !=':') return null
      if (key === '}') return [result,input.slice(1)]
      // console.log('value',key[1].slice(1))
      console.log('keykey',key[1].slice(1).trim())
      value = valueparser(key[1].slice(1).trim())
      result[key[0]] = value[0]
      // console.log(result) 
      input = value[1]
      // console.log('input',input)

    }
    if (input.startsWith(',')){
    
      input = input.slice(1).trim()
      if (input[1] ==='}' || input[1] === ',') return null
      key = stringParser(input)
      if(key === null || key[1][0] !=':') return null
      if (key === '}') return [result,input.slice(1)]
      value = valueparser(key[1].slice(1).trim())
      result[key[0]] = value[0]
      input = value[1]

    }
    if(input.startsWith('}')) return [result,input.slice(1)]

  }
  return [result]
}
let arrayparser = function(input){
    let finalresult = []
    // input = input.trim()
    if(input.startsWith('[')){
        // console.log(typeof(input))
        input = input.slice(1)
        input = input.trim()
        console.log('nikki',input)
        while(input[0] != ']'){
            input.trim()
            let a= valueparser(input)
            if (a === null ) return null 
            console.log(a)

            finalresult.push(a[0])
            input = a[1]
            if (input[0] === ','){
                input = input.slice(1)
                input.trim()
                if (input.startsWith(']')) return null              

            }
           

        }
        return [finalresult,input.slice(1)]

    }
    return null 
    

}
let nullparser = input =>input.startsWith('null')? [null,input.slice(4)] :null




function numberParse (input) {
  const regex = /(^[-]?[1-9]\d*([.]\d+)?([eE][+-]?\d+)?)|(^[-]?0([.]\d+)([eE][+-]?\d+)?)|(^[-]?0[eE][+-]?\d+)|(^[-]?0)/
  // const regex1 =/ (^[-]?0([.]\d+)([eE][+-]?\d+)?)/ //number with e 
  // const regex2 = /(^[-]?0[eE][+-]?\d+)])/ // 
  // const regex3 = /^[-]?0$/ // for only zero

  
  const result = input.match(regex)
  console.log ('printing result',result)
    
  if (result === null) return null
  else return [(input.slice(0, result[0].length)) * 1,input.slice(result[0].length)]
    
  
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
          captured +=String.fromCodePoint(abc);extra +=5;i+=4;break;                  
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

    valueresult = objectparser(input)
    if (valueresult !=null) return valueresult
    // else return 0
    else valueresult = 0 ;console.log()
}

// console.log(valueparser(input))
console.log(valueparser(input))