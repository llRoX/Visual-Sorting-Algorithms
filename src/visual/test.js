import selectionSort from "../sorting/selectionSort.js"
import SortableArray from "../sorting/core/SortableArray.js";
import bubbleSort from "../sorting/bubbleSort.js";

const rand = new SortableArray(10, true);
rand.initRandom(0, 10);



bubbleSort(rand);
console.log(rand);

rand.initRandom(0, 100);
selectionSort(rand);
console.log(rand);