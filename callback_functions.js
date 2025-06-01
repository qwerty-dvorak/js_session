function greet(name) {
  console.log("Hello, " + name + "!");
}

function processUserInput(callback) {
  const name = "Abhinav";
  callback(name);
}

processUserInput(greet); 
