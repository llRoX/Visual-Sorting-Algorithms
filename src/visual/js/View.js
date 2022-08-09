import COLOURS from "./data/colours.js"
import CanvasHelper from "./utility/CanvasHelper.js"

function View(controller) {


    // Constructor
    this.elements = {};

    // Vars
    this.useColour = false;
    this.isLoading = false;


    // Startup Stuff
    this.getUIElements();
    this.setEventListeners(controller);

    this.canvasHelper = new CanvasHelper(this.elements.canvas, this.elements.context);
    this.canvasHelper.wipe({ wipeColour: COLOURS.WHITE });

    this.resize();

    /*
 Add listener for resize
 so that correct width and height can be set
*/
    window.addEventListener("resize", this.resize, false);
}

View.prototype.resize = function (e) {
    this.canvasHelper.resize(e);
    this.width = this.canvasHelper.width;
    this.height = this.canvasHelper.height;
}

View.prototype.reset = function () {
}

View.prototype.getUIElements = function () {
    console.log('Getting UI Elements');


    // Get Canvas And Context
    this.elements.canvas = document.getElementById("algo-canvas");
    this.elements.context = this.elements.canvas.getContext('2d');

    // Get Options
    this.elements.useColourCheckbox = document.getElementById("colour-checkbox");
    this.elements.numValuesInput = document.getElementById("amount-of-values");
    this.elements.sortTypeDropDown = document.getElementById("sort-type");

    // Get Buttons
    this.elements.generateButton = document.getElementById("generate-button");
    this.elements.runButton = document.getElementById("run-button");




}



View.prototype.wipe = function () {
}

View.prototype.setEventListeners = function (controller) {

}


View.prototype.draw = function (viewModel) {

}


export default View;