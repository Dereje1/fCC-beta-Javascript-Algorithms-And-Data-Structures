let romanObject={//refactor with out specifying 4 and 9 multiples??
  1:"I",
  4:"IV",
  5:"V",
  9:"IX",
  10:"X",
  40:"XL",
  50:"L",
  90:"XC",
  100:"C",
  400:"CD",
  500:"D",
  900:"CM",
  1000:"M"
}

function convertToRoman(num) {
 let romanKeys = Object.keys(romanObject)
 
 let filteredKeys = romanKeys.filter((k)=>{
   return k<=num
 }).reverse()
 

 let div,str='';
 let remObj={}
 filteredKeys.forEach((k,idx)=>{
   if(idx===0)div=num
   let rep = (Math.floor(div/k))
   str+=romanObject[k].repeat(rep)
   div = (div%Number(k))
 })
 return str
}

convertToRoman(3999);
