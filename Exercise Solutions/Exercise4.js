//Write a program that collects the user's date of birth, calculates their age, and then displays **"Happy Birthday!"** as many times as their age.

const yearOfBirth = Number(prompt("What year where you born?"));
const age = 2025 - yearOfBirth;

for (let i = 0; i < age; i++) {
  console.log("Happy birthday!");
}
