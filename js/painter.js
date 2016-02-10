var colors = [ '#EC87C0', '#4FCE59', '#ED5565', '#48CFAD', '#FFCE54', '#3BAFDA'];
// _ = require('underscore');

function Painter($board, Alphabet) {
  this.$board = $board;
  this.alphabet = Alphabet;
  this.stencil = _.sample(Alphabet);
  this.letterIndex = 0;
  // this.letterList = ['letterTest'];
  this.letterList = ['letterA', 'letterB', 'letterC', 'letterD', 'letterE', 'letterF', 'letterG', 'letterH', 'letterI', 'letterJ'];
  this.numPixels = 0;
  this.totalWhiteSquares = 0;
  this.whiteSquares = 0;
  this.numRows = 0;
  this.setupBoard();
  this.registerEvents();
  this.painting = false;
  this.brushColor = 'black';
}

$.extend(Painter.prototype, {
  setupBoard: function() {
    this.stencil = this.alphabet[this.letterList[this.letterIndex]];

    this.letterIndex += 1;

    if (this.letterIndex >= this.letterList.length){
      this.letterIndex = this.letterIndex % this.letterList.length;
    }

    for (var row = 0; row < this.stencil.length; row ++) {
      this.addRow(row);
    }

    var percentage = Math.floor((this.totalWhiteSquares - this.whiteSquares) / this.totalWhiteSquares * 100);
    var reminder = "You're at " + percentage.toString() + "%. Keep going!";
    $reminder = $("<div>")
      .addClass('reminder')
      .css("background-color", "#ED5565")
      .text(reminder);
    this.$board.append($reminder);
  },

  addRow: function(rowIndex) {
    for ( var col = 0; col < this.stencil[rowIndex].length; col++ ) {
      var $square;
      if (this.stencil[rowIndex][col] === 0) {
        $square = $("<div>").addClass('square').data('id', this.numPixels).css("background-color", "black");
      } else {
        $square = $("<div>").addClass('square').data('id', this.numPixels).css("background-color", "white");
        this.whiteSquares += 1;
        this.totalWhiteSquares = this.whiteSquares;
      }
      this.numPixels += 1;
      this.$board.append($square);
    }
  },

  registerEvents: function(e) {
    this.$board.on('mousedown', '.square', this.startPainting.bind(this));
    this.$board.on('mouseenter', '.square', this.paintSquare.bind(this));
    this.$board.on('mouseup', '.square', this.stopPainting.bind(this));
  },

  startPainting: function(e) {
    if ($(e.currentTarget).css( "background-color" )) {
      this.painting = true;
      this.paintSquare(e);
    }
  },

  stopPainting: function(e) {
    this.painting = false;
  },

  paintSquare: function(e) {
    if(!this.painting) {
      return;
    }

    var $square = $(e.currentTarget);

    if ($(e.currentTarget).css( "background-color" ) === "rgb(255, 255, 255)") {
      var color = _.sample(colors);
      $square.css('background', color);
      this.whiteSquares -= 1;

      if (this.whiteSquares === 0) {
        this.finish();
      }
    }
    var percentage = Math.floor((this.totalWhiteSquares - this.whiteSquares) / this.totalWhiteSquares * 100);
    var reminder = "You're at " + percentage.toString() + "%. Keep going!";
    $(".reminder").text(reminder);
  },

  finish: function() {
    if (this.whiteSquares === 0) {
      $banner = $("<div>").addClass('banner').css("background-color", "green").text("Nice!");
      $(".reminder").remove();
      this.$board.append($banner);
      that = this;
      window.setTimeout(function() {
        that.$board.empty();
        that.setupBoard();
      }, 3000);
    }
  }
});

// module.exports = Painter;
