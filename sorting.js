const canvas = document.getElementById('algo-canvas');
const ctx = canvas.getContext('2d');


const height = 400;
var values = [];

var valueMax;
var delay = 1;
var amountOfValues = 100;
var width;

var useColours = true;
var showEachSwap = false;
var showEachSendToEnd = true;

var stopNow = false;

function stop()
{
    stopNow = true;
    console.log("Stop");
}


const sort_types = {
    BubbleSort : "BubbleSort",
    SelectionSort : "SelectionSort",
    InsertionSort : "InsertionSort",
    QuickSort : "QuickSort",
    MergeSort : "MergeSort",
    StalinSort : "StalinSort" 
}

Object.freeze(sort_types);







//Function To Generate Random Values For The Array
//Uses UserInput To Find The Amount Of Values, Then Uses The Height Of The Canvas As The Max Value.
//Also Assigns A Colour To Each Value So That It Doesn't Need To Be Recalculated Each Draw Call.
function generateValues(arr) {
    //Clear Values Array
    
    amountOfValues = parseInt(document.getElementById('amountOfValues').value);

    //Add One To The Amount Of Values To Ensure All Values Fit On Canvas
    width = canvas.width / (amountOfValues + 1);
    
    //Generate New Values
    //amountOfValues denotes the amount of values to generate
    //valueMax denotes the maximum value of any block;
    for (let i = 0; i < amountOfValues; i++) {
        let height = Math.floor(Math.random() * valueMax + 1);
        let newBlock = new Block(height)


        //Generate A Colour For The Block Based On Value
        let hue = newBlock.value;
        let saturation = newBlock.value;
        let lightness = 50;
        let alpha = 100;

        newBlock.colour = `hsla(${hue},${saturation}%,${lightness}%,${alpha})`;
        arr.push(newBlock);
    }

    draw(arr);
}





//---Drawing Functions---//

//Function To Clear The Entire Canvas
function clear(startPoint = 0, endPoint) {
    console.log(Math.ceil((endPoint) * width));
    ctx.clearRect(0, 0, canvas.width , canvas.height);
}




//Main Drawing Function
function draw(arr, startPoint = 0, endPoint = arr.length) {
    clear(startPoint, endPoint);
    
    for (let i = startPoint ; i < endPoint; i++) {

        if (arr[i].selectedRed) {
            ctx.fillStyle = 'red';
        } else if (arr[i].selectedGreen) {
            ctx.fillStyle = 'lime';
        } else if (useColours) {
            ctx.fillStyle = arr[i].colour;
        } else {
            ctx.fillStyle = 'white';
        }
        ctx.beginPath();
        //Draw Rectangles Based On Position In Array
        ctx.rect(10 + (width * i), canvas.height - arr[i].value, width, arr[i].value);
        if(amountOfValues < 101){
            ctx.stroke();

        }
        ctx.fill();



    }



}


//---End Drawing Functions---//


//---Button Functions---//






//---End Helper Functions---//




//---Sorting Functions---//




async function quickSort(arr, low, high) {
    
    if(stopNow){return;}

    if (low < high) {
        let partitionIndex = await partition(arr, low, high);
        arr[low].selectedRed = true;
        if (showEachSendToEnd) {
            await sleep(delay);
            draw(arr);
        }
        arr[partitionIndex].selectedGreen = false;
        arr[low].selectedRed = false;

        await Promise.all([quickSort(arr, low, partitionIndex - 1),quickSort(arr, partitionIndex + 1, high)]);
    }
    if(stopNow){return;}
    
    

}
async function partition(arr, low, high) {
    if(stopNow){return;}

    let pivotPoint = arr[high].value;
    let indexOfSmaller = low - 1;
    arr[high].selectedGreen = true;

    for (let i = low; i < high; i++) {
        if (arr[i].value < pivotPoint) {
            indexOfSmaller++;
            await asyncSwap(arr, indexOfSmaller, i);
            if(showEachSwap){
                await sleep(delay);
                draw(arr);
            }
                       
            
        }
    }

    arr[high].selectedGreen = false;

    
    await asyncSwap(arr, indexOfSmaller + 1, high);
    return indexOfSmaller + 1;
}



function stalinSort(arr) {
    let sortedArr = [];
    let bigger = 0;
    //For each element, if element bigger than the largest found value, push it into the sorted array.
    arr.forEach(element => element.value >= bigger ? (bigger = element.value, sortedArr.push(element)) : 0);
    draw(sortedArr);
    return sortedArr;
}

async function mergeSort(arr)
{
    if(arr.length <= 1)
    {
        return arr;
    }

    let middleIndex = Math.floor(arr.length / 2);
    if(showEachSendToEnd)
        {
            await sleep(delay);
            draw(arr);
        }
    let leftArray = arr.slice(0,middleIndex);
    let rightArray = arr.slice(middleIndex);
    return merge(await mergeSort(leftArray),await mergeSort(rightArray));
    

}

async function merge(leftArray, rightArray)
{
    let resultArray = [], leftIndex = 0, rightIndex = 0;

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

//---End Sorting Functions---//