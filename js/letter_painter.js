var Painter = require('./painter');
var Alphabet = require('./letters.js');


$(function () {
  var $board = $('#board');
  new Painter($board, Alphabet);
});
