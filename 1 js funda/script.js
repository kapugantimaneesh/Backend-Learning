//

var arr = [1, 2, 3, 4, 5, 6];
arr.push(5);
console.log(arr);

arr.forEach(function (arr) {
  console.log(arr);
});
var x = arr.map(function (val) {
  return val + 10;
});
console.log(x);
var y = arr.filter(function (val) {
  if (val > 3) {
    return val;
  }
});
console.log(y);
var ans = arr.find(function (val) {
  if (val == 2) {
    return val;
  }
});
console.log(ans);
console.log(arr.indexOf(12));
console.log(arr.indexOf(1));

//

var a = {
  name: "harsh",
  age: 12,
};
console.log(a.name);
console.log(a["name"]);

//

console.log(arr.length);
console.log(typeof arr);

//

async function abcd() {
  var blob = await fetch(`https://randomuser.me/api/`);
  var res = await blob.json();
  console.log(res.results[0].name);
}
abcd();
