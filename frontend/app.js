const form = document.getElementById("student-form");
const tableBody = document.querySelector("#students-table tbody");
const clearBtn = document.getElementById("clear-btn");

const apiUrl = "/api/students";

function fetchStudents() {
  fetch(apiUrl)
    .then(res => res.json())
    .then(data => {
      tableBody.innerHTML = "";
      data.forEach(student => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${student.Person_Id}</td>
          <td>${student.Name}</td>
          <td>${student.Email}</td>
          <td>${student.Occupation}</td>
          <td>
            <button onclick="editStudent(${student.Person_Id})">Edit</button>
            <button onclick="deleteStudent(${student.Person_Id})">Delete</button>
          </td>
        `;
        tableBody.appendChild(tr);
      });
    });
}

function editStudent(id) {
  fetch(`${apiUrl}/${id}`)
    .then(res => res.json())
    .then(student => {
      document.getElementById("personId").value = student.Person_Id;
      document.getElementById("name").value = student.Name;
      document.getElementById("email").value = student.Email;
      document.getElementById("occupation").value = student.Occupation;
    });
}

function deleteStudent(id) {
  if (!confirm("Are you sure you want to delete this student?")) return;
  fetch(`${apiUrl}/${id}`, { method: "DELETE" })
    .then(res => {
      if (res.ok) fetchStudents();
    });
}

clearBtn.onclick = () => {
  document.getElementById("personId").value = "";
  form.reset();
};

form.onsubmit = e => {
  e.preventDefault();

  const id = document.getElementById("personId").value;
  const data = {
    Name: document.getElementById("name").value,
    Email: document.getElementById("email").value,
    Occupation: document.getElementById("occupation").value
  };

  let method = "POST";
  let url = apiUrl;

  if (id) {
    method = "PUT";
    url = `${apiUrl}/${id}`;
  }

  fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
    .then(res => {
      if (res.ok) {
        form.reset();
        document.getElementById("personId").value = "";
        fetchStudents();
      } else {
        alert("Something went wrong");
      }
    });
};

// Load students on page load
fetchStudents();
