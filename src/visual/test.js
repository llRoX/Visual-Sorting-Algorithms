import selectionSort from "../sorting/selectionSort.js"
import SortableArray from "../sorting/core/SortableArray.js";
import bubbleSort from "../sorting/bubbleSort.js";
import insertionSort from "../sorting/insertionSort.js";
import quickSort from "../sorting/quickSort.js";

const rand = new SortableArray(100000, true);
rand.initRandom(0, 10);




quickSort(rand);
console.log(rand);