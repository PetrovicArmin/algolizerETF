export const ALGORITHMS = {
    BUBBLE_SORT_CODE_ARRAY: [
        '    function bubbleSort(arr) {',
        '        let isSwapped = false;',
        '        for (let i = 0; i < arr.length; i++) {',
        '            isSwapped = false;',
        '            for(let j = 0; j < arr.length - i - 1; j++){',
        '                if(arr[j] > arr[j + 1]) {',
        '                    swap(arr[j], arr[j+1]);',
        '                    isSwapped = true;',
        '                }',
        '            }',
        '            if(!isSwapped) break;',
        '        }',
        '    }'
    ] as string[],
    MERGE_SORT_CODE_ARRAY: [
        '    function mergeSort(arr) {',
        '        if (arr.length <= 1) ',
        '            return arr',
        '        let mid = Math.floor(arr.length / 2);',
        '',
        '        let left = mergeSort(arr.slice(0, mid));',
        '        let right = mergeSort(arr.slice(mid));',
        '',
        '        let sortedArr = [];',
        '        while (left.length && right.length) {',
        '            if (left[0] < right[0])',
        '                sortedArr.push(left.shift())',
        '            else', 
        '                sortedArr.push(right.shift())',
        '        }',
        '        return [...sortedArr, ...left, ...right]',
        '  }'
    ] as string[]
};


export const generateAlgorithmCodeString = (pointerIndex: number, algorithmArray: string[]) => {
    let finalString = "";
    for (let i = 0; i < algorithmArray.length; i++) {
        if (i == pointerIndex) 
            finalString += "\n--->" + algorithmArray[i].substring(4);
        else 
            finalString += "\n" + algorithmArray[i];
    }
    finalString = finalString.substring(1);
    return finalString;
};

import AlgorithmContext from "../interfaces/AlgorithmContext";

export const createAlgorithmContextArray = (contextProperties: string[], contextValues: string[]) => {
    let contextArray: AlgorithmContext[] = [];

    for (let i = 0; i < contextProperties.length; i++) {
        contextArray.push({
            contextProperty: contextProperties[i],
            propertyValue: contextValues[i]
        });
    }

    return contextArray;
}

const push = (steps: any[], step: any) => {
    steps.push(JSON.parse(JSON.stringify(step)));
}

const deepArray = (arr: any[]) => {
    return JSON.parse(JSON.stringify(arr));
}

//vraćanja moraju biti ispravna radi rekurzije
//steps objekat / niz će biti izgrađen kroz rekurziju, jer se cijelo vrijeme radi o istoj referenci
//odnosno, o različitim referencama na isti objekat!

let step: any = {
    array: [],
    left_array: [],
    right_array: [],
    sorted_array: [],
    mid_position: 0,
    left_arr_position: 0,
    right_arr_position: 0,
    recursion_depth: -1,
    line: 0,
    if_condition: undefined,
    going_back: false,
    going_forward: false
};

