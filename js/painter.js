var colors = ['black'];

function Painter($board) {
  this.$board = $board;
  this.numPixels = 0;
  this.numRows = 0;
  this.setupBoard();
  this.registerEvents();
  this.painting = false;
  this.brushColor = 'teal';
  // this.brushStrokes = [];
}

$.extend(Painter.prototype, {
  setupBoard: function() {
    for ( var i = 0; i < 30; i++ ) {
      this.addRow();
    }
  },

  addRow: function() {
    for ( var i = 0; i < 30; i++ ) {
      var $square = $("<div>").addClass('square').data('id', this.numPixels);
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
    this.painting = true;
    // this.brushStrokes.push([]);
    this.paintSquare(e);
  },

  stopPainting: function(e) {
    this.painting = false;
  },

  paintSquare: function(e) {
    if(!this.painting) {
      return;
    }

    var $square = $(e.currentTarget);
    $square.css('background', this.brushColor);
    // this.brushStrokes[this.brushStrokes.length - 1].push($square.data('id'));
  }

});

module.exports = Painter;
