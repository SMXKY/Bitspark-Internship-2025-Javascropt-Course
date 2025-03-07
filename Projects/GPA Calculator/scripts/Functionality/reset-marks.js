import { courses } from "../data.js";
import { renderCoursesTable } from "../rendering/courses.js";
import { alertMessage } from "../alertMessage.js";
// import { allMarksAvailable } from "../data";

//Reseting marks back to 0

export const resetMarks = () => {
  document
    .querySelector(".js-reset-marks-btn")
    .addEventListener("click", (e) => {
      courses.forEach((course) => {
        course.mark = "";
      });

      localStorage.setItem("courses", JSON.stringify(courses));
      renderCoursesTable();
      document
        .querySelector(".js-calculate-gpa-btn-holder")
        .classList.add("form-not-filled-btn");

      alertMessage("Marks successfully reseted to 0", "success");
    });
};
