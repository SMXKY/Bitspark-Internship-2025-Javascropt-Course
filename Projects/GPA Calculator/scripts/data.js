export const courses = JSON.parse(localStorage.getItem("courses")) || [];

export class Course {
  constructor(name, creditValue, mark, grade, gpa) {
    this.name = name;
    this.creditValue = creditValue;
    this.mark = mark;
    this.grade = grade;
    this.gpa = gpa;

    //modification

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

export let marksInformation = {
  allMarksAvailable: true,
};
