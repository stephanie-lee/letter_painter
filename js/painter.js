var colors = ['yellow', 'magenta', 'teal', 'orange'];
_ = require('underscore');

function Painter($board, stencil) {
  this.$board = $board;
  this.stencil = stencil;
  this.numPixels = 0;
  this.numRows = 0;
  this.setupBoard();
  this.registerEvents();
  this.painting = false;
  this.brushColor = 'black';
  // this.brushStrokes = [];
}

$.extend(Painter.prototype, {
  setupBoard: function() {
    for (var row = 0; row < this.stencil.length; row ++) {
      this.addRow(row);
    }
    // for ( var row = 0; row < 20; row++ ) {
    //   this.addRow();
    // }
  },

  addRow: function(rowIndex) {
    for ( var col = 0; col < this.stencil[rowIndex].length; col++ ) {
      var $square;
      if (this.stencil[rowIndex][col] === 0) {
        $square = $("<div>").addClass('square').data('id', this.numPixels).css("background-color", "black");
      } else {
        $square = $("<div>").addClass('square').data('id', this.numPixels).css("background-color", "white");
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

    if ($(e.currentTarget).css( "background-color" ) === "rgb(0, 0, 0)") {
      return;
    } else {
      var color = _.sample(colors);
      $square.css('background', color);
    }
    // this.brushStrokes[this.brushStrokes.length - 1].push($square.data('id'));
  }

});

module.exports = Painter;
