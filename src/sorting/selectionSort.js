import {swap} from './core/utils.js'



function selectionSort(arr) {

    console.log(
        "test"
    );

    for (let i = 0; i < arr.length - 1; i++) {
        let indexOfMin = i;
     
        for (let j = i + 1; j < arr.length; j++) {
            
            let compareVal = arr.compare(indexOfMin, j)

            if (compareVal === -1) {
                indexOfMin = j;
            }

        }
        console.log(arr.arr);
        arr.swap(i, indexOfMin);

        
    }
}

export default selectionSort;