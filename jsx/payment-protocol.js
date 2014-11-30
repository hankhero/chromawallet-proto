var makeUriForQR = function(assetModel, optAmount) {
    var aparts = assetModel.getAddress().split('@');
    var asset_id = null,
        address = '',
        separator = '?';
    if (aparts.length == 2) {
        asset_id = aparts[0];
        address = aparts[1];
    } else {
        address = aparts[0];
    }
    var uri = "bitcoin:" + address;
    if (asset_id) {
        uri = uri + separator + "asset_id=" + encodeURIComponent(asset_id);
        separator = "&";
    }
    if (optAmount) {
        uri = uri + separator + "amount=" + encodeURIComponent(optAmount);
        separator = "&";
    }
    return uri;
};

module.exports = {
    // Two different kind of URI:s
    makePlainBitcoin: function(assetModel, amount, cb) {
        var uri = makeUriForQR(assetModel, amount);
        cb(null, uri);
    },
    makeCWPP: function (assetModel, amount, cb) { 
        var pay_req = assetModel.makePaymentRequest({amount: amount});
        pay_req.getPaymentURI(cb);
    }
}
