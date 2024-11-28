/*
    최악의 상황 -> 복잡도
    최선 상황 (이미 다 정렬된 상태)일 때의 복잡도도 고려
*/

// 버블 정렬 O(n^2)
const bubbleSort = (array) => {
    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 1; j < array.length; j++) {
            if (array[j - 1] > array[j]) {
                const temp = array[j]
                array[j] = array[j - 1];
                array[j - 1] = temp;
            }
        }
    }
    return array;
}

// 선택 정렬 O(n^2)
const selectionSort = (array) => {
    let indexMin, temp;
    for (let i = 0; i < array.length - 1; i++) {
        indexMin = i;
        for (let j = 1; j < array.length; j++) {
            if (array[j] < array[indexMin]) {
                indexMin = j;
            }
        }
        temp = array[indexMin];
        array[indexMin] = array[i]
        array[i] = temp;
    }
    return array;
}

// 삽입 정렬 O(n^2)
// 이미 정렬이 끝난 상태라면 O(n)
const insertSort = (array) => {
    for (let i = 1; i < array.length; i++) { // n - 1
        let currentValue = array[i]; // 1
        let j; // 1
        for (j = i - 1; j >= 0 && array[j] > currentValue; j--) { // n
            array[j + 1] = array[j]
        }
        array[j + 1] = currentValue;
    }
    return array;
}

// 합병 정렬 O(n log n)

const array = [14, 78, 3, 68];
const [[A, B], [C, D]] = [array.slice(0, 2), array.slice(2)];
const array1 = [A, B];
const array2 = [C, D];

/**
 * B < C -> [A, B, C, D]
 * B > C && B < D = [A || C, B, D]
 * B > D = [A || C, D, B]
 */

let tempArray = [];

// 분할 할 때 첫번째 ELEMENT 비교 후 넣는 방법 등 다양한 IDEA가 있다

// 연산이 끝날 때 까지 mergeSort()가 잡혀있기 때문에 공간 복잡도가 증가한다 - 메모리 사용량이 늘어난다

const mergeSort = (array) => {
    if (array.length <= 1) return array;

    const mid = Math.floor(array.length / 2);
    const left = arr.slice(0, mid);
    const right = arr.slice(mid);
    const sortedLeft = mergeSort(left);
    const sortedRight = mergeSort(right);
    return merge(sortedLeft, sortedRight)
}

const merge = (leftArr, rightArr) => {
    let merged = [];
    let leftIndex = 0;
    let rightIndex = 0;
    while (leftIndex < leftArr.length && rightIndex < rightArr.length) {
        if (leftArr[leftIndex] < rightArr[rightIndex]) {
            merged.push(leftArr[leftIndex])
            leftIndex++;
        } else {
            merged.push(rightArr[rightIndex])
            rightIndex++;
        }
    }
    while (leftIndex < leftArr.length) {
        merged.push(leftArr[leftIndex])
        leftIndex++;
    }
    while (rightIndex < rightArr.length) {
        merged.push(rightArr[rightIndex])
        rightIndex++;
    }
    return merged;
};

