
function numberParse (input) {
    const regex = /(^[-]?[1-9]\d*([.]\d+)?([eE][+-]?\d+)?)|(^[-]?0([.]\d+)([eE][+-]?\d+)?)|(^[-]?0[eE][+-]?\d+)|(^[-]?0)/
    // const regex1 =/ (^[-]?0([.]\d+)([eE][+-]?\d+)?)/ //number with e 
    // const regex2 = /(^[-]?0[eE][+-]?\d+)])/ // 
    // const regex3 = /^[-]?0$/ // for only zero
    
    const result = input.match(regex)
    console.log (result)
      
    if (result === null) return null
    return [(input.slice(0, result[0].length)) * 1,input.slice(result[0].length)]
      
    
  }
    
console.log(numberParse('45\n'))
