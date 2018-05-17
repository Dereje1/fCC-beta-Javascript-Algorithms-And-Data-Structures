//Sum All Numbers in a Range
function sumAll(arr) {
  let small = arr[0]<arr[1] ? arr[0] : arr[1]
  let large = arr[0]<arr[1] ? arr[1] : arr[0]
  let arrNew = []
  for (i=small;i<=large;i++){
    arrNew.push(i)
  }
  let sum = arrNew.reduce((acc,curr)=>{
    return acc+curr
  })
  return sum;
}

console.log(sumAll([1, 4]));

//Diff Two Arrays
function diffArray(arr1, arr2) {
  var newArr = [];
  arr1.forEach((e)=>{
    if(!arr2.includes(e)){newArr.push(e)}
  })
  arr2.forEach((e)=>{
    if(!arr1.includes(e)){newArr.push(e)}
  })
  console.log(newArr)
  return newArr;
}

diffArray([1, 2, 3, 5], [1, 2, 3, 4, 5]);

//Seek and Destroy

function destroyer(arr) {
  // Remove all the values
  //from MDN: The arguments object is not an Array. It is similar to an Array, but does not have any Array properties except length. For example, it does not have the pop method. However it can be converted to a real Array:
  var args = [].slice.call(arguments)
  
  let comp = args.slice(1)
  
  let filteredarr = arr.filter((o)=>{
    return !comp.includes(o)
  })
  
  return filteredarr;
}

destroyer([1, 2, 3, 1, 2, 3], 2, 3);

//Wherefore art thou

function whatIsInAName(collection, source) {//refator!!
  // What's in a name?
  var arr = [];
  let flag = true;
  // Only change code below this line
  collection.forEach((c)=>{
    let flag = true;
    let collKeys = Object.keys(c)
    let sourceKeys = Object.keys(source)
    sourceKeys.forEach((k)=>{
      if(!collKeys.includes(k)){flag=false;}
    })
    if(flag){
      let innerflag = true;
      sourceKeys.forEach((k)=>{
        if(source[k]!==c[k]){
          innerflag=false
        }
      })
      if(innerflag)arr.push(c)
    }
    
  })
  // Only change code above this line
  return arr;
}

whatIsInAName([{ "apple": 1, "bat": 2 }, { "apple": 1 }, { "apple": 1, "bat": 2, "cookie": 2 }], { "apple": 1, "cookie": 2 });

//Spinal Tap Case
function spinalCase(str) {//a fanagled solution due to lack of regex understanding
  // "It's such a fine line between stupid, and clever."
  // --David St. Hubbins
  let a= /(?=[A-Z])/
  let b= /[^a-zA-Z]/g
  
  if(str.match(b)){
    let q =  str.split(b)
    let z = []
    q.forEach((w)=>{
      z=[...z,...(w.split(a))]
    })
    return z.join('-').toLowerCase()
  }
  else{
    return str.split(a).join('-').toLowerCase()
  }
}

spinalCase("AllThe-small Things");

//Pig Latin
function translatePigLatin(str) {
  
  let regMatcher = /[^aeiou]*/  //Note IMPORTANT when testing know the difference between 'matches characters that occur zero or more times.' and "matches characters that occur 1 or more times." * = 0 , + = 1
  let testMatch = str.match(regMatcher)
  console.log(testMatch)
  if(!testMatch[0].length){
    return str+'way'
  }
  return str.substr(testMatch[0].length) + testMatch + 'ay';
}

translatePigLatin("ekkkyuiwes");

//Search and Replace

function myReplace(str, before, after) {
  let regTester= new RegExp(before)
  let testMatch=str.match(regTester)
  //first test if string is even in the sentence
  if(testMatch){
    // then test for upper case first letter
    let upTest = /[A-Z]/.test(before[0])
    if(upTest){
      return str.replace(before,after[0].toUpperCase()+after.substr(1))
    }
    return str.replace(before,after)
  }
  return str;
}

myReplace("A quick brown fox Jumped over the lazy dog", "Jumped", "leaped");

//DNA Pairing
function pairElement(str) {
  
  let bp = str.split('').map((s)=>{
    switch (s) {
      case "C":
        return [s,"G"]
        break;
      case "G":
        return [s,"C"]
        break;
      case "A":
        return [s,"T"]
        break;
      case "T":
        return [s,"A"]
        break;
    }
  })
  return bp;
}

pairElement("GCG");

