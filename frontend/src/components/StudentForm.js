import React, { useState, useEffect } from 'react'
import APIService from './APIService'

function StudentForm(props) {
    const [studentName, setStudentName] = useState('')
    const [studentCredits, setStudentCredits] = useState('')

    // To clear form when clicking on new "update button"
    useEffect(() => {
        setStudentName(props.student.studentName)
        setStudentCredits(props.student.studentCredits)

    }, [props.student])

    // Makes call to APIService to PUT (update) to an existing student in the Database
    const updateStudent = () => {
        APIService.UpdateStudent(props.student.studentId, { studentName, studentCredits })
            .then(resp => props.updatedStudent(resp))
            .catch(error => console.log(error))
    }

    // Makes call to APIService to POST to the Database to insert new student
    const insertStudent = () => {
        APIService.InsertStudent({ studentName, studentCredits })
            .then(resp => props.insertedStudent(resp))
            .catch(error => console.log(error))
    }

    return (
        <div>
            {props.student ? (
                < div className="mb-3">
                    <label htmlFor="student-name" className="form-label">Student Name</label>
                    <input type="text" className="form-control" placeholder="Please enter the student's name"
                        value={studentName}
                        onChange={(e) => setStudentName(e.target.value)}
                    />

                    <label htmlFor="student-credits" className="form-label">Student Credits</label>
                    <input type="text" className="form-control" placeholder="Please enter the student's current amount of credits"
                        value={studentCredits}
                        onChange={(e) => setStudentCredits(e.target.value)}
                    />

                    {
                        props.student.studentId ?
                            <button
                                onClick={updateStudent}
                                className="btn btn-success mt-3"
                            >Update</button>
                            :
                            <button
                                onClick={insertStudent}
                                className="btn btn-success mt-3"
                            >Insert</button>
                    }



                </div>
            ) : null
            }

        </div>
    )
}

export default StudentForm