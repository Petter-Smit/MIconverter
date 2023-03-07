const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
    test('convertHandler should correctly read a whole number input.', () => {
        assert.equal(convertHandler.getNum('4kg'), 4);
    });
    test('convertHandler should correctly read a decimal number input.', () => {
        assert.equal(convertHandler.getNum('4.52mi'), 4.52);
    });
    test('convertHandler should correctly read a fractional input.', () => {
        assert.equal(convertHandler.getNum('4/2kg'), 2);
    });
    test('convertHandler should correctly read a fractional input with a decimal.', () => {
        assert.equal(convertHandler.getNum('6.2/2mi'), 3.1);
    });
    test('convertHandler should correctly return an error on a double-fraction (e.g. 3/2/3).', () => {
        assert.equal(convertHandler.getNum('4/2/2kg'), 'invalid number');
    });
    test('convertHandler should correctly default to a numerical input of 1 when no numerical input is provided.', () => {
        assert.equal(convertHandler.getNum('lbs'), 1);
    });
    test('convertHandler should correctly read each valid input unit.', () => {
        inputs = ['l', 'gal', 'mi', 'km', 'lbs', 'kg', 'L', 'GAL', 'MI', 'KM', 'LBS', 'KG'];
        expected = ['L', 'gal', 'mi', 'km', 'lbs', 'kg', 'L', 'gal', 'mi', 'km', 'lbs', 'kg'];
        inputs.forEach((element, i) => {
            assert.equal(convertHandler.getUnit(element), expected[i]);
        });
    });
    test('convertHandler should correctly return an error for an invalid input unit.', () => {
        assert.equal(convertHandler.getUnit('12kmh'), 'invalid unit');  //something failed here
    });
    test('convertHandler should return the correct return unit for each valid input unit.', () => {
        inputs = ['L', 'gal', 'mi', 'km', 'lbs', 'kg'];
        expected = ['gal', 'L', 'km', 'mi', 'kg', 'lbs'];
        inputs.forEach((element, i) => {
            assert.equal(convertHandler.getReturnUnit(element), expected[i]);
        });
    });
    test('convertHandler should correctly return the spelled-out string unit for each valid input unit.', () => {
        inputs = ['L', 'gal', 'mi', 'km', 'lbs', 'kg'];
        expected = ['liters', 'gallons', 'miles', 'kilometers', 'pounds', 'kilograms'];
        inputs.forEach((element, i) => {
            assert.equal(convertHandler.spellOutUnit(element), expected[i]);
        });
    });
    test('convertHandler should correctly convert gal to L.', () => {
        assert.approximately(convertHandler.convert(1, 'gal'), 3.78541, 0.01);
    });
    test('convertHandler should correctly convert L to gal.', () => {
        assert.approximately(convertHandler.convert(1, 'L'), 0.26417, 0.01);
    });
    test('convertHandler should correctly convert mi to km.', () => {
        assert.approximately(convertHandler.convert(1, 'mi'), 1.60934, 0.01);
    });
    test('convertHandler should correctly convert km to mi.', () => {
        assert.approximately(convertHandler.convert(1, 'km'), 0.62137, 0.01);
    });
    test('convertHandler should correctly convert lbs to kg.', () => {
        assert.approximately(convertHandler.convert(1, 'lbs'), 0.453592, 0.01);
    });
    test('convertHandler should correctly convert kg to lbs.', () => {
        assert.approximately(convertHandler.convert(1, 'kg'), 2.20462, 0.01);
    });
    
});