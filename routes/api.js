'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  const convertHandler = new ConvertHandler();

  app.route('/api/convert').get((req, res) => {
    const input = req.query.input;
    const initNum = convertHandler.getNum(input);
    const initUnit = convertHandler.getUnit(input);
    if (initNum === 'invalid number' && initUnit === 'invalid unit'){
      return res.json('invalid inputs');
    } else if (initNum === 'invalid number') {
      return res.json('invalid number');
    } else if (initUnit === 'invalid unit') {
      return res.json('invalid unit');
    }

    const returnNum = Math.round(convertHandler.convert(initNum, initUnit) * Math.pow(10,5)) / Math.pow(10,5);
    const returnUnit = convertHandler.getReturnUnit(initUnit);
    const string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);

    const out = {
      initNum : initNum,
      initUnit : initUnit,
      returnNum : returnNum,
      returnUnit : returnUnit,
      string : string
    }

    res.json(out);
  })

};
