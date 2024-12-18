/** DP(동적 프로그래밍)
 * 하나의 문제를 여러 개의 작은 문제로 나누어 해결
 * 결과를 저장해서 더 큰 문제를 해결
 * 문제 해결에 대한 방법론이라 보는 관점도 있다
 * 피보나치 수열이 대표적 예시
 */

function fibonacciRecursive(n) {
    if (n <= 1) return n;
    return fibonacciRecursive(n - 1) + fibonacciRecursive(n - 2)
}

let n = 17;
console.log(fibonacciRecursive(n)) // 시간복잡도 O(2^n - 1)

function fibonacci(n) {
    const fibValues = [0, 1];
    for (let i = 2; i <= n; i++) {
        fibValues[i] = fibValues[i - 1] + fibValues[i - 2]
    }
    return fibValues[n] // 공간 복잡도, 메모리 차지
}

n = 100;
const fibonacci100 = fibonacci(n);
console.log(`피보나치 수열 ${n}번째 값: ${fibonacci100}`);

