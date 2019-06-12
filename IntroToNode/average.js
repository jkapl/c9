function average (arr) {
    return Math.round((arr.reduce(function (acc, curVal) {
        return (acc + curVal);
    }))/arr.length);
}

console.log(average([1,2,3]));
console.log(average([90,98,89,100,100,86,94]));
