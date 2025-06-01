function getValue() {
  return new Promise(resolve => setTimeout(() => resolve("done!"), 1000));
}

async function main() {
  console.log("Start");
  let result = await getValue(); // Waits for the promise
  console.log(result);           // "done!"
  console.log("End");
}
main();
