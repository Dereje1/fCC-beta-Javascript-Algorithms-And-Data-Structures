  const currencyUnit={
    "PENNY": 0.01, 
    "NICKEL": 0.05, 
    "DIME": 0.1,
    "QUARTER": 0.25,
    "ONE": 1,
    "FIVE": 5,
    "TEN": 10,
    "TWENTY": 20,
    "ONE HUNDRED": 100
  };

function checkCashRegister(price, cash, cid) {
  // Here is your change, ma'am.
  const totalChange = cash - price;

  let usableCurrencyUnits=[];//build list of all units that can be used to give change
  for (let unit in currencyUnit){
    if(totalChange>=currencyUnit[unit]){
      const maxUnit = cid.filter((c)=>{
        return c[0]===unit;
      })[0][1]; //how much of the unit is avalialble in the register
      if(maxUnit>0){
        usableCurrencyUnits.push([unit,currencyUnit[unit],maxUnit]);
      }
    }
  }
  //find the total in the register that is usable
  const totalInregister = registerTotal(usableCurrencyUnits.map((u)=>{
    return [u[0],u[2]];
  }));
  if(totalInregister<totalChange){
    return {status: "INSUFFICIENT_FUNDS", change: []};
  }
  if(totalInregister===totalChange){
    return {status: "CLOSED", change: cid};
  }
  return {status: "OPEN", change: getChange(usableCurrencyUnits.reverse(),totalChange)};
}

function registerTotal(cid){
  const total = cid.reduce((accum,curr)=>{
    return accum + curr[1];
  },0);
  return Math.round(total * 100) / 100;
}

function getChange(allUnits,fullChangeRequired){
  let builtChange=[];//to collect change to be returned
  unitChange(allUnits,fullChangeRequired);//initialize recursive unit change

  function unitChange(units,changeRequired){//recursive unit change could use further refactoring
    let changeCounter=0; //counter for a particular unit
    while(true){
      const nextIncrementTest = (changeCounter+1)*units[0][1];//total change at next unit increment
      const changeFullfilled = nextIncrementTest > changeRequired;
      const availableReached = nextIncrementTest > units[0][2];
      if(changeFullfilled || availableReached){
          if(changeCounter*units[0][1]!=0){
            builtChange.push([units[0][0],changeCounter*units[0][1]]);
          }
          //compute change remaining after allocating previous unit
          let changeRemaining = fullChangeRequired -registerTotal(builtChange);
          changeRemaining=Math.round(changeRemaining*100)/100;
          if(changeRemaining>0){//still more change required
            const newUnits = [...units];
            newUnits.shift();//remove active unit and go to next
            return unitChange(newUnits,changeRemaining);//call recursive function again
          }
          else{//no more change required
            break;
          }
      }
      else{//more room to collect the unit change
        changeCounter++;
      }
    }
  }
  return builtChange;
}
