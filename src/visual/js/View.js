


function View() {


    // Constructor
    this.elements = {};

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

    this.elements.context.fillStyle = "black";
    this.elements.context.fillRect(0, 0, 400, 400);
}


export default View;