


function SortableArray(length, isInt){
    this.length = length


    this.arr = new Array(this.length)

    this.initRandom = (min, max) => {
        for(let ind = 0; ind < this.length; ind++){
            var value = Math.random() * max + min 
            value = isInt ? Math.floor(value) : value;
            this.arr[ind] = value;
        }
    }


    this.compare = (indexA, indexB) => {
        const a = this.arr[indexA]
        const b = this.arr[indexB]

        if (a === b){
            return 0
        }
        else if(b > a){
            return 1
        }else{
            return -1
        }
    }

    this.swap = (indexA, indexB) => {
        const temp = this.arr[indexA]
        this.arr[indexA] = this.arr[indexB]
        this.arr[indexB] = temp;
    }

    this.get = (index) =>{
        return this.arr[index];
    }

}


export default SortableArray;
