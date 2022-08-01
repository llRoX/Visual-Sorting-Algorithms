import selectionSort from "../sorting/selectionSort.js"
import SortableArray from "../sorting/core/SortableArray.js";

const rand = new SortableArray(10, true);
rand.initRandom(0, 10);



selectionSort(rand);
