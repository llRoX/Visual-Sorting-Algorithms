



//Function To Swap Two Objects In An Array
export function swap(arr, indexA, indexB) {
    let temp = arr[indexA];
    arr[indexA] = arr[indexB];
    arr[indexB] = temp;
}


export function isSorted(arr) {
    let last = arr[0]

    for (let val of arr) {
        if (val < last) {
            return false;
        } else {
            last = val;
        }
    }
    return true;
}



