import { editCourseFormValidation } from "../validation/edit-course-validation.js";
import { courses } from "../data.js";
import { renderCoursesTable } from "../rendering/courses.js";
import { alertMessage } from "../alertMessage.js";

export const editCourse = () => {
  //Editing Courses

  const editCourseNameInput = document.querySelector(
    ".js-edit-course-name-input"
  );
  const editCourseCreditValueInput = document.querySelector(
    ".js-edit-course-credit-value-input"
  );
  const closeEditCourseFormBtn = document.querySelector(
    ".js-close-edit-course-overlay-btn"
  );
  const editCourseBtn = document.querySelector(
    ".js-edit-course-form-submit-btn"
  );
  let courseToEditId;

  document.querySelectorAll(".js-edit-course-btn").forEach((editBtn) => {
    editBtn.addEventListener("click", (e) => {
      e.preventDefault();

      courseToEditId = Number(editBtn.dataset.courseid);
      //   console.log(courseToEditId);
      const course = courses.find((course) => course.id === courseToEditId);

      editCourseNameInput.value = course.name;
      editCourseCreditValueInput.value = course.creditValue;

      document
        .querySelector(".js-pop-up-overlay-edit-course")
        .classList.remove("hide-overlay");
    });
  });

  closeEditCourseFormBtn.addEventListener("click", (e) => {
    e.preventDefault();
    document
      .querySelector(".js-pop-up-overlay-edit-course")
      .classList.add("hide-overlay");
  });

  const handleCourseEdit = (e) => {
    e.preventDefault();
    // collecting user inputs with the .value property

    const courseName = editCourseNameInput.value.trim();
    const courseCreditValue = Number(editCourseCreditValueInput.value);

    if (editCourseFormValidation(courseName, courseCreditValue)) {
      return;
    }

    //Editing the course

    courses.forEach((course) => {
      if (course.id === courseToEditId) {
        course.name = courseName;
        course.creditValue = courseCreditValue;
      }
    });

    renderCoursesTable();
    document
      .querySelector(".js-pop-up-overlay-edit-course")
      .classList.add("hide-overlay");

    //Permenently storing our courses when we create them
    localStorage.setItem("courses", JSON.stringify(courses));

    //alertMessageing the user that the course has been successfully edited
  };

  editCourseBtn.addEventListener("click", (e) => {
    handleCourseEdit(e);
    alertMessage("Course Was Successfully Edited", "success");
  });

  editCourseNameInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      handleCourseEdit(e);
      alertMessage("Course Was Successfully Edited", "success");
    }
  });

  editCourseCreditValueInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      handleCourseEdit(e);
      alertMessage("Course Was Successfully Edited", "success");
    }
  });
};
