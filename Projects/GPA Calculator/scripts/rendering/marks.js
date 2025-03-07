import { courses } from "../data.js";
import { calculateGPA } from "../Functionality/calculating-grades-and-gpa.js";

export function renderResultsHTML() {
  document.addEventListener("DOMContentLoaded", () => {
    const marksTable = document.querySelector(".js-marks-tables-result");
    const gradeSummaryText = document.querySelector(".js-summary-grades");
    const finalGpa = document.querySelector(".js-finally-gpa");
    const summaryGpa = document.querySelector(".js-summary-gpa");
    let resultHTML = "";

    const summary = {
      a: 0,
      bp: 0,
      b: 0,
      cp: 0,
      c: 0,
      dp: 0,
      d: 0,
      f: 0,
    };

    courses.forEach((course) => {
      resultHTML += `
        <div class="marks-table-entry">
          <p>${course.name}</p>
          <p>${course.grade}</p>
          <p>${course.gpa.toFixed(1)}</p>
        </div>
      `;

      if (course.grade === "A") {
        summary.a++;
      } else if (course.grade === "B+") {
        summary.bp++;
      } else if (course.grade === "B") {
        summary.b++;
      } else if (course.grade === "C+") {
        summary.cp++;
      } else if (course.grade === "C") {
        summary.c++;
      } else if (course.grade === "D+") {
        summary.dp++;
      } else if (course.grade === "D") {
        summary.d++;
      } else if (course.grade === "F") {
        summary.f++;
      }
    });

    marksTable.innerHTML = resultHTML;
    gradeSummaryText.innerHTML = `A = ${summary.a}, B+=${summary.bp}, B=${summary.b}, C+ = ${summary.cp}, C= ${summary.c}, D+ =${summary.dp}, D=${summary.d}, F=${summary.f}`;
    finalGpa.innerHTML = `${calculateGPA()}`;
    summaryGpa.innerHTML = `${calculateGPA()}`;
  });

  const printMarksBtn = document.querySelector(".js-print-marks-btn");

  printMarksBtn.addEventListener("click", () => {
    window.print();
  });
}

renderResultsHTML();
