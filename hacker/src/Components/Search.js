import React from "react";

import { STUDENTS } from "../studentsList";

function checkValidity(joiningDate, validityDate) {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const [year, month, day] = joiningDate.split("-");
  const [yyyy, mm, dd] = validityDate.split("-");
  const maxValid = new Date(yyyy, mm - 1, dd);
  const selected = new Date(year, month - 1, day);

  console.log(maxValid >= selected && maxValid >= today);
  return maxValid >= selected;
}

function onAdd(residents, setResidents, setErrorText) {
  const studentName = document.getElementById("studentName").value;
  const joiningDate = document.getElementById("joiningDate").value;

  const nameExist = residents?.filter((resident) => {
    return studentName.toLowerCase() === resident?.toLowerCase();
  });

  const nameRes = STUDENTS.filter((student) => {
    return studentName.toLowerCase() === student.name.toLowerCase();
  });
  console.log({ nameRes });
  if (studentName && joiningDate) {
    if (nameExist.length > 0) {
      setErrorText(`Sorry, ${studentName} has already been added to the list!`);
    } else if (nameRes.length === 0) {
      setErrorText(`Sorry, ${studentName} is not a verified student!`);
    } else if (!checkValidity(joiningDate, nameRes[0].validityDate)) {
      setErrorText(`Sorry, ${studentName}'s validity has Expired!`);
    } else {
      setErrorText("");

      setResidents([...residents, studentName]);
    }
  }
  document.getElementById("studentName").value = "";
  document.getElementById("joiningDate").value = "";
}
function Search({ residents, setResidents, setErrorText }) {
  return (
    <div className="my-50 layout-row align-items-end justify-content-end">
      <label htmlFor="studentName">
        Student Name:
        <div>
          <input
            id="studentName"
            data-testid="studentName"
            type="text"
            className="mr-30 mt-10"
          />
        </div>
      </label>
      <label htmlFor="joiningDate">
        Joining Date:
        <div>
          <input
            id="joiningDate"
            data-testid="joiningDate"
            type="date"
            className="mr-30 mt-10"
          />
        </div>
      </label>
      <button
        onClick={() => onAdd(residents, setResidents, setErrorText)}
        type="button"
        data-testid="addBtn"
        className="small mb-0"
      >
        Add
      </button>
    </div>
  );
}

export default Search;
