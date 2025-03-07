import { courses } from "../data.js";
import { alertMessage } from "../alertMessage.js";

//Form Validations
//create and array to store all errrors the user might make

//Create course form validation.
export const createCourseFormValidation = (courseName, courseCreditValue) => {
  let createCourseErrors = [];
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
    alertMessage(createCourseErrors[0], "error");

    //assigning an emptyy array back to the create course errors array
    createCourseErrors = [];
    return true;
  }

  return false;
};
