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
 
    describe('Normalize amount', function () {
       it('Transforms commas to dots', function () {
         expect(Validator.normalizeAmount('3000,2', "3000.2"));
       });
       it('Leaves dots as they can be parse by javascript in a non-localized way', function () {
         expect(Validator.normalizeAmount('3000.2', "3000.2"));
       });
    });

    describe('colored-coin address', function () {
      var typicalAddress = 'DAsrRRtFr3Ewck@mkkL31dXSwwFkZhD2d79327s6gc3mmguqJ'
      var bitcoinAddress = 'midBg73YWManS2K2parVZEkcdMc854SkZy'
      var badAddress = 'DAsrRRtFr3Ewck@_@mkkL31dXSwwFkZhD2d79327s6gc3mmguqJ'

      describe('validation', function () {
       it('a typical address', function () {
         expect(Validator.validateAddress(typicalAddress)).to.be.ok;
       });

       it('a bitcoin address', function () {
         expect(Validator.validateAddress(bitcoinAddress)).to.be.ok;
       });

       it('sloppy (actually bad) bitcoin address currently is allowed', function () {
         expect(Validator.validateAddress('ABCDEF123')).to.be.ok;
       });

       it('sloppy (actually bad) address currently is allowed', function () {
         expect(Validator.validateAddress('ABCDEF123@abcdef')).to.be.ok;
       });

       it('spaces allowed before', function () {
         expect(Validator.validateAddress('   ' + typicalAddress)).to.be.ok;
       });

       it('spaces allowed after', function () {
         expect(Validator.validateAddress(typicalAddress + '  ')).to.be.ok;
       });

       it('whitespaces allowed before and after', function () {
         expect(Validator.validateAddress('\t\t' + typicalAddress + '\t '))
         .to.be.ok;
       });

       it('a bad address', function () {
         expect(Validator.validateAddress(badAddress)).to.be.false;
       });
     });

     describe('normalize', function () {
       it(' a typical address', function () {
         expect(Validator.normalizeAddress(typicalAddress)).to.equal(typicalAddress)
       });
       it('spaces allowed before', function () {
         expect(Validator.normalizeAddress('   ' + typicalAddress)).to.be.equal(typicalAddress);
       });
       it('spaces allowed after', function () {
         expect(Validator.normalizeAddress(typicalAddress + '  ')).to.be.equal(typicalAddress);
       });
       it('whitespaces allowed before and after', function () {
         expect(Validator.normalizeAddress('\t\t' + typicalAddress + '\t '))
         .to.be.equal(typicalAddress);
       });
      });
    });

  
 
});
