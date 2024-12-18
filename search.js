/** 선형 탐색 알고리즘
 * 방향성을 갖고 하나 하나 조회하여 찾아보는 알고리즘
 */

const dictionary = [
    {
        word: "a",
        mean: "라틴 문자의 첫번째 글자"
    },
]

function findMean(keyword, array) {
    for (let i = 0; i < array.length; i++) {
        if (array[i].word === keyword) return array[i].mean;
    }

    return "단어를 찾지 못했습니다"
}

console.log(findMean("a", dictionary))

// js method - find

const newFindMean = (keyword, array) => {
    const { mean } = array.find(el => el.word === keyword);
    return mean || `${keyword}를 찾지 못했습니다`;
};

console.log(newFindMean("a", dictionary))

// js method - findIndex

const newFindIndexMean = (keyword, array) => {
    const index = array.findIndex(el => el.word === keyword);
    if (index >= 0) return dictionary[index].mean;
    else return `${keyword}를 찾지 못했습니다`
}

console.log(newFindIndexMean("a", dictionary))

if (!Array.prototype.findLast) {
    Array.prototype.findLast = function (callback, thisArg) {
        for (let i = this.length - 1; i >= 0; i--) {
            if (callback.call(thisArg, this[i], i, this)) {
                return this[i];
            }
        }
        return undefined;
    };
}

// js method - findLast || findLastIndex

// const newFindLastMean = (keyword, array) => {
//     const { mean } = array.findLast(el => el.word === keyword);
//     return mean || `${keyword}를 찾지 못했습니다`;
// }

// console.log(newFindLastMean("a"), dictionary);

const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

if (data.includes(7)) console.log("해당 데이터는 7을 포함합니다")
if (data.some(el => el > 3)) console.log("해당 데이터에 3보다 큰 수가 있습니다")
console.log(data.filter(el => el > 7))

/** 이진 탐색
 * 전체 배열의 중간 인덱스의 원소와 검색값을 비교
 * 검색값이 배열의 좌우 한 곳에 포함되면 다시 1단계를 반복
 * 이미 정렬된 상태여야 이진 탐색이 가능
 */

// 숫자를 찾을 때 사용하는 고전적인 알고리즘
function binarySearch(array, target) {
    let left = 0;
    let right = array.length - 1;

    while (left <= right) {
        let mid = Math.floor((left + right) / 2); // 중간 인덱스

        if (array[mid] === target) return mid;
        else if (array[mid] < target) left = mid + 1;
        else right = mid - 1;
    }

    return -1;
}

console.log(binarySearch(data, 8)); // 7 - 7번째 index에 위치

/** 깊이 우선 탐색(DFS)
 * 
 */

let maze = [
    ["S", 0, 1, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1],
    [0, 0, 0, 0, "E"],
    [1, 1, 1, 0, 1]
]

function dfs(maze, position = [0, 0], path = []) {
    let [x, y] = position;
    if (maze[x][y] === "E") return [...path, position] // 이동 경로, 탈출 포지션 반환

    let directions = [
        [0, 1],
        [0, -1],
        [1, 0],
        [-1, 0]
    ]; // 상, 하, 좌, 우로만 이동

    for (let [dx, dy] of directions) {
        let newX = x + dx,
            newY = y + dy;

        if ( // 벽이 아닌 위치로 이동하는 것을 방지
            newX >= 0 &&
            newX < maze[0].length &&
            newY >= 0 &&
            newY < maze[0].length &&
            (maze[newX][newY] === 0 || maze[newX][newY] === "E")
        ) {
            maze[x][y] = 1; // 방문한 곳을 벽으로 처리
            let result = dfs(maze, [newX, newY], [...path, position]);
            if (result) return result;
        }
    }

    return null;
}

/** 너비 우선 탐색(BFS)
 * 가까운 곳부터 탐색하여 범위를 넓히는 탐색 기법
 */

const graph0 = {
    A: ["B", "C"],
    B: ["C", "D"],
    C: ["D", "E", "F"],
    D: ["B"],
    E: ["C", "G"],
    F: ["C", "E"],
    G: ["E", "H"],
    H: ["G"]
};

/*
function bfs(graph0, startNode) {
    const visited = {}; // 방문 정점 저장 객체
    const quene = []; // 탐색 정점 저장 큐

    visited[startNode] = true; // 시작 정점을 방문 처리
    quene.push(startNode); // 시작 정점을 큐에 추가

    while (quene.length > 0) {
        const node = quene.shift(); // 큐에서 정점을 하나씩 추출

        console.log(node);

        const adjacentNodes = graph[node];
        for (let i = 0; i < adjacentNodes.length; i++) {
            const adjacentNode = adjacentNodes[i];
            if (!visited[adjacentNode]) {
                visited[adjacentNode] = true;
                quene.push(adjacentNode);
            }
        }
    }
}
*/

console.clear();

function bfs(graph, startNode, targetNode) {
    const visited = {}; // 방문 정점 저장 객체
    const quene = []; // 탐색 정점 저장 큐
    const distances = {};

    visited[startNode] = true; // 시작 정점을 방문 처리
    quene.push(startNode); // 시작 정점을 큐에 추가
    distances[startNode] = 0;

    while (quene.length > 0) {
        const node = quene.shift(); // 큐에서 정점을 하나씩 추출

        console.log(`Visiting node: ${node}, Distance: ${distances[node]}`)

        if (node === targetNode) {
            return distances[node]
        }

        const adjacentNodes = graph[node];
        for (let i = 0; i < adjacentNodes.length; i++) {
            const adjacentNode = adjacentNodes[i];
            if (!visited[adjacentNode]) {
                visited[adjacentNode] = true;
                quene.push(adjacentNode);
                distances[adjacentNode] = distances[node] + 1;
            }
        }
    }

    return null;
}

bfs(graph0, "A", "H");

/** 최소 신장 트리
 * 간선을 위한 알고리즘, 네트워크나 전력망 등에 사용
 * 실생활 예시: 전기를 어떤 경로로 보내면 저렴할까?
 * 대표 알고리즘: 프림(PRIM) 크루스칼(KRUSKAL) 알고리즘
 */

// 최소화된 간선 가중치를 구하는 것
const graph1 = [ // 가중치 0이란? - graph[0][2] === 0, 간선이 없다
    [0, 2, 0, 6, 0],
    [2, 0, 3, 8, 5],
    [0, 3, 0, 0, 7],
    [6, 8, 0, 0, 9],
    [0, 5, 7, 9, 0]
]

console.log(primMst(graph1));

function primMst(graph) {
    const parent = []; // 각 노드의 부모노드를 저장
    const key = [];
    const visited = [];
    const { length } = graph;

    for (let i = 0; i < length; i++) {
        key[i] = Infinity; // 최소 간선 가중치를 저장해두는 배열
        visited[i] = false; // 이미 방문했는지 여부
    }

    key[0] = 0;
    parent[0] = -1;

    for (let count = 0; count < length - 1; count++) {
        let u = minKey(key, visited); // u: 노드 x에 대한 기준
        visited[u] = true;
        for (let v = 0; v < length; v++) {
            if (graph[u][v] && visited[v] === false && graph[u][v] < key[v]) {
                parent[v] = u;
                key[v] = graph[u][v]
            }
        }
    }

    return parent;
}

function minKey(key, visited) {
    let min = Infinity;
    let minIndex;
    for (let v = 0; v < key.length; v++) {
        if (visited[v] === false && key[v] < min) {
            min = key[v];
            minIndex = v;
        }
    }
    return minIndex;
}