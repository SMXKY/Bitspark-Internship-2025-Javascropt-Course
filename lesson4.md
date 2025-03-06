# Lesson 4: Redring HTML from an Array

## Traversing an Array

Traversing an array means going through each item in the array one by one. Think of an array like a line of boxes. When you traverse it, you open each box one after the other to see what's inside.

Say we have an array of numbers like below and we want to log (or show) each number in our console:

```js
const numbers = [1, 2, 3, 4, 5];
```

There are two common ways to do this:

1. Using a `for` loop

The `for` loop works by creating a counter variable (often called `i`) that starts at 0. This counter tells the loop which box (or array element) to look at. The loop then continues until it has gone through all the boxes. For example:

```js
const numbers = [1, 2, 3, 4, 5];

for (let i = 0; i < numbers.length; i++) {
  console.log(numbers[i]); // logs each number one by one
}
```

2. Using a `forEach` loop

The `forEach` loop is like giving each item in the array a task to complete. Instead of manually counting through the array, you simply say, “For each item in this array, do this action.” In our case, the action is to log the number to the console. Here's how it works:

```js
const numbers = [1, 2, 3, 4, 5];

numbers.forEach((number) => {
  console.log(number); // logs each number one by one
});
```

**Breaking down the `forEach` loop in layman terms:**

- Imagine you have a basket of apples (the array).
- You ask a helper, “For each apple in this basket, please show me its number.”
- The helper takes each apple one by one and shows you its number.
- You don’t need to worry about how many apples there are or what the index is—the helper handles that for you.

This makes `forEach` very usefull when you just want to perform an action on every item in an array.

Below is the revised Markdown file with the explanation in layman terms, along with corrections for spelling and grammar:

## The Accumulator Pattern

Let's say we want to add up all the numbers in an array. One way to do this is by using a method called the accumulator pattern. This pattern works by starting with an initial value (usually 0) and then adding each number in the array to that value, one by one.

For example:

```js
const numbers = [1, 2, 3, 4, 5];

let sum = 0;

numbers.forEach((number) => {
  // This is the same as writing: sum = sum + number
  sum += number;
});
```

In simple terms, imagine you have an empty jar (with a starting value of 0). Each time you pick a number from the array (like picking an apple), you put it into the jar by adding it to what's already there. By the end of the process, your jar holds the total sum of all the numbers. This is what programmers refer to as the accumulator pattern.

## Project Work

In our project let us now write a function to render all the course created by a user anytime a new course is created.

1. in the `main.js` file crates a function that takes the `courses` array as input

   ```js
   function renderCourses(courses) {}
   ```
