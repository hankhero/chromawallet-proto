
var _ = require('lodash')

var validateAmount = function (amount) {
   return /^ *[0-9]+([.,][0-9]+)? *$/.test(amount); //See testcases
};

var normalizeAmount = function (amount) { //We presume a validated amount
  return amount.replace(',', '.');
}

var validateAmountInProgress = function (amount) {
   return /^[0-9]*[.,]?[0-9]*$/.test(amount); //See testcases
};

///^[13][a-zA-Z0-9]{27,34}/

var validateAddress = function (address) {
  return /^\s*[a-zA-Z0-9]+(@[a-zA-Z0-9]+)?\s*$/.test(address)
};

var normalizeAddress = function (address) {
  return address.replace(/\s/g, '');
};

var normalizeMnemonicWord = function (wordString) {
  return wordString.replace(/\s/g, '').toLowerCase()
}

var normalizeMnemonicPhrase = function (phrase) {
  var parts = phrase.split(/\s+/),
      words = _.filter(parts, function (x) { return x !== "" }),
      clean = _.map(words, normalizeMnemonicWord),
      asString = clean.join(" ");
  return asString;
}

module.exports = {
  validateAmount: validateAmount
  , normalizeAmount: normalizeAmount
  , validateAddress: validateAddress
  , normalizeAddress: normalizeAddress
  , validateAmountInProgress: validateAmountInProgress
  , normalizeMnemonicWord: normalizeMnemonicWord
  , normalizeMnemonicPhrase: normalizeMnemonicPhrase
}
