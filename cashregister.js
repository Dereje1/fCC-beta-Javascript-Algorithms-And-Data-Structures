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
      //filter to find how much of the unit is avalialble in the register
      const cidUnit = cid.filter((c)=>{
        return c[0]===unit;
      });
      if(cidUnit.length>0 && cidUnit[0][1]>0){
        usableCurrencyUnits.push([unit,currencyUnit[unit],cidUnit[0][1]]);
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
      const nextIncrementTest = (changeCounter+1)*units[0][1]
      const changeFullfilled = nextIncrementTest > changeRequired;
      const availableReached = nextIncrementTest > units[0][2];
      if(changeFullfilled||availableReached){
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

/* another way... */

// keep this sorted descending
const currencyUnitObject = {
  "ONE HUNDRED": 100.00,
  TWENTY: 20.00,
  TEN: 10.00,
  FIVE: 5.00,
  ONE: 1.00,
  QUARTER: 0.25,
  DIME: 0.1,
  NICKEL: 0.05,
  PENNY: 0.01,
}

const getRounded = (val) => Math.round((val + Number.EPSILON) * 100) / 100

const findChange = (available, changeRequired, change = []) => {
  const denominations = Object.keys(available);
  const updatedAvailableUnits = {}
  denominations.forEach(d => {
    if (changeRequired >= (currencyUnitObject[d])) {
      updatedAvailableUnits[d] = available[d]
    }
  })
  const [activeUnit] = Object.keys(updatedAvailableUnits)
  const totalUnitsAvailable = available[activeUnit]
  const totalUnitsNeeded = Math.floor(changeRequired / currencyUnitObject[activeUnit])
  const unitsUsed = totalUnitsNeeded - totalUnitsAvailable > 0
    ? totalUnitsAvailable
    : totalUnitsNeeded
  const moreChangeRequired = getRounded(changeRequired - (unitsUsed * currencyUnitObject[activeUnit]))
  const updatedChange = unitsUsed > 0
    ? [...change, [activeUnit, unitsUsed * currencyUnitObject[activeUnit]]]
    : []

  if (moreChangeRequired > 0) {
    delete updatedAvailableUnits[activeUnit]
    return findChange(updatedAvailableUnits, moreChangeRequired, updatedChange)
  } else {
    if (!updatedChange.length) {
      return { status: 'INSUFFICIENT_FUNDS' }
    }
    updatedAvailableUnits[activeUnit] = updatedAvailableUnits[activeUnit] - unitsUsed
    const keys = Object.keys(updatedAvailableUnits);
    if (keys.length === 1 && updatedAvailableUnits[keys[0]] === 0) {
      return { status: "CLOSED" }
    }
    return updatedChange
  }
}

function checkCashRegister(price, cash, cid) {
  const drawer = cid.reduce((obj, curr) => {
    const [unit, amount] = curr;
    return {
      ...obj,
      available: {
        ...obj.available,
        [unit]: Math.round(amount / (currencyUnitObject[unit]))
      },
      total: getRounded(obj.total + amount)
    }
  }, { available: { ...currencyUnitObject }, total: 0 })

  if (drawer.total < (cash - price)) {
    return { status: "INSUFFICIENT_FUNDS", change: [] }
  }

  const result = findChange(drawer.available, (cash - price))

  switch (result.status) {
    case 'INSUFFICIENT_FUNDS':
      return { status: 'INSUFFICIENT_FUNDS', change: [] }
    case 'CLOSED':
      return { status: "CLOSED", change: cid }
    default:
      return { status: 'OPEN', change: result };
  }
}
