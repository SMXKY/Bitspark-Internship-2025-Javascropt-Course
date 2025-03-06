const courses = JSON.parse(localStorage.getItem("courses")) || [];

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

  //Alerting the user that the course has been successfully created
  alert("Course Was Successfully created");

  renderCoursesTable();
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
                <input type="number" placeholder="enter mark" class="js-course-mark-input" data-courseId=${course.id}/>
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
                <input type="number" placeholder="enter mark" class="js-course-mark-input" data-courseId=${course.id}/>
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

function renderCoursesTable() {
  //redering the courses created, if there are no courses we render a default paragraph

  if (courses.length > 0) {
    document.querySelector(".js-courses-table").innerHTML =
      generateCourseHtml(courses);
  } else {
    document.querySelector(
      ".js-courses-table"
    ).innerHTML = `<p class="no-courses-yet">No courses created yet...</p>`;
  }

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
      console.log(courseToEditId);
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

  const editCourseFormValidation = (courseName, courseCreditValue) => {
    //using if statements to catcht the erros
    //!courseName will return true if no value is assign to the variable courseName
    if (!courseName) {
      //Pushing a string into the array that explains the error to the user
      createCourseErrors.push("Course Name is required");
    } else if (!courseCreditValue) {
      createCourseErrors.push("Course credit value is required");
    } else if (courseCreditValue < 1) {
      createCourseErrors.push("Course credit value must be greater than 0");
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

    //Alerting the user that the course has been successfully edited
  };

  editCourseBtn.addEventListener("click", (e) => {
    handleCourseEdit(e);
    alert("Course Was Successfully Edited");
  });

  editCourseNameInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      handleCourseEdit(e);
      alert("Course Was Successfully Edited");
    }
  });

  editCourseCreditValueInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      handleCourseEdit(e);
      alert("Course Was Successfully Edited");
    }
  });

  //Deleting a course

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

    //Alerting the user that the course has been successfully deleted
    alert(`Course: ${courseName} Was Successfully Deleted`);
  });

  //submitng marks

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
        alert("course mark cannot be less 0 or greater than 100");
        input.value = 0;
      }

      let allMarksAvailable = false;
    });
  });
}

renderCoursesTable();
