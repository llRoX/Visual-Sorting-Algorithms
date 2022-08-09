


function selectionSort(arr) {


    for (let i = 0; i < arr.length - 1; i++) {
        let indexOfMin = i;
     
        for (let j = i + 1; j < arr.length; j++) {
            
            const compareVal = arr.compare(indexOfMin, j)

            if (compareVal === -1) {
                indexOfMin = j;
            }

        }
        arr.swap(i, indexOfMin);
        
    }
}

export default selectionSort;