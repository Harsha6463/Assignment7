import React, { useEffect, useState } from "react";
import axios from "axios";

function EmployeeDashboard() {
  const [employees, setEmployees] = useState([]);
  const [editableId, setEditableId] = useState(null);
  const [editedData, setEditedData] = useState({
    fullName: "",
    jobTitle: "",
    department: "",
    location: "",
    age: "",
    salary: "",
  });

  useEffect(() => {
    getItems();
  }, []);

  const getItems = async () => {
    try {
      const response = await axios.get("http://localhost:5001/userData/getusers", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const toggleEdit = (id) => {
    const employee = employees.find((emp) => emp._id === id);
    if (employee) {
      setEditableId(id);
      setEditedData({ ...employee });
    } else {
      setEditableId(null);
      resetEditedData();
    }
  };

  const saveEdit = async (id) => {
    if (!id) {
      console.error("No ID provided for the employee to edit.");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:5001/userData/${id}`,
        editedData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setEmployees((data) =>
          data.map((emp) => (emp._id === id ? { ...emp, ...editedData } : emp))
        );
        setEditableId(null);
        resetEditedData();
      }
    } catch (err) {
      console.error("Error saving edit:", err);
    }
  };

  const deleteEmployee = async (id) => {
    if (!id) {
      console.error("Invalid employee ID");
      return;
    }

    try {
      const response = await axios.delete(`http://localhost:5001/userData/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        setEmployees((data) => data.filter((emp) => emp._id !== id));
      }
    } catch (err) {
      console.error("Error deleting employee:", err);
    }
  };

  const resetEditedData = () => {
    setEditedData({
      fullName: "",
      jobTitle: "",
      department: "",
      location: "",
      age: "",
      salary: "",
    });
  };

  return (
    <div className="App">
      <h2
        style={{
          margin: "15px",
          textAlign: "left",
          color: "#007bff",
          backgroundColor: "#ffffff",
          boxShadow: "0 4px 8px rgb(225, 220, 220)",
          padding: "10px",
          height: "60px",
        }}
      >
        List Of Employees
      </h2>

      <table>
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Job Title</th>
            <th>Department</th>
            <th>Location</th>
            <th>Age</th>
            <th>Salary</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {employees.map((emp) => (
            <tr key={emp._id}>
              {editableId === emp._id ? (
                <>
                  <td>
                    <input
                      type="text"
                      value={editedData.fullName}
                      onChange={(e) =>
                        setEditedData({ ...editedData, fullName: e.target.value })
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={editedData.jobTitle}
                      onChange={(e) =>
                        setEditedData({ ...editedData, jobTitle: e.target.value })
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={editedData.department}
                      onChange={(e) =>
                        setEditedData({ ...editedData, department: e.target.value })
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={editedData.location}
                      onChange={(e) =>
                        setEditedData({ ...editedData, location: e.target.value })
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={editedData.age}
                      onChange={(e) =>
                        setEditedData({ ...editedData, age: e.target.value })
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={editedData.salary}
                      onChange={(e) =>
                        setEditedData({ ...editedData, salary: e.target.value })
                      }
                    />
                  </td>
                </>
              ) : (
                <>
                  <td>{emp.fullName}</td>
                  <td>{emp.jobTitle}</td>
                  <td>{emp.department}</td>
                  <td>{emp.location}</td>
                  <td>{emp.age}</td>
                  <td>{emp.salary}</td>
                </>
              )}
              <td>
                {editableId === emp._id ? (
                  <>
                    <button onClick={() => saveEdit(emp._id)}>Save</button>
                    <button onClick={() => toggleEdit(null)}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => toggleEdit(emp._id)}>Edit</button>
                    <button className="delete" onClick={() => deleteEmployee(emp._id)}>
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeDashboard;

