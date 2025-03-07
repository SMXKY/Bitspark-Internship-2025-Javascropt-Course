import { createCourseFormValidation } from "../validation/create-course-validation.js";
import { marksInformation } from "../data.js";
import { Course } from "../data.js";
import { courses } from "../data.js";
import { alertMessage } from "../alertMessage.js";
import { renderCoursesTable } from "../rendering/courses.js";

export const createCourse = () => {
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

  const handleCreateCourse = (e) => {
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

    //Permenently storing our courses when we create them
    localStorage.setItem("courses", JSON.stringify(courses));

    //alertMessageing the user that the course has been successfully created
    alertMessage("Course Was Successfully created", "success");

    renderCoursesTable();

    document
      .querySelector(".js-calculate-gpa-btn-holder")
      .classList.add("form-not-filled-btn");

    marksInformation.allMarksAvailable = true;
  };

  createCourseBtn.addEventListener("click", (e) => {
    handleCreateCourse(e);
  });
  courseNameInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      handleCreateCourse(e);
    }
  });
  courseCreditValueInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      handleCreateCourse(e);
    }
  });
};
