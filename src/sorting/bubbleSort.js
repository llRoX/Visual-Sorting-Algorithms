//Bubble Sort
function bubbleSort(arr) {

    for (let ind = 0; ind < arr.length - 1; ind++) {

        let swapped = false;
        for (var j = 0; j < arr.length - ind - 1; j++) {
            const compareVal = arr.compare(j, j+1)

            if (compareVal === -1) {

                arr.swap(j, j + 1);
                swapped = true;
            }
        }
        if (!swapped) {
            break;
        }
    }
}


export default bubbleSort;