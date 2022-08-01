function mergeSort(arr)
{
    if(arr.length <= 1)
    {
        return arr;
    }

    const middleIndex = Math.floor(arr.length / 2);

    const leftArray = arr.slice(0,middleIndex);
    const rightArray = arr.slice(middleIndex);
    return merge( mergeSort(leftArray), mergeSort(rightArray));
    

}

function merge(leftArray, rightArray)
{
    const resultArray = [];
    let leftIndex = 0, rightIndex = 0;

    while(leftIndex < leftArray.length && rightIndex < rightArray.length)
    {
        if(leftArray[leftIndex].value < rightArray[rightIndex].value)
        {
            resultArray.push(leftArray[leftIndex]);
            leftIndex++;
        }
        else
        {
            resultArray.push(rightArray[rightIndex]);
            rightIndex++;
        }
        
        
    }
    return resultArray.concat(Array.from(leftArray).slice(leftIndex))
    .concat(Array.from(rightArray).slice(rightIndex));
    
}


export defualt mergeSort;