
var detect = function () {
  var iOS = /(iPad|iPhone|iPod)/g.test( navigator && navigator.userAgent );
  if (iOS) {
    $('body').addClass('ios');
  }
};

module.exports = {
  detect: detect
};
