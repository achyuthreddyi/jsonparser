const fs = require('fs')
let input = fs.readFileSync('simpy.txt')
input = input.toString()
let objectparser = function(input){
  let result ={},key=[],value=[]
  while(input.length>1){
    if(input.startsWith('{'))
    {      
      input = input.slice(1)
      key = stringParser(input)
      if(key === null || key[1][0] !=':') return null
      if (key === '}') return [result,input.slice(1)]
      value = valueparser(key[1].slice(1))
      result[key[0]] = value[0]
      input = value[1]
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
    if(input.startsWith('[')){
        input = input.slice(1)
        input = input.trim()
        while(input[0] != ']'){
            input.trim()
            let a= valueparser(input)
            if (a === -1 ) return null 
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
let stringParser = function( input ){
    let i = 1, captured = '', extra = 0;
    if( input.startsWith('"')){     
        while( i < input.length ){
      if( input[i] === '"' && input[i-1] != '\\')  return [captured, input.slice(captured.length + extra+2)];
      if( input[i] != '\\' ) captured = captured.concat(input[i]);
      else if( input[i] === '\\' ){
        switch (input[i+1]){            
          case '\\' : captured += '\\'; extra++; break;
          case '"' : captured+= '\"'; extra++; break;
          case '/' : captured += '\/'; extra++; break;
          case 'b' : captured+= '\b'; extra++; break;
          case 'f' : captured+= '\f'; extra++; break;
          case 'n' : captured += '\n'; extra++; break;
          case 'r' : captured += '\r'; extra++; break;
          case 't' : captured += '\t'; extra++; break;       
          case 'u': abc = parseInt(input.slice(i+2,i+6),16); 
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
let removenewline = function( data ){
  let array = data.split(""), quoteCount = 0;
  for( let i = 0; i < array.length; i++ ){
    if( (array[i] === ' ' || array[i] === '\n' || array[i] === '\t') && quoteCount % 2 === 0 ){
      array.splice(i,1);
      i--;
    }
    else if( array[i] === '"' && array[i-1] != '\\' ) quoteCount++;
  }
  data = array.join("");
  return data;
}
let valueparser  =  function(input){
    let valueresult ;    
    input = (removenewline(input))
    switch(valueresult){
      case ((valueresult = nullparser(input))!=null) : return valueresult
      case ((valueresult = boolparser(input))!=null) : return valueresult
      case ((valueresult = numberParse(input))!=null) : return valueresult
      case ((valueresult = stringParser(input))!=null) : return valueresult
      case ((valueresult = arrayparser(input))!=null) : return valueresult
      case ((valueresult = objectparser(input))!=null) : return valueresult 
      default : return -1
    } 
}
console.log(valueparser(input))