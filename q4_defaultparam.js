function addToList(item, list = []) {
  list.push(item);
  return list;
}

let a = addToList(1);
let b = addToList(2);
console.log(a, b);
