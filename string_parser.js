const fs = require('fs')
let input = fs.readFileSync('simpy.txt')
// console.log(data)
input = input.toString()
const stringParser = function( input ){
    let i = 1, captured = '', extra = 0;
    if( input.startsWith('"')){
     
        while( i < input.length ){
      if( input[i] === '"' && input[i-1] != '\\')  return [captured, input.slice(captured.length + extra+2)];
      if( input[i] != '\\' ) captured = captured.concat(input[i]);
      else if( input[i] === '\\' ){
        switch (input[i+1]){

          // simplify it using shortcircuiting
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


console.log(stringParser(input))