export const mergeSortStepsGenerator = (arr: number[], steps: any[], step: any): any[] => {
    step = {
        array: arr,
        left_array: undefined,
        right_array: undefined,
        sorted_array: undefined,
        mid_position: undefined,
        left_arr_position: undefined,
        right_arr_position: undefined,
        going_back: false,
        going_forward: false,
        merging: false,
        recursion_depth: step.recursion_depth + 1,
        line: 0,
        numOfFalse: step.numOfFalse,
        numOfTrue: step.numOfTrue
    };

    push(steps, step);

    if (arr.length <= 1) {
        step.going_back = true;
        step.line = 2;
        push(steps, step);
        step.going_back = false;
        return arr;
    } 

    let mid = Math.floor(arr.length / 2);

    step.mid_position = mid;
    step.line = 3;
    push(steps, step);
  
    step.line = 5;
    step.going_forward = true;
    push(steps, step);
    step.going_forward = false;

    let left = mergeSortStepsGenerator(arr.slice(0, mid), steps, step);

    step.left_array = left;
    step.line = 5;
    push(steps, step);

    step.line = 6;
    step.going_forward = true;
    push(steps, step);
    step.going_forward = false;

    let right = mergeSortStepsGenerator(arr.slice(mid), steps, step);

    step.right_array = right;
    step.line = 6;
    push(steps, step);

    let sortedArr: number[] = [];

    step.sorted_array = deepArray(sortedArr);
    step.line = 8;
    step.merging = true;

    push(steps, step);

    let left_position = 0;
    let right_position = 0;

    while (left.length && right.length) {

        if (left[0] < right[0]) {
            step.numOfTrue += 1;
            step.line = 10;
            step.if_condition = true;
            push(steps, step);

            sortedArr.push(left.shift());
            left_position += 1;

            step.line = 11;
            step.if_condition = undefined;
            step.sorted_array = deepArray(sortedArr);
            step.left_arr_position = left_position;
            push(steps, step);
        }
        else {
            step.numOfFalse += 1;
            step.line = 10;
            step.if_condition = false;
            push(steps, step);

            sortedArr.push(right.shift());
            right_position += 1;

            step.line = 13;
            step.if_condition = undefined;
            step.sorted_array = deepArray(sortedArr);
            step.right_arr_position = right_position;
            push(steps, step);
        }
    }

    sortedArr = [...sortedArr, ...left, ...right];

    step.line = 15;
    step.sorted_array = deepArray(sortedArr);
    step.going_back = true;

    push(steps, step);

    step.going_back = false;

    return sortedArr;
};

export const bubbleSortStepsGenerator = (arr: number[]): any[] => {      
    let falseCondition = true;
    let steps:any[] = [];
    let step = {
        isSwapped: undefined as unknown as boolean,
        i: undefined as unknown as number,
        j: undefined as unknown as number | undefined, 
        arr: arr,
        numOfSwaps: 0,
        line: 0,
        comparisonStatus: undefined as unknown as any,
        isSwappedStatus: undefined as unknown as any
    };

    push(steps, step);
    
    let isSwapped=false;

    step.isSwapped = false;
    step.line = 1;
    step.arr = deepArray(step.arr);

    push(steps, step);

    for(let i = 0; i < arr.length; i++){   

      step.i = i;
      step.line = 2;  
      step.arr = deepArray(step.arr);
      push(steps, step);

      isSwapped = false;
      
      step.isSwapped = false;
      step.line = 3;
      step.arr = deepArray(step.arr);
      push(steps, step);

      for(let j = 0; j < arr.length - i - 1; j++){
        
        step.j = j;
        step.line = 4;
        step.arr = deepArray(step.arr);
        push(steps, step);

        falseCondition = true;

          if(arr[j] > arr[j + 1]){
            falseCondition = false;

            step.comparisonStatus = {
                first: j,
                second: j+1,
                shouldChange: true
            }
            step.line = 5;
            step.arr = deepArray(step.arr);
            push(steps, step);

            let temp = arr[j]
            arr[j] = arr[j+1];
            arr[j+1] = temp;

            step.line = 7;
            step.numOfSwaps += 1;
            step.arr = deepArray(step.arr);
            step.arr = arr;
            step.isSwapped = true;
            push(steps, step);

            isSwapped = true;
            step.comparisonStatus = undefined;
          }

          if (falseCondition) {
            step.comparisonStatus = {
                first: j,
                second: j+1,
                shouldChange: false
            }
            step.line = 5;
            step.arr = deepArray(step.arr);
            push(steps, step);
            step.comparisonStatus = false;
          }          
      }

      if(!isSwapped) {
        step.isSwappedStatus = {
            shouldContinue: false
        };        
        step.line = 10;
        step.arr = deepArray(step.arr);
        push(steps, step);
        step.isSwappedStatus = undefined;

        step.line = 12;
        step.arr = deepArray(step.arr);
        push(steps, step);
        break;    
      } else {
        step.isSwappedStatus = {
            shouldContinue: true
        };
        step.line = 10;
        step.j = undefined;
        step.arr = deepArray(step.arr);
        push(steps, step);
        step.isSwappedStatus = undefined;
      }

    }
    return steps;
}

