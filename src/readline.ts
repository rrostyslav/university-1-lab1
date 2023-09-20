import readline from "node:readline/promises";

export default readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});