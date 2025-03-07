import { courses } from "../data.js";

//Calculating GPA
export function assigningCourseGradesAndGPA() {
  courses.forEach((course) => {
    if (course.mark >= 80) {
      course.grade = "A";
      course.gpa = 4.0;
    } else if (course.mark >= 70) {
      course.grade = "B+";
      course.gpa = 3.5;
    } else if (course.mark >= 60) {
      course.grade = "B";
      course.gpa = 3;
    } else if (course.mark >= 55) {
      course.grade = "C+";
      course.gpa = 2.5;
    } else if (course.mark >= 50) {
      course.grade = "C";
      course.gpa = 2.0;
    } else if (course.mark >= 45) {
      course.grade = "D+";
      course.gpa = 1.5;
    } else if (course.mark >= 40) {
      course.grade = "D";
      course.gpa = 1.0;
    } else if (course.mark < 40) {
      course.grade = "F";
      course.gpa = 0.0;
    }
  });
}

export function calculateGPA() {
  let gpaCV = 0;
  let sumOfCreditValues = 0;

  courses.forEach((course) => {
    gpaCV += course.creditValue * course.gpa;
    sumOfCreditValues += course.creditValue;
  });

  return sumOfCreditValues > 0
    ? (gpaCV / sumOfCreditValues).toFixed(2)
    : "0.00";
}
