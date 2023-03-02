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


//šta pratiti u bubble sort algoritmu?
/*
Algorithm context - to su stanja svih varijabli u samom algoritmu:
    isSwapped: boolean - primitivni prikaz,
    i: number - primitivni, i prikaz strelicom na nizu,
    j: number - primitivni, i prikaz strelicom na nizu,
    arr: niz - vizualni prikaz
Traženo rješenje:
    broj zamjena: - primitivni prikaz na ekranu.
linija koda - prikaz strelicom u kodu - ovo je linija koda nakon čijeg izvršenja imamo prikazano stanje na ekranu
*/

const push = (steps: any[], step: any) => {
    steps.push(JSON.parse(JSON.stringify(step)));
}

const deepArray = (arr: any[]) => {
    return JSON.parse(JSON.stringify(arr));
}

export const bubbleSortStepsGenerator = (arr: number[]): any[] => {      
    let falseCondition = true;
    let steps:any[] = [];
    let step = {
        isSwapped: undefined as unknown as boolean,
        i: undefined as unknown as number,
        j: undefined as unknown as number, 
        arr: arr,
        numofSwaps: 0,
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
            step.comparisonStatus = undefined;

            let temp = arr[j]
            arr[j] = arr[j+1];
            arr[j+1] = temp;

            step.arr = arr;
            step.line = 6;
            step.numofSwaps += 1;
            step.arr = deepArray(step.arr);
            push(steps, step);

            isSwapped = true;

            step.isSwapped = true;
            step.line = 7;
            step.arr = deepArray(step.arr);
            push(steps, step);
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
        step.line = 8;
        step.arr = deepArray(step.arr);
        push(steps, step);
        step.isSwappedStatus = undefined;

        step.line = 9;
        step.arr = deepArray(step.arr);
        push(steps, step);
        break;    
      } else {
        step.isSwappedStatus = {
            shouldContinue: true
        };
        step.line = 8;
        step.arr = deepArray(step.arr);
        push(steps, step);
        step.isSwappedStatus = undefined;
      }

    }
    return steps;
}

