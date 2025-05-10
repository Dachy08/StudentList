"use client"

import { useState } from "react"
import "./App.css"
import { students } from "./data"

function App() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortField, setSortField] = useState("name")
  const [sortDirection, setSortDirection] = useState("asc")

  // Filter students based on search term
  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.field.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Sort students based on selected field and direction
  const sortedStudents = [...filteredStudents].sort((a, b) => {
    if (sortField === "age" || sortField === "experience") {
      return sortDirection === "asc" ? a[sortField] - b[sortField] : b[sortField] - a[sortField]
    } else {
      return sortDirection === "asc"
        ? a[sortField].localeCompare(b[sortField])
        : b[sortField].localeCompare(a[sortField])
    }
  })

  // Handle sort change
  const handleSort = (field) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  // Calculate completion percentage
  const calculateCompletion = (student) => {
    return student.completed ? "100%" : "0%"
  }

  return (
    <div className="container">
      <h1>Student List</h1>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search by name or field..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <table className="student-table">
        <thead>
          <tr>
            <th onClick={() => handleSort("name")}>
              Name {sortField === "name" && (sortDirection === "asc" ? "↑" : "↓")}
            </th>
            <th onClick={() => handleSort("field")}>
              Field {sortField === "field" && (sortDirection === "asc" ? "↑" : "↓")}
            </th>
            <th onClick={() => handleSort("age")}>
              Age {sortField === "age" && (sortDirection === "asc" ? "↑" : "↓")}
            </th>
            <th onClick={() => handleSort("startDate")}>
              Start Date {sortField === "startDate" && (sortDirection === "asc" ? "↑" : "↓")}
            </th>
            <th onClick={() => handleSort("experience")}>
              Experience {sortField === "experience" && (sortDirection === "asc" ? "↑" : "↓")}
            </th>
            <th>Completed</th>
            <th>Completion</th>
          </tr>
        </thead>
        <tbody>
          {sortedStudents.map((student) => (
            <tr key={student.id}>
              <td>{student.name}</td>
              <td>{student.field}</td>
              <td>{student.age}</td>
              <td>{student.startDate}</td>
              <td>{student.experience} years</td>
              <td>{student.completed ? "Yes" : "No"}</td>
              <td>
                <div className="progress-container">
                  <div className="progress-bar" style={{ width: calculateCompletion(student) }}></div>
                  <span className="progress-text">{calculateCompletion(student)}</span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {sortedStudents.length === 0 && <p className="no-results">No students found matching your search.</p>}
    </div>
  )
}

export default App
