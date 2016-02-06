var Painter = require('./painter');
var LetterA = require('./letters.js');


$(function () {
  var $board = $('#board');
  new Painter($board, LetterA);
});
