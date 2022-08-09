
import COLOURS from "../data/colours.js"

function CanvasHelper(canvas, context) {
    this.canvas = canvas;
    this.context = context;

    // Set Canvas Size To Correct Size
    this.resize();






}

CanvasHelper.prototype.resize = function (e) {
    const sizes = this.canvas.getBoundingClientRect();
    this.width = sizes.width;
    this.height = sizes.height;
    this.canvas.width = sizes.width;
    this.canvas.height = sizes.height;
}


CanvasHelper.prototype.drawRect = function ({ x, y, width, height, colour = COLOURS.WHITE, strokeColour = COLOURS.BLACK, doStroke = true, doFill = true }) {
    const context = this.context;
    context.fillStyle = colour;
    context.strokeStyle = strokeColour;
    if (doFill) {
        context.fillRect(0, 0, width, height);
    } else {
        context.rect(x, y, width, height);
    }

    if (doStroke) {
        context.stroke();
    }
}


CanvasHelper.prototype.wipe = function ({ wipeColour = COLOURS.WHITE }) {
    this.drawRect({ x: 0, y: 0, width: this.width, height: this.height, doStroke: false, colour: wipeColour, doFill: true });
}

export default CanvasHelper;