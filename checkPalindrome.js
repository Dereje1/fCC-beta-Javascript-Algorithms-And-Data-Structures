function palindrome(str) {
  // Good luck!
  str=str.toLowerCase();
  str = str.replace(/[^a-z0-9]/g,"");
  let palcheck =[...str.split('')].reverse().join('');
  if (str===palcheck){return true;}
  else{return false;}
}


palindrome("1 eye for of 1 eye.");
