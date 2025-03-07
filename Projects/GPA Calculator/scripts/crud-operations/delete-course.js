import { courses } from "../data.js";
import { renderCoursesTable } from "../rendering/courses.js";
import { alertMessage } from "../alertMessage.js";

export const deleteCourse = () => {
  //Deleting a course Functionality

  const closeDeleteCourseFormBtn = document.querySelector(
    ".js-close-delete-course-form"
  );
  const deleteCourseBtn = document.querySelector(".js-delete-course-form-btn");

  let courseToDeleteId;
  document.querySelectorAll(".js-delete-course-btn").forEach((deleteBtn) => {
    deleteBtn.addEventListener("click", (e) => {
      e.preventDefault();

      document
        .querySelector(".js-pop-up-overlay-delete-course")
        .classList.remove("hide-overlay");

      courseToDeleteId = Number(deleteBtn.dataset.courseid);
    });
  });

  closeDeleteCourseFormBtn.addEventListener("click", (e) => {
    e.preventDefault();
    document
      .querySelector(".js-pop-up-overlay-delete-course")
      .classList.add("hide-overlay");
  });

  deleteCourseBtn.addEventListener("click", (e) => {
    e.preventDefault();

    let courseName = "";

    courses.forEach((course, index) => {
      if (course.id === courseToDeleteId) {
        courseName = course.name;
        courses.splice(index, 1);
      }
    });

    renderCoursesTable();
    document
      .querySelector(".js-pop-up-overlay-delete-course")
      .classList.add("hide-overlay");

    //Permenently storing our courses when we create them
    localStorage.setItem("courses", JSON.stringify(courses));

    //alertMessageing the user that the course has been successfully deleted
    alertMessage(`Course: ${courseName} Was Successfully Deleted`, "success");
  });
};
