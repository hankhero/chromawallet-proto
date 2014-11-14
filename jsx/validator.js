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


module.exports = {
    validateAmount: validateAmount,
    normalizeAmount: normalizeAmount,
    validateAddress: validateAddress,
    normalizeAddress: normalizeAddress,
    validateAmountInProgress: validateAmountInProgress
};
