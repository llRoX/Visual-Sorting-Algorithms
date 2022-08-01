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

//---Setup Functions---//


//Function To Setup The Canvas And Set The Settings
function setup() {
    console.log("setup");
    canvas.height = document.querySelector('#canvas-div').clientHeight;
    canvas.width = document.querySelector('#canvas-div').clientWidth;
    width = canvas.width / amountOfValues;

    document.addEventListener('keydown', function(event){if(event.keyCode == 13){sortButtonFunction(document.querySelector("#sort-button"))};})

    valueMax = canvas.height;
    generateValues(values)

    delay = document.querySelector("#delay").value;
    useColours = document.getElementById('colour-checkbox').checked;
    updateSpeedSettings();
    draw(values);
}

//Constructor For The Block Object
function Block(value) {
    this.value = value;
    this.selectedRed = false;
    this.selectedGreen = false;
    this.colour;
}

//---End Setup Functions---//

//---Settings Functions---//


function updateDelay(delayElement)
{

    delay = delayElement.value > 0 ? delayElement.value : 1;
}
function resize()
{
    canvas.height = document.getElementById('canvas-div').clientHeight;
    canvas.width = document.getElementById('canvas-div').clientWidth;
}

//Function To Update Whether Or Not To Use Colours, Called When The Checkbox Is Clicked
function updateColourSettings(checkbox) {
    useColours = checkbox.checked;
    draw(values)
}


//Function To Update The Speed Settings, Finds Which Radio Button Is Clicked And Sets The Setting.
//Called Either When A Radio Button Is Clicked Or Elsewhere In The Program.
function updateSpeedSettings(radioButtons){


    let speedType = radioButtons != undefined ? radioButtons.value : document.querySelector('input[name="detailSpeed"]:checked').value;
    
    if (speedType == 'Instant') {
        showEachSwap = false;
        showEachSendToEnd = false;
    } else if (speedType == 'ShowDetails') {
        showEachSwap = false;
        showEachSendToEnd = true;
    } else {
        showEachSwap = true;
        showEachSendToEnd = true;
    }
}




//---End Settings Functions---//








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

function sortButtonFunction(button)
{
    if(button.innerHTML == "Sort")
    {
        button.innerHTML = "Cancel";
        button.style.background = "red";
        main();
    }
    else
    {
        console.log("stopNow");
        stopNow = true;
        button.innerHTML = "Sort";
        button.style.background = "lime";
        

    }
}

//Function Activated When Clicking The Generate Button.
//Clears The Value Array, Gets Rid Of The Done Checkmark, And Runs The generateValues() Function.
function generateButtonFunction() {
    console.log("geneatad");
    values = [];
    stopNow = true;

    document.querySelector('#completedCheck').src = '';

    generateValues(values);
}


//---End Button Functions---//

//Main Function
//Run When Clicking The Sort Button
async function main() {
    generateButton = document.querySelector("#generate-button")
    generateButton.onclick = null;
    generateButton.classList.add("interactiveButtonOff");



    stopNow = false;
    let selectionOption = document.getElementById('sort-type').value;
    console.log(selectionOption);

    switch(selectionOption){
        case sort_types.BubbleSort:
            let sorted;
            //Wait For The Function To Finish, Assign The Result To Sorted, And Log The Result.z`
            await bubbleSort(values);
            break;
        case sort_types.SelectionSort:
            await selectionSort(values);
            break;
        case sort_types.QuickSort:
            await quickSort(values, 0, values.length - 1);
            draw(values);
            break;
        case sort_types.MergeSort:
            const result = await mergeSort(values, 0, values.length - 1);
            draw(result);
            break;
        case sort_types.InsertionSort:
            await insertionSort(values);
            break;
        case sort_types.StalinSort:
            values = stalinSort(values);
            draw(values);
            break;
        default:
            break; 


    }



    //alert("Done");
    document.querySelector("#sort-button").innerHTML = "Sort";
    document.querySelector("#sort-button").style.background = "lime";

    generateButton.onclick=generateButtonFunction;
    
    generateButton.classList.remove("interactiveButtonOff");



}

//---Helper Functions---//




//Async Swap Function So That It Works With Async Quicksort.
async function asyncSwap(arr,a,b)
{
    let temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
}

//Function To Enable Delay
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

//---End Helper Functions---//

//Bubble Sort
async function bubbleSort(arr) {
    arr[arr.length - 1].selectedRed = true;

    for (let i = 0; i < arr.length - 1; i++) {
        if (i > 0) {
            arr[arr.length - i].selectedRed = true;
        }
        if (showEachSendToEnd) {
            await sleep(delay);
            draw(arr);

        }

        let swapped = false;

        for (var j = 0; j < arr.length - i - 1; j++) {
            if (arr[j].value > arr[j + 1].value) {

                if(arr[j+1].selectedRed){arr[j+1].selectedRed=false}

                swap(arr, j, j + 1);
                swapped = true;

            }

            if (showEachSwap) {
                await sleep(delay);
                arr[j+1].selectedGreen = true;
                draw(arr);
                arr[j+1].selectedGreen = false;
            }
            if(stopNow){return;}




        }
        i == 0 ? arr[arr.length - 1].selectedRed = false : arr[arr.length - i].selectedRed = false;

       
        if (!swapped) {
            break;
        }


    }
    draw(arr);
    return arr;


}


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

async function insertionSort(arr) {
    let index, key, j;
    for (index = 1; index < arr.length; index++) {
        key = arr[index];
        j = index - 1;

        //arr[index].selectedRed = true;

        if (showEachSendToEnd) {
            await sleep(delay);
            draw(arr);
        } 
        arr[index].selectedRed = false;



        while (j >= 0 && arr[j].value > key.value) {
            arr[j + 1] = arr[j];
            arr[j].selectedRed = true;
            if (showEachSwap) {
                await sleep(delay);
                draw(arr);
            }
            arr[j].selectedRed = false;
            j--;
            if(stopNow){return};
        }
        arr[j + 1] = key;
    }
    draw(arr);
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