//Missing letters
function fearNotLetter(str) {
  let charArr = str.split('').map((l)=>{
    return l.charCodeAt(0)
  })
 
  for(let i=0;i<charArr.length;i++){
    if ((charArr[0]+i)!==charArr[i]){
      return (String.fromCharCode(charArr[i]-1))
    }
  }
  
  return undefined;
}

fearNotLetter("abde");

//Sorted Union

function uniteUnique(arr) {
  let flattened=[]
  let unique=[]
  var args = [].slice.call(arguments); //convert args to array
  args.forEach((a)=>{
    flattened=[...flattened,...a]
  })
  flattened.forEach((f)=>{
    if(!unique.includes(f)){
      unique.push(f)
    }
  })
  return unique;
}

uniteUnique([1, 3, 2], [5, 2, 1, 4], [2, 1]);

//Convert HTML Entities
function convertHTML(str) {
  // &colon;&rpar;
  let myReg =/&|<|>|"|'/ig
  let test = myReg.test(str)
  if(!test){
    return str
  }
  else{
    let allMatches = str.match(myReg)
    allMatches.forEach((m)=>{
      switch (m){
        case "&":
          str=str.replace(m,"&amp;")
          break;
        case "<":
          str=str.replace(m,"&lt;")
          break;
        case ">":
          str=str.replace(m,"&gt;")
          break;
        case "\"":
          str=str.replace(m,"&quot;")
          break;
        case "\'":
          str=str.replace(m,"&apos;")
          break;
      }
    })
    return str;
  }
}

convertHTML("Dolce & Gabbana");

//Sum All Odd Fibonacci Numbers

function sumFibs(num) {
  let fibOdd = fibs(num).filter((f)=>{
    return f%2!==0
  })
  let fibOddSum = fibOdd.reduce((sum,curr)=>{
    return sum+curr
  })
  return fibOddSum;
}

let fibs = function(n){
  let counter=2;
  let fibArr=[1,1]
  while (fibArr[counter-1]<=n){
    let newFibAdd = fibArr[counter-2]+fibArr[counter-1]
    if(newFibAdd<=n){fibArr.push(newFibAdd)}
    counter++
  }
  return fibArr
}
sumFibs(75025);

//Sum All Primes
function sumPrimes(num) {
  let sum=0 
 for(let i=2;i<=num;i++){
    if(isPrime(i)){
      sum+=i
    }
  } 
  return sum;
}
function isPrime(p){
  for(let i=2;i<p;i++){
    if(p%i===0){
      return false
    }
  }
  return true
}
sumPrimes(977);

//Smallest Common Multiple

function primeFactor(n){//generates prime factors for any number
  let primes =[2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199]

  let factorCollect=[]
  let collected = false;
  
  function currentFactor(t){//recursive
    let factored = factorCollect.reduce((prod,curr)=>{
        return prod*curr
    },1)
    
    if(factored===n){
      return factorCollect
    }
    for(let i=0 ;i<primes.length;i++){
      if(t%primes[i]===0){
        factorCollect.push(primes[i])
        return currentFactor(t/primes[i])
      }
    }
  }
  return currentFactor(n)
}

function LCM(a,b){//returns LCM for 2 numbers
  let pFactora = primeFactor(a)
  let pFactorb = primeFactor(b)
  let occura={}
  let occurb={}
  pFactora.forEach((p)=>{
    occura[p]?occura[p]=occura[p]+1:occura[p]=1
  })
  pFactorb.forEach((p)=>{
    occurb[p]?occurb[p]=occurb[p]+1:occurb[p]=1
  })
  
  //get only unique factors
  let occurc={}
  let c = Array.from(new Set([...pFactora,...pFactorb]))
  c.forEach((y)=>{
    if((occurb[y])&&(occura[y])){
      if (occura[y]>occurb[y]){
        occurc[y]=occura[y]
      }
      else{
        occurc[y]=occurb[y]
      }
    }
    else{
      if(occura[y]){
        occurc[y]=occura[y]
      }
      else{
        occurc[y]=occurb[y]
      }
    }
  })
  
  let lcm=1
  for (let f in occurc){
    lcm*=(Math.pow(f,occurc[f]))
  }
  return lcm
}

function checkMultiple(range,num){//checks if all numbers in range are divisible by multiple
  for(let i=range[0];i<=range[1];i++){
    if(num%i!==0)return false
  }
  return true
}

