import { deleteCourse } from "../crud-operations/delete-course.js";
import { editCourse } from "../crud-operations/eidt-course.js";
import { submitMarks } from "../Functionality/submit-marks.js";
import { courses } from "../data.js";

function generateCourseHtml(courses) {
  //From the acculator pattern we set our intial value to 0, but here an empty string
  let allCoursesHtml = "";

  courses.forEach((course, index) => {
    //the index input returns the position of the course, in the courses array
    //We use an if statement to vary the class or styles for each course we display

    let courseHtml = "";

    if (index % 2 === 0) {
      //deciding the html for each course
      courseHtml = `
              <div class="course-table-entry course-table-gray">
                <p>${course.name}</p>
  
                <div class="table-course-cv-holder">
                  <p>${course.creditValue}</p>
                </div>
  
                <div class="table-course-options">
                  <input type="number" placeholder="enter mark" class="js-course-mark-input" data-courseId=${course.id} value="${course.mark}"/>
                  <button  type="button" class="option-btn js-edit-course-btn" data-courseId=${course.id}>
                    <img
                      src="./images-and-icons/Edit.png"
                      alt="edit-icon"
                      class="options-btn"
                    />
                  </button>
  
                  <button  type="button" class="option-btn js-delete-course-btn" data-courseId=${course.id}>
                    <img
                      src="./images-and-icons/Trash.png"
                      alt="delete-icon"
                      class="options-btn"
                    />
                  </button>
                </div>
              </div>
        `;
    } else {
      courseHtml = `
            <div class="course-table-entry course-table-white">
                <p>${course.name}</p>
  
                <div class="table-course-cv-holder">
                  <p>${course.creditValue}</p>
                </div>
  
                <div class="table-course-options">
                  <input type="number" placeholder="enter mark" class="js-course-mark-input" data-courseId=${course.id} value="${course.mark}"/>
                  <button  type="button" class="option-btn js-edit-course-btn" data-courseId=${course.id}>
                    <img
                      src="./images-and-icons/Edit.png"
                      alt="edit-icon"
                      class="options-btn"
                    />
                  </button>
  
                  <button  type="button" class="option-btn js-delete-course-btn" data-courseId=${course.id}>
                    <img
                      src="./images-and-icons/Trash.png"
                      alt="delete-icon"
                      class="options-btn"
                    />
                  </button>
                </div>
              </div>
        `;
    }

    allCoursesHtml += courseHtml;
  });

  return allCoursesHtml;
}

export function renderCoursesTable() {
  //redering the courses from the course array, if there are no courses we render a default paragraph

  if (courses.length > 0) {
    document.querySelector(".js-courses-table").innerHTML =
      generateCourseHtml(courses);
  } else {
    document.querySelector(
      ".js-courses-table"
    ).innerHTML = `<p class="no-courses-yet">No courses created yet...</p>`;
  }

  //Edit course functionality
  editCourse();

  //delete course functionality
  deleteCourse();

  //Submit marks functionality
  submitMarks();
}
