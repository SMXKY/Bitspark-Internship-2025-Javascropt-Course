import { alertMessage } from "../alertMessage.js";
import { marksInformation } from "../data.js";
import { courses } from "../data.js";
import { assigningCourseGradesAndGPA } from "./calculating-grades-and-gpa.js";

export const submitMarks = () => {
  //submitng marks

  //Doing validation for inputing marks

  document.querySelectorAll(".js-course-mark-input").forEach((input) => {
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
      }
    });

    input.addEventListener("input", () => {
      //Doing some validaiton
      const mark = Number(input.value);

      if (mark < 0 || mark > 100) {
        alertMessage(
          "course mark cannot be less 0 or greater than 100",
          "error"
        );
        input.value = "00";
      }

      document.querySelectorAll(".js-course-mark-input").forEach((inputs) => {
        if (!inputs.value || inputs.value === "00") {
          marksInformation.allMarksAvailable = false;
        }
      });

      if (marksInformation.allMarksAvailable) {
        document
          .querySelector(".js-calculate-gpa-btn-holder")
          .classList.remove("form-not-filled-btn");
      } else {
        document
          .querySelector(".js-calculate-gpa-btn-holder")
          .classList.add("form-not-filled-btn");
        marksInformation.allMarksAvailable = true;
      }
    });
  });

  // Storing the marks in our course objects
  const calculateGPABtn = document.querySelector(".js-calculate-gpa-btn");

  calculateGPABtn.addEventListener("click", () => {
    document.querySelectorAll(".js-course-mark-input").forEach((inputs) => {
      if (!inputs.value || inputs.value === "00") {
        marksInformation.allMarksAvailable = false;
      }
    });

    if (!marksInformation.allMarksAvailable) {
      alertMessage(
        "Please fill in marks for every course before you can callculate your GPA.",
        "error"
      );

      marksInformation.allMarksAvailable = true;

      return;
    }

    document.querySelectorAll(".js-course-mark-input").forEach((input) => {
      const inputId = Number(input.dataset.courseid);
      courses.forEach((course) => {
        if (course.id === inputId) {
          course.mark = Number(input.value);
        }
      });
    });

    assigningCourseGradesAndGPA();

    localStorage.setItem("courses", JSON.stringify(courses));

    window.location = "/results.html";
  });

  document.querySelectorAll(".js-course-mark-input").forEach((input) => {
    if (!input.value || input.value === "00") {
      marksInformation.allMarksAvailable = false;
    }
  });

  if (!document.querySelectorAll(".js-course-mark-input").length) {
    marksInformation.allMarksAvailable = false;
  }

  if (marksInformation.allMarksAvailable) {
    document
      .querySelector(".js-calculate-gpa-btn-holder")
      .classList.remove("form-not-filled-btn");
  } else {
    document
      .querySelector(".js-calculate-gpa-btn-holder")
      .classList.add("form-not-filled-btn");
  }
};