function smallestCommons(arr) {
  let sortedArr = arr.sort((a,b)=>{
    return a-b
  })
  let arrSpread =[]
  for(let i=sortedArr[0];i<=sortedArr[1];i++){
    arrSpread.push(i)
  }
  let lastMultiple = LCM(arrSpread[0],arrSpread[1])
  arrSpread.forEach((n,idx)=>{
    if(!checkMultiple(arr,lastMultiple) && (idx>1)){
      lastMultiple = LCM(arrSpread[idx],lastMultiple)
    }
    console.log(idx,lastMultiple)
  })
  return lastMultiple
}

smallestCommons([1,5]);

//Drop it

function dropElements(arr, func) {
  // Drop them elements.
  for(var i=0;i<arr.length;i++){
    if(func(arr[i]))break;
  }
  return arr.slice(i);
}

dropElements([1, 2, 3], function(n) {return n < 3; });

//Steamroller
function steamrollArray(arr) {
  // I'm a steamroller, baby
  let rolled;
  function steamy(sroll){
    rolled=true;
    let x = sroll.reduce((combined,curr)=>{
      if(Array.isArray(curr)){
        return [...combined,...curr]
      }
      else{
        return[...combined,curr]
      }
    },[])
    x.forEach((a)=>{
      if(Array.isArray(a)){
        rolled = false;
      }
    })
    if(rolled){
      return x
    }
    else{
      return steamy(x)
    }
  }
  return steamy([...arr])
}

steamrollArray([1, [2], [3, [[4]]]]);

//Binary Agents
function binaryAgent(str) {
  let strArr=str.split(" ")
  let newStr=''
  strArr.forEach((b)=>{
    let bLetter= b.split('').reverse()
    let total = 0
    bLetter.forEach((l,idx)=>{
     let dec = Math.pow(2,idx)*l
     total+=dec
    })
    newStr+=(String.fromCharCode(total))
  })
  
  return newStr;
}

binaryAgent("01000001 01110010 01100101 01101110 00100111 01110100 00100000 01100010 01101111 01101110 01100110 01101001 01110010 01100101 01110011 00100000 01100110 01110101 01101110 00100001 00111111");

//Everything Be True
function truthCheck(collection, pre) {
  // Is everyone being true?
  let preSwitch = true
  collection.forEach((u)=>{
    for (var item in u){
      if(!u[pre]){
        preSwitch = false
      }
    }
  })
  return preSwitch;
}

truthCheck([{"user": "Tinky-Winky", "sex": "male"}, {"user": "Dipsy"}, {"user": "Laa-Laa", "sex": "female"}, {"user": "Po", "sex": "female"}], "sex");

//Arguments Optional

function addTogether() {
  if (arguments.length===2){
    if(typeof(arguments[0])==="number" && typeof(arguments[1])==="number")
    return arguments[0]+ arguments[1]
  }
  else{
    let firstAdd = (arguments[0])
    if(!Number(firstAdd)){
      return undefined
    }
    return function t(a){
      if(typeof(a)!=="number"){
        return undefined
      }
      return (a+firstAdd)
    }
  }
}

addTogether(3,2);

//Make a Person

var Person = function(firstAndLast) {
  // Complete the method below and implement the others similarly
  this.getFullName = ()=> {
    return firstAndLast;
  };
  this.getFirstName = ()=> {
    return firstAndLast.split(' ')[0];
  };
  this.getLastName = ()=> {
    return firstAndLast.split(' ')[1];
  };
  this.setFirstName = (firstName)=>{
    firstAndLast = firstName + " " + firstAndLast.split(' ')[1]
  }
  this.setLastName = (lastName)=>{
    firstAndLast = firstAndLast.split(' ')[0] + " " + lastName
  }
  this.setFullName = (fullName)=>{
    firstAndLast = fullName
  }
};

var bob = new Person('Bob Ross');
bob.setFirstName("Haskell")
bob.getFullName();

//Map the Debris
function orbitalPeriod(arr) {
  var GM = 398600.4418;
  var earthRadius = 6367.4447;
  let orbitalArr=[]
  arr.forEach((a)=>{
    let newObj={}
    let t= Math.PI*2*(Math.pow(Math.pow(a.avgAlt+earthRadius,3)/GM,0.5))
    newObj.name = a.name
    newObj.orbitalPeriod = Number(t.toFixed())
    orbitalArr.push(newObj)
  })
  return orbitalArr
}

orbitalPeriod([{name: "iss", avgAlt: 413.6}, {name: "hubble", avgAlt: 556.7}, {name: "moon", avgAlt: 378632.553}]);
