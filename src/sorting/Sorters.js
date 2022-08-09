import selectionSort from "./sorters/selectionSort.js"
import bubbleSort from "./sorters/bubbleSort.js"
import insertionSort from "./sorters/insertionSort.js"
import quickSort from "./sorters/quickSort.js"


import SortableArray from "./core/SortableArray.js"



export default {
    "SelectionSort": selectionSort,
    "BubbleSort": bubbleSort,
    "InsertionSort": insertionSort,
    "QuickSort": quickSort,

    "SortableArray": SortableArray
};