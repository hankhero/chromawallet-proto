var validateAmount = function (amount) {
   return /^ *[0-9]+([.,][0-9]+)? *$/.test(amount); //See testcases
};

var validateAmountInProgress = function (amount) {
   return /^[0-9]*[.,]?[0-9]*$/.test(amount); //See testcases
};


module.exports = {
    validateAmount: validateAmount,
    validateAmountInProgress: validateAmountInProgress
};
