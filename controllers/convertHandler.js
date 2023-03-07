function ConvertHandler() {
  
  const convertUnits = {
    'l' : 'gal',
    'gal' : 'L',
    'mi' : 'km',
    'km' : 'mi',
    'lbs' : 'kg',
    'kg' : 'lbs'
  }

  const unitSpeller = {
    'L' : 'liters',
    'gal' : 'gallons',
    'mi' : 'miles',
    'km' : 'kilometers',
    'lbs' : 'pounds',
    'kg' : 'kilograms'
  }

  this.stripFront = (input) => {
    let out = input;
    while (out && /[0-9\.\/]/.test(out[0])){
      out = out.substring(1, out.length);
    }
    return out;
  }

  this.stripEnd = (input) => {
    let out = input;
    while (out && /[a-zA-Z]/.test(out[out.length-1])){
      out = out.substring(0, out.length - 1);
    }
    return out;
  }

  this.getNum = function(input) {
    let result = this.stripEnd(input);
    if (result.length === 0) return 1;
    result = result.split('/');
    if (result.length === 1) {
      return Number(result[0]);
    } else if (result.length === 2) {
      return Number(result[0])/Number(result[1]);
    } else {
      return 'invalid number';
    }
  };

  this.getUnit = function(input) {
    let result = this.stripFront(input);
    return convertUnits[result.toLowerCase()] ? convertUnits[convertUnits[result.toLowerCase()].toLowerCase()] : 'invalid unit';
  };
  
  this.getReturnUnit = function(initUnit) {
    return convertUnits[initUnit.toLowerCase()];
  };

  this.spellOutUnit = function(unit) {
    return unitSpeller[unit];
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    return initUnit === 'gal' ? initNum*galToL : initUnit === 'L' ? initNum/galToL : 
      initUnit === 'lbs' ? initNum*lbsToKg : initUnit === 'kg' ? initNum/lbsToKg :
      initUnit === 'mi' ? initNum*miToKm : initNum/miToKm;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${unitSpeller[initUnit]} converts to ${returnNum} ${unitSpeller[returnUnit]}`;
  };
}

module.exports = ConvertHandler;
