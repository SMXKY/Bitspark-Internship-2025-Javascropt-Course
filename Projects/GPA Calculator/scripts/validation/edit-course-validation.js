import { alertMessage } from "../alertMessage.js";

export const editCourseFormValidation = (courseName, courseCreditValue) => {
  const editCourseErrors = [];
  //using if statements to catcht the erros
  //!courseName will return true if no value is assign to the variable courseName
  if (!courseName) {
    //Pushing a string into the array that explains the error to the user
    editCourseErrors.push("Course Name is required");
  } else if (!courseCreditValue) {
    editCourseErrors.push("Course credit value is required");
  } else if (courseCreditValue < 1) {
    editCourseErrors.push("Course credit value must be greater than 0");
  }

  if (editCourseErrors.length > 0) {
    //sending a message to the user with the error
    alertMessage(editCourseErrors[0], "error");

    //assigning an emptyy array back to the create course errors array
    editCourseErrors = [];
    return true;
  }

  return false;
};
