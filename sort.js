/*
    최악의 상황 -> 복잡도
    최선 상황 (이미 다 정렬된 상태)일 때의 복잡도도 고려
*/

// 버블 정렬 O(n^2)
function bubbleSort(array) {
    for (let i = 0; i < array.length - 1; i++) {
        for (let j = i + 1; j < array.length; j++) {
            if (array[j - 1] > array[j]) {
                const temp = array[j]
                array[j] = array[j - 1];
                array[j - 1] = temp;
            }
        }
    }
    return array;
}

function bubbleSort(array) {
    array.map(_ => array.map((e2, i) => {
        if (array[i] > array[i + 1]) {
            array[i] = array[i + 1];
            array[i + 1] = e2;
        }
    }))
}

// 예제 1
let scores = [
    { name: "철수", score: 85 },
    { name: "영희", score: 97 },
    { name: "민수", score: 21 },
    { name: "혜진", score: 49 },
    { name: "진수", score: 67 },
]

const sortedScore = (array) => {
    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 1; j < array.length; j++) {
            if (array[j - 1].score > array[j].score) {
                const temp = array[j]
                array[j] = array[j - 1];
                array[j - 1] = temp;
            }
        }
    }
    return array;
}

console.log(sortedScore(scores));

console.log(scores.sort((a, b) => a.score - b.score));

// 예제 2
let restaurants = [
    { name: "음식점A", totalOrders: 300, avgRating: 4.5, likes: 200, distance: 5 },
    { name: "음식점B", totalOrders: 250, avgRating: 4.2, likes: 180, distance: 25 },
    { name: "음식점C", totalOrders: 400, avgRating: 4.7, likes: 250, distance: 15 },
    { name: "음식점D", totalOrders: 200, avgRating: 4.1, likes: 320, distance: 10 },
    { name: "음식점E", totalOrders: 350, avgRating: 4.4, likes: 220, distance: 5 },
]

const weights = {
    totalOrders: 0.2,
    avgRating: 0.3,
    likes: 0.2,
    distance: 0.3
}

function calculateScore(restaurant) {
    const maxDistance = 20;
    if (restaurant.distance > maxDistance) return null;
    let score = weights.totalOrders * restaurant.totalOrders +
        weights.avgRating * restaurant.avgRating
        + weights.likes * restaurant.likes
        + weights.distance * (maxDistance - restaurant.distance)
    return score;
}

function bubbleSort(array) {
    let len = array.length;
    for (let i = len - 1; i >= 0; i--) {
        for (let j = 1; j <= i; j++) {
            let score1 = calculateScore(array[j - 1]);
            let score2 = calculateScore(array[j])
            if (score1 < score2) {
                let temp = array[j - 1]
                array[j - 1] = array[j]
                array[j] = temp
            }
        }
    }
    return array;
}

console.log(bubbleSort(restaurants));

