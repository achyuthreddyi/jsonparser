const fs = require('fs')
let data = fs.readFileSync('simpy.txt')
// console.log(data)
data = data.toString()
const stringParser = function( data ){
    let i = 1, captured = '', extra = 0;
    if( data[0] === '"'){
     
        while( i < data.length ){
      if( data[i] === '"' && data[i-1] != '\\')  return [captured, data.slice(captured.length + extra+2)];
      if( data[i] != '\\' ) captured = captured.concat(data[i]);
      else if( data[i] === '\\' ){
        switch (data[i+1]){
          case '\\' : captured += '\\'; extra++; break;
          case '"' : captured+= '\"'; extra++; break;
          case '/' : captured += '\/'; extra++; break;
          case 'b' : captured+= '\b'; extra++; break;
          case 'f' : captured+= '\f'; extra++; break;
          case 'n' : captured += '\n'; extra++; break;
          case 'r' : captured += '\r'; extra++; break;
          case 't' : captured += '\t'; extra++; break;       
          case 'u': abc = parseInt(data.slice(i+2,i+6),16); 
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
      return [captured, data.slice(captured.length + extra+2)];
    }
    else return null;
  }


console.log(stringParser(data))



