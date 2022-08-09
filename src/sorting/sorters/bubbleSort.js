//Bubble Sort
function bubbleSort(arr) {

    for (let ind = 0; ind < arr.length - 1; ind++) {

        let swapped = false;
        for (var jind = 0; jind < arr.length - ind - 1; jind++) {
            const compareVal = arr.compare(jind, jind+1)

            if (compareVal === -1) {

                arr.swap(jind, jind + 1);
                swapped = true;
            }
        }
        if (!swapped) {
            break;
        }
    }
}


export default bubbleSort;