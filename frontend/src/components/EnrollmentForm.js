import React, { useState, useEffect } from 'react'
import APIService from './APIService'

function EnrollmentForm(props) {
    const [enrollmentGrade, setEnrollmentGrade] = useState('')
    const [studentId, setStudentId] = useState('')
    const [courseId, setCourseId] = useState('')

    // To clear form when clicking on new "update button"
    useEffect(() => {
        setEnrollmentGrade(props.enrollment.enrollmentGrade)
        setStudentId(props.enrollment.studentId)
        setCourseId(props.enrollment.courseId)
    }, [props.enrollment])

    // Makes call to APIService to PUT (update) to an existing enrollment in the Database
    const updateEnrollment = () => {
        APIService.UpdateEnrollment(props.enrollment.enrollmentId, { enrollmentGrade, studentId, courseId })
            .then(resp => props.updatedEnrollment(resp))
            .catch(error => console.log(error))
    }

    // Makes call to APIService to POST to the Database to insert new enrollment
    const insertEnrollment = () => {
        APIService.InsertEnrollment({ enrollmentGrade, studentId, courseId })
            .then(resp => props.insertedEnrollment(resp))
            .catch(error => console.log(error))
    }

    return (
        <div>
            {props.enrollment ? (
                < div className="mb-3">
                    <label htmlFor="enrollment-grade" className="form-label">Enrollment Grade</label>
                    <input type="text" className="form-control" placeholder="Please enter enrollment grade"
                        value={enrollmentGrade}
                        onChange={(e) => setEnrollmentGrade(e.target.value)}
                    />

                    <label htmlFor="student-id" className="form-label">Student ID</label>
                    <input type="text" className="form-control" placeholder="Please enter the student ID"
                        value={studentId}
                        onChange={(e) => setStudentId(e.target.value)}
                    />

                    <label htmlFor="course-id" className="form-label">Course ID</label>
                    <input type="text" className="form-control" placeholder="Please enter the course ID"
                        value={courseId}
                        onChange={(e) => setCourseId(e.target.value)}
                    />

                    {
                        props.enrollment.enrollmentId ?
                            <button
                                onClick={updateEnrollment}
                                className="btn btn-success mt-3"
                            >Update</button>
                            :
                            <button
                                onClick={insertEnrollment}
                                className="btn btn-success mt-3"
                            >Insert</button>
                    }



                </div>
            ) : null
            }

        </div>
    )
}

export default EnrollmentForm