// Write a program that does the following:

// 1. Ask the user for two values.
// 2. Ask the user for a mathematical operation (addition, subtraction, division, or multiplication).
// 3. Create a function that takes these two input values as parameters.
// 4. The function should return:
//    - The sum of the numbers for addition.
//    - The product of the numbers for multiplication.
//    - The result of the first number divided by the second for division.
//    - The difference of the first number minus the second for subtraction.

// At the end, print the result of the operation to the console.

const calculator = (value1, value2, option) => {
  if (option === "+") {
    return value1 + value2;
  } else if (option === "*") {
    return value1 * value2;
  } else if (option === "-") {
    return value1 - value2;
  } else if (option === "/") {
    return value1 / value2;
  } else {
    console.log("Invalid option selected chose and option in : +, -, *, /");
  }
};

const userValue1 = Number(prompt("Enter the first number."));
const userValue2 = Number(prompt("Enter the second value."));
const userOption = prompt("Enter an operation to be done.");

const solution = calculator(userValue1, userValue2, userOption);

console.log(`Solution: ${solution}`);
