import React from 'react'
import APIService from './APIService'

export default function StudentList(props) {

  // Corresponds with the update button
  const editStudent = (student) => {
    props.editStudent(student)
  }

  // Corresponds with the delete button
  const deleteStudent = (student) => {
    APIService.DeleteStudent(student.studentId)
      .then(() => props.deleteStudent(student))
  }

  return (
    <div>
      <table className='student-table'>
        <thead>
          <tr>
            <th>Student ID</th>
            <th>Student Name</th>
            <th>Student's Credits</th>
            <th></th>
            <th>Update Student</th>
            <th>Delete Student</th>
          </tr>
        </thead>
        <tbody>

          {props.students && props.students.map(student => {
            return (
              <tr>
                <td><p>{student.studentId}</p></td>
                <td><p>{student.studentName}</p></td>
                <td><p>{student.studentCredits}</p></td>

                <td className='table-divider'></td>
                <td>
                  <button className="btn btn-primary"
                    onClick={() => editStudent(student)}
                  >Update</button>
                </td>

                <td>
                  <button className="btn btn-danger"
                    onClick={() => deleteStudent(student)}
                  >Delete</button>
                </td>


                <hr />
              </tr>
            )
          })}

        </tbody>
      </table>
      <br />
    </div>

  )
}
