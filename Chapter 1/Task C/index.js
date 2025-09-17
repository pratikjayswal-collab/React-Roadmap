let a = [4,5,8,1,9];
let sum = 0;
console.log(getSum(a))

function getSum(a){
    for (let index = 0; index < a.length; index++) {
        sum += a[index]
    }
    return sum
}
