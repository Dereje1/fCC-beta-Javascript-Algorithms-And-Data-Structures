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

//or...
const obj = {
  M: 1000,
  CM: 900,
  D: 500,
  CD: 400,
  C: 100,
  XC: 90,
  L: 50,
  XL: 40,
  X: 10,
  IX: 9,
  V: 5,
  IV: 4,
  I: 1,
}

const getNumeral = (hrv, rpt, prev) => {
 const numerals = Object.keys(obj)
 let capturedNumeral = ''
 for(const numeral of numerals){
   if (obj[numeral] === hrv){
     capturedNumeral = numeral
     break
   }
 }
 return `${prev}${capturedNumeral.repeat(rpt)}`
}

function convertToRoman(num, prev='') {
  const values = Object.values(obj)
  let hrv = 0;
  // find highest roman value
  for(const value of values){
    if(num >= value){
      hrv = value;
      break
    }
  }
  // find how many times to repeat the highest value
  const repeat = Math.floor(num/hrv)
  // get the numerals
  const str = getNumeral(hrv, repeat, prev)
  // find what remains
  const remainder = num%hrv
  if(remainder){
    return convertToRoman(remainder, str)
  }else{
    return str
  }
}

console.log(convertToRoman(83));
