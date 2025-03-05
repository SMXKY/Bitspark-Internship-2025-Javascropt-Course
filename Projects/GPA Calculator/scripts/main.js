const courses = [];

class Course {
  constructor(name, creditValue, mark) {
    this.name = name;
    this.creditValue = creditValue;
    this.mark = mark;

    //We do this feature in constructor as contructor is called when the object created

    //the .length property is a property of arrays that gives us the number of elmments in that array
    if (courses.length === 0) {
      //if no element is in the array that will mean the object we are craating is the first course, so we give it an id of 0.
      this.id = 0;
    } else {
      //we access the last element in the array by geting the number of elemnts in that array-1, which will always give us the position of the last elment in the array.
      //We then access the id property of that element and increase it by 1, to create the id of the new course
      this.id = courses[courses.length - 1].id + 1;
    }

    //We then add the object beeing created to the array hoding our courses
    courses.push(this);
  }
}

//display popup form

//Getting the elments we need for displaying our pop up form
const addCourseBtn = document.querySelector(".js-add-course-btn");
const popUpOverlay = document.querySelector(".js-pop-up-overlay");
const closeOverlayBtn = document.querySelector(".js-close-overlay-btn");

addCourseBtn.addEventListener("click", () => {
  popUpOverlay.classList.remove("hide-overlay");
});

closeOverlayBtn.addEventListener("click", (e) => {
  e.preventDefault();
  popUpOverlay.classList.add("hide-overlay");
});

// Storing the courses created in our courses array

const createCourseBtn = document.querySelector(".js-create-course-btn");
const courseNameInput = document.querySelector(".js-create-course-input");
const courseCreditValueInput = document.querySelector(
  ".js-course-credit-value-input"
);

//Form Validations
//create and array to store all errrors the user might make
let createCourseErrors = [];
//Create course form validation.
const createCourseFormValidation = (courseName, courseCreditValue) => {
  //using if statements to catcht the erros
  //!courseName will return true if no value is assign to the variable courseName
  if (!courseName) {
    //Pushing a string into the array that explains the error to the user
    createCourseErrors.push("Course Name is required");
  } else if (!courseCreditValue) {
    createCourseErrors.push("Course credit value is required");
  } else if (courseCreditValue < 1) {
    createCourseErrors.push("Course credit value must be greater than 0");
  } else if (courses.find((course) => course.name === courseName)) {
    createCourseErrors.push(
      "There course you are trying to create already exist!."
    );
  }
  if (createCourseErrors.length > 0) {
    //sending a message to the user with the error
    alert(createCourseErrors[0]);

    //assigning an emptyy array back to the create course errors array
    createCourseErrors = [];
    return true;
  }

  return false;
};

createCourseBtn.addEventListener("click", (e) => {
  //using the prevent default method on the click event
  e.preventDefault();

  // collecting user inputs with the .value property

  const courseName = courseNameInput.value.trim();
  const courseCreditValue = Number(courseCreditValueInput.value);

  if (createCourseFormValidation(courseName, courseCreditValue)) {
    return;
  }

  const newCourse = new Course(courseName, courseCreditValue);

  courseNameInput.value = "";
  courseCreditValueInput.value = "";

  console.log(courses);
});
