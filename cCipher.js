function rot13(str) { // LBH QVQ VG!
  let rebuild=[]
  str.split('').forEach((s)=>{
    let regTester = /[A-Z]/
    let testVal = regTester.test(s)
    if(testVal){
      let charVal = s.charCodeAt(0)
      let offsetCharVal = (charVal+13) > 90 ? (charVal+13)-90 + 64 : (charVal+13)
      rebuild.push(String.fromCharCode(offsetCharVal))
    }
    else{
      rebuild.push(s)
    }
  })
  return rebuild.join('');
}

// Change the inputs below to test
rot13("SERR PBQR PNZC");
