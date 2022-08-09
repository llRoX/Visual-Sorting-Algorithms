




function insertionSort(arr) {

    let keyIndex, keyValue, j;

    for(keyIndex = 1; keyIndex < arr.length; keyIndex++){

        let searchingIndex = keyIndex - 1


        let compareVal = arr.compare(searchingIndex+1, searchingIndex)
        while(searchingIndex >= 0 && compareVal === 1){
            arr.swap(searchingIndex+1, searchingIndex)
            searchingIndex--;
            compareVal = arr.compare(searchingIndex+1, searchingIndex);
        }
    }
}


export default insertionSort;