// 선택 정렬 O(n^2)
const selectionSort = (array) => {
    let indexMin, temp;
    for (let i = 0; i < array.length - 1; i++) {
        indexMin = i;
        for (let j = i + 1; j < array.length; j++) {
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

// 예제 1
/**
 * 국가를 메달 수와 대회 참여 수에 따라 정렬합니다.
 * 선택 정렬 알고리즘 사용
 * @param {Array} countries - 국가 배열. 각 객체는 gold, silver, bronze, games 속성을 포함.
 * @returns {Array} 정렬된 국가 배열
 */
function rankCountries(countries) {
    const len = countries.length;

    for (let i = 0; i < len; i++) {
        let maxIndex = i;

        for (let j = i + 1; j < len; j++) {
            if (
                // 금메달 비교
                countries[j].gold > countries[maxIndex].gold ||
                // 은메달 비교
                (countries[j].gold === countries[maxIndex].gold &&
                    countries[j].silver > countries[maxIndex].silver) ||
                // 동메달 비교
                (countries[j].gold === countries[maxIndex].gold &&
                    countries[j].silver === countries[maxIndex].silver &&
                    countries[j].bronze > countries[maxIndex].bronze) ||
                // 대회 참여 수 비교
                (countries[j].gold === countries[maxIndex].gold &&
                    countries[j].silver === countries[maxIndex].silver &&
                    countries[j].bronze === countries[maxIndex].bronze &&
                    countries[j].games < countries[maxIndex].games)
            ) {
                maxIndex = j;
            }
        }

        // i번째 요소와 maxIndex 요소를 교환
        if (maxIndex !== i) {
            const temp = countries[i];
            countries[i] = countries[maxIndex];
            countries[maxIndex] = temp;
        }
    }

    return countries;
}

const countries = [
    { name: "USA", gold: 10, silver: 5, bronze: 2, games: 3 },
    { name: "China", gold: 10, silver: 5, bronze: 3, games: 4 },
    { name: "Japan", gold: 8, silver: 6, bronze: 5, games: 2 },
    { name: "Germany", gold: 10, silver: 5, bronze: 3, games: 2 },
];

console.log(rankCountries(countries));

// 예제 2
let potion = [5, 8, 6, 1, 9, 3];

for (let i = 0; i < potion.length; i++) {
    let maxIdx = i;
    for (let j = i + 1; j < potion.length; j++) {
        if (potion[j] > potion[maxIdx]) {
            maxIdx = j;
        }
    }
    [potion[i], potion[maxIdx]] = [potion[maxIdx], potion[i]]
}

let sum = 0;
let result = [];

potion.some((effect, i) => {
    sum = 0;
    result = [];
    for (let j = i; j < potion.length; j++) {
        sum += potion[j];
        result.push(potion[j])
        if (sum < 15 && j === potion.length - 1) break;
        else if (sum === 15) return true;
        else if (sum > 15) break;
    }
})

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
    const left = array.slice(0, mid);
    const right = array.slice(mid);
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

// 퀵 정렬 O(n log n) - 최악: O(n^2)

const quickSort = (array) => {
    if (array.length <= 1) return array;

    const pivot = array[0];
    const left = [];
    const right = [];
    for (let i = 1; i < array.length; i++) {
        array[i] < pivot ? left.push(array[i]) : right.push(array[i])
    }

    return [...quickSort(left), pivot, ...quickSort(right)]
}

// 힙 정렬

/** 힙(HEAP)이란?
 * 여러 개의 값 중에서 가장 크거나 작은 값을 빠르게 찾기 위해 만든 이진 트리
 * 짧게 HEAP이라고 부르기도 한다
 */

/** 최대 힙
 * 각 노드의 값이 해당 노드의 자식 노드들의 값보다 크거나 같다
 * 루트 노드에는 전체 힙에서 가장 큰 값이 위치한다
 * 우선순위 큐에서는 가장 큰 값이 우선적으로 처리돼야 할 때 사용된다
 */

/** 최소 힙
 * ! 작거나 같다
 * ! 가장 작은 값이 위치한다
 * ! 가장 작은 값이 우선적으로 처리돼야 할 때
 */

var arr = [6, 3, 8, 2, 10, 5];
var sortedArr = heapSort(arr);
console.log(sortedArr);

function heapSort(arr) {
    // 힙 구성
    function buildHeap(arr) {
        const len = arr.length;
        for (let i = Math.floor(len / 2) - 1; i >= 0; i--) {
            heapify(arr, len, i)
        }
    }
    // 힙 유지
    function heapify(arr, len, idx) {
        let largest = idx;
        const left = 2 * idx + 1;
        const right = 2 * idx + 2;
        if (left < len && arr[left] > arr[largest]) {
            largest = left;
        }
        if (right < len && arr[right] > arr[largest]) {
            largest = right;
        }
        if (largest !== idx) {
            [arr[idx], arr[largest]] = [arr[largest], arr[idx]]
            heapify(arr, len, largest)
        }
    }
    // 힙 정렬
    function sort(arr) {
        const len = arr.length;
        buildHeap(arr);
        for (let i = len - 1; i >= 0; i--) {
            [arr[0], arr[i]] = [arr[i], arr[0]];
            heapify(arr, i, 0)
        }
        return arr;
    }
    return sort(arr)
}

// 기수 정렬

/** 기수 정렬 순서
 * 가장 작은 자릿수부터 가장 큰 자릿수까지 반복하여 비교
 * 각 자릿수를 기준으로 입력 배열을 정렬
 * 각 자릿수별로 정렬된 배열을 합쳐 정렬 완료
 */

function radixSort(arr) {
    const countingSort = (arr, exp) => {
        const output = new Array(arr.length).fill(0);
        const count = new Array(10).fill(0);
        arr.forEach((num) => {
            const digit = Math.floor(num / exp) % 10;
            count[digit]++;
        })
        console.log("count: ", count);
        for (let i = 1; i < count.length; i++) {
            count[i] += count[i - 1]
        }
        console.log("updatedCount: ", count);
        for (let i = arr.length - 1; i >= 0; i--) {
            const digit = Math.floor(arr[i] / exp) % 10;
            output[count[digit] - 1] = arr[i];
            count[digit]--;
        }
        console.log("finalizedCount: ", count);
        output.forEach((num, i) => {
            arr[i] = num
        })
    }
    const max = Math.max(...arr);
    const maxDigit = Math.floor(Math.log10(max) + 1);
    for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
        countingSort(arr, exp)
    }
    return arr;
}

console.clear()
console.log(radixSort([25, 36, 1, 3, 100, 1002, 39, 121]))

/** .sort()
 * 크롬 - TIM SORT
 * 사파리 - MERGE SORT
 */

const items = [
    { key: "봄", value: 10 },
    { key: "여름", value: 30 },
    { key: "가을", value: 70 },
    { key: "겨울", value: 20 },
]

// 오름차순
console.log(items.sort((a, b) => {
    if (a.value > b.value) { // a의 인덱스를 b보다 높여야
        return 1;
    }
    if (a.value < b.value) { // a의 인덱스를 b보다 낮춰야
        return -1;
    }
    // a idx === b idx
    return 0;
}))
