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
    alertMessage(createCourseErrors[0], "error");

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

  //alertMessageing the user that the course has been successfully created
  alertMessage("Course Was Successfully created", "success");

  renderCoursesTable();

  document
    .querySelector(".js-calculate-gpa-btn-holder")
    .classList.add("form-not-filled-btn");
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
      alertMessage(createCourseErrors[0], "error");

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

    //alertMessageing the user that the course has been successfully deleted
    alertMessage(`Course: ${courseName} Was Successfully Deleted`, "success");
  });

  //submitng marks

  //Doing validation for inputing marks
  let allMarksAvailable = false;

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
          allMarksAvailable = false;
        } else {
          allMarksAvailable = true;
        }
      });

      if (allMarksAvailable) {
        document
          .querySelector(".js-calculate-gpa-btn-holder")
          .classList.remove("form-not-filled-btn");
      } else {
        document
          .querySelector(".js-calculate-gpa-btn-holder")
          .classList.add("form-not-filled-btn");
      }
    });
  });

  // Storing the marks in our course objects
  const calculateGPABtn = document.querySelector(".js-calculate-gpa-btn");

  calculateGPABtn.addEventListener("click", () => {
    if (!allMarksAvailable) {
      alertMessage(
        "Please fill in marks for every course before you can callculate your GPA.",
        "error"
      );

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

    localStorage.setItem("courses", JSON.stringify(courses));
  });
}

//Reseting marks back to 0

document.querySelector(".js-reset-marks-btn").addEventListener("click", (e) => {
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

renderCoursesTable();

//custom alert
const alertHolder = document.querySelector(".js-alert-holder");
const alertIconHolder = document.querySelector(".js-alert-icon-holder");
const alertImage = document.querySelector(".js-alert-img");
const alertMessageText = document.querySelector(".js-alert-message");
const closeAlertBtn = document.querySelector(".js-close-alert-btn");
const closeAlertBtnIcon = document.querySelector(".js-close-alert-btn-icon");

const fullAlertHolder = document.querySelector(".js-full-alert-holder");
let alertTimeoutId;

function alertMessage(message, type) {
  const closeImg = `./images-and-icons/Close-${type}.png`;

  const specifics = {
    img: "",
    holderClass: "",
    iconHolcderClass: "",
    closeButtonClass: "",
  };

  if (type === "error") {
    specifics.img = `./images-and-icons/error-icon.png`;
  } else if (type === "success") {
    specifics.img = `./images-and-icons/success-icon.png`;
  }

  specifics.holderClass = `${type}-holder`;
  specifics.iconHolcderClass = `${type}-icon-holder`;
  specifics.closeButtonClass = `${type}-close-btn`;

  alertHolder.classList.add(specifics.holderClass);
  alertIconHolder.classList.add(specifics.iconHolcderClass);
  alertImage.src = specifics.img;
  alertMessageText.innerHTML = message;
  closeAlertBtn.classList.add(specifics.closeButtonClass);
  closeAlertBtnIcon.src = closeImg;
  fullAlertHolder.classList.add("show-alert");

  alertTimeoutId = setTimeout(() => {
    fullAlertHolder.classList.remove("show-alert");
    clearTimeout(alertTimeoutId);
  }, 4000);
}

closeAlertBtn.addEventListener("click", () => {
  fullAlertHolder.classList.remove("show-alert");
  clearTimeout(alertTimeoutId);
});
