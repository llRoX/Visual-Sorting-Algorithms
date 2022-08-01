function quickSort(arr, low, high) {
    
    if (low === undefined || high === undefined){
        low = 0;
        high = arr.length-1;
    }

    if (low < high) {
        let partitionIndex = partition(arr, low, high);

         quickSort(arr, low, partitionIndex - 1)
         quickSort(arr, partitionIndex + 1, high);
    }
}
function partition(arr, low, high) {

    const pivotPoint = high;
    let indexOfSmaller = low - 1;

    for (let index = low; index < high; index++) {

        const compareVal= arr.compare(pivotPoint, index );

        if (compareVal === -1) {
            indexOfSmaller++;
            arr.swap(indexOfSmaller, index);  
        }
    }


    
    arr.swap(indexOfSmaller + 1, high);
    return indexOfSmaller + 1;
}


export default quickSort;