for (let i = 1; i <= 3; i++) {
  setTimeout(function() {
    console.log(i);
  }, 100 * i);
}

for (var j = 1; j <= 3; j++) {
  setTimeout(function() {
    console.log(j);
  }, 100 * j);
}
