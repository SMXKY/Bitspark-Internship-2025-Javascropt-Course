import { createCourse } from "./crud-operations/create-course.js";
import { resetMarks } from "./Functionality/reset-marks.js";
import { renderCoursesTable } from "./rendering/courses.js";

createCourse();
renderCoursesTable();
resetMarks();
