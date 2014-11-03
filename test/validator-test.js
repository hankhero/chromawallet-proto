var expect = require('chai').expect;
var Validator = require('../jsx/validator');

describe('validator', function() {
   describe('amount', function() {
       it('No letters', function() {
           expect(Validator.validateAmount('AB')).to.be.false;
       });

       it('Nice number', function() {
           expect(Validator.validateAmount('123')).to.be.ok;
       });

       it('Nice number all digits', function() {
           expect(Validator.validateAmount('1234567890')).to.be.ok;
       });

       it('Decimals', function() {
           expect(Validator.validateAmount('123.12')).to.be.ok;
       });

       it('Decimal, too many dots', function() {
           expect(Validator.validateAmount('123.12.4')).to.be.false;
       });

       it('If it has  a dot it needs decimals afer', function() {
           expect(Validator.validateAmount('123.')).to.be.false;
       });

       it('Dot needs number before', function() {
           expect(Validator.validateAmount('.12')).to.be.false;
       });

       it('Decimal can also have comma', function() {
           expect(Validator.validateAmount('123,124')).to.be.ok;
       });

       it('Decimal can also have comma but only once', function() {
           expect(Validator.validateAmount('123,12,24')).to.be.false;
       });

       it('Leading spaces allowd', function() {
           expect(Validator.validateAmount('  123')).to.be.ok;
       });

       it('Trailing spaces allowed', function() {
           expect(Validator.validateAmount('123.12  ')).to.be.ok;
       });
   });

   describe('Amount in progress', function () {
       it('Half finished inputs', function() {
           expect(Validator.validateAmountInProgress('123.')).to.be.ok;
       });

       it('Unstarted input', function() {
           expect(Validator.validateAmountInProgress('')).to.be.ok;
       });

       it('No spaces allowed', function() {
           expect(Validator.validateAmountInProgress('  12')).to.be.false;
       });

       it('No spaces allowed after', function() {
           expect(Validator.validateAmountInProgress('12 ')).to.be.false;
       });

       it('No spaces allowed in between', function() {
           expect(Validator.validateAmountInProgress('1 2')).to.be.false;
       });


       it('But not broken', function() {
           expect(Validator.validateAmountInProgress('123.2.')).to.be.false;
       });

       it('Ok input', function() {
           expect(Validator.validateAmountInProgress('123.45')).to.be.ok;
       });

       it('bad input', function() {
           expect(Validator.validateAmountInProgress('12foo')).to.be.false;
       });
       
   });
});
