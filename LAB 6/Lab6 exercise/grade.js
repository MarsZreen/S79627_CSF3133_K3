/*
Error 1 (grade.html, Line 10): onsubmit="checkMark()" does not return false, causing form reload and clearing the result.
Error 2 (grade.html, Line 19): <script src="grades.js"> has wrong filename; should be "grade.js".
Error 3 (grade.js, Line 2): Missing "=" in `let name = ...`.
Error 4 (grade.js, Line 3): Missing "=" in `let mark = ...`.
Error 5 (grade.js, Line 4): `if (name = "")` uses assignment "=" instead of strict equality "===".
Error 6 (grade.js, Line 8): `isNan(mark)` has wrong capitalization; should be `isNaN(mark)`.
Error 7 (grade.js, Line 14): `mark < 0 && mark > 100` is always false; should be `mark < 0 || mark > 100`.
Error 8 (grade.js, Line 23): `else if (mark >= 50` is missing a closing parenthesis ")".
Error 9 (grade.js, Line 24): `grade = "c"` uses lowercase "c" instead of "C" and is missing a semicolon.
Error 10 (grade.js, Line 26): Missing "=" in `grade = "F"`.
Error 11 (grade.js, Line 28): `getElementByID` has wrong capitalization; should be `getElementById`.
Error 12 (grade.js, Line 30): `style.colour` uses British spelling; should be `style.color`.
Error 13 (grade.js, Line 34): HTML button calls `showtable()` with lowercase "t" instead of `showTable()`.
Error 14 (grade.js, Line 38): Loop starts at `let i = 1` instead of `let i = 0`, skipping grade "A".
Error 15 (grade.js, Line 39): Missing opening `<td>` for `ranges[i]` and table cell tags are out of order.
Error 16 (grade.js, Line 43): `innerHtml` has wrong capitalization; should be `innerHTML`.
*/

function checkMark() {
    let name = document.forms["gradeForm"]["name"].value.trim();
    let rawMark = document.forms["gradeForm"]["mark"].value.trim();

    if (name === "") {
        alert("Name must be filled out.");
        return false;
    }

    if (rawMark === "") {
        alert("Mark field cannot be empty.");
        return false;
    }

    if (isNaN(rawMark)) {
        alert("Please enter a valid numeric value.");
        return false;
    }

    let mark = parseInt(rawMark, 10);

    if (mark < 0 || mark > 100) {
        alert("Mark must be between 0 and 100.");
        return false;
    }

    let grade;
    let resultColor;

    if (mark >= 80) {
        grade = "A";
        resultColor = "green";
    } else if (mark >= 65) {
        grade = "B";
        resultColor = "green";
    } else if (mark >= 50) {
        grade = "C";
        resultColor = "orange";
    } else {
        grade = "F";
        resultColor = "red";
    }

    const resultEl = document.getElementById("result");
    resultEl.innerHTML = name + " got grade " + grade;
    resultEl.style.color = resultColor;

    document.getElementById("checkedOn").innerHTML = "Checked on: " + Date();

    return false;
}

function generateRandomMark() {
    const randomMark = Math.floor(Math.random() * 101);
    document.getElementById("mark").value = randomMark;
}

function showTable() {
    let grades = ["A", "B", "C", "F"];
    let ranges = ["80-100", "65-79", "50-64", "0-49"];
    let tableHTML = "<table class='grade-table'><tr><th>Grade</th><th>Mark range</th></tr>";

    for (let i = 0; i < grades.length; i++) {
        tableHTML += "<tr><td>" + grades[i] + "</td><td>" + ranges[i] + "</td></tr>";
    }

    tableHTML += "</table>";
    document.getElementById("tableContainer").innerHTML = tableHTML;
}