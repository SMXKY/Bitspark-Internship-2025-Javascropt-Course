// 1. Write a program that allows a user to store books in a library.

// **Instructions:**

// - Create a class that represents a Book. Each book should have:
//   - A title
//   - An author
//   - A release year
// - Allow the user to create as many books as they want.
// - After the user enters the details for a book, ask if they want to end the process or continue. If they choose to end the process, stop asking for more books; otherwise, allow them to create another book.
// - Store all the books in an array.
// - At the end of the process, log the array to the console so that the user can see all the books created.

const books = [];

class Book {
  constructor(title, author, releaseYear) {
    this.title = title;
    this.author = author;
    this.releaseYear = releaseYear;
  }
}

let isOnline = true;

console.log("Welcome to the book storage app.");

while (isOnline) {
  const title = prompt("Enter the book title.");
  const author = prompt("Enter the book author's name.");
  const releaseYear = Number(prompt("Enter the release year of the book."));

  const newBook = new Book(title, author, releaseYear);

  books.push(newBook);

  const option = prompt("Do you want to continue adding books?");

  if (option === "no") {
    isOnline = false;
  }
}

console.log("All the books you created.");
console.log(books);
console.log("Thank you for using our app.");
