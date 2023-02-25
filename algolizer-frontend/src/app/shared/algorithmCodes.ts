export const BUBBLE_SORT_CODE: string = `
function bubbleSort(arr) {
    let isSwapped;
    for (let i = 0; i < arr.length; i++) {
        isSwapped = false;
        for(let j = 0; j < arr.len; j++){
            if(arr[j] > arr[j + 1]) {
                swap(arr[j], arr[j+1]);
                isSwapped = true;
            }
        }
        if(!isSwapped) break;
    }
}
`;