import selectionSort from "../../sorting/selectionSort.js"
import SortableArray from "../../sorting/core/SortableArray.js";
import bubbleSort from "../../sorting/bubbleSort.js";
import insertionSort from "../../sorting/insertionSort.js";
import quickSort from "../../sorting/quickSort.js";



SortableArray.prototype.get = function (num) {
    console.log("test");
    return SortableArray.prototype.get.call(this)
}


const rand = new SortableArray(1000, true);
rand.initRandom(0, 10);

rand.get(1);

quickSort(rand);
console.log(rand);