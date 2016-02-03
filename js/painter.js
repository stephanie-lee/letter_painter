var colors = ['black'];

function Painter($board) {
  this.$board = $board;
  this.numPixels = 0;
  this.setupBoard();
  // this.registerEvents();
  // this.painting = false;
  this.brushColor = 'black';
  this.brushStrokes = [];
}

$.extend(Painter.prototype, {
  setupBoard: function() {
    for ( var i = 0; i < 20; i++ ) {
      this.addRow();
    }
  },

  addRow: function() {
    for ( var i = 0; i < 20; i++ ) {
      var $square = $("<div>").addClass('square').data('id', this.numPixels);
      this.numPixels += 1;
      this.$board.append($square);
    }
  }
});

module.exports = Painter;
