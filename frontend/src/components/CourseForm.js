import React, { useState, useEffect } from 'react'
import APIService from './APIService'

function CourseForm(props) {
    const [courseName, setCourseName] = useState('')
    const [instructorId, setInstructorId] = useState('')

    // To clear form when clicking on new "update button"
    useEffect(() => {
        setCourseName(props.course.courseName)
        setInstructorId(props.course.instructorId)

    }, [props.course])

    // Makes call to APIService to PUT (update) to an existing course in the Database
    const updateCourse = () => {
        APIService.UpdateCourse(props.course.courseId, { courseName, instructorId })
            .then(resp => props.updatedCourse(resp))
            .catch(error => console.log(error))
    }

    // Makes call to APIService to POST to the Database to insert new course
    const insertCourse = () => {
        APIService.InsertCourse({ courseName, instructorId })
            .then(resp => props.insertedCourse(resp))
            .catch(error => console.log(error))
    }

    return (
        <div>
            {props.course ? (
                < div className="mb-3">
                    <label htmlFor="course-name" className="form-label">Course Name</label>
                    <input type="text" className="form-control" placeholder="Please enter course name"
                        value={courseName}
                        onChange={(e) => setCourseName(e.target.value)}
                    />

                    <label htmlFor="instructor-id" className="form-label">Instructor ID</label>
                    <input type="text" className="form-control" placeholder="Please enter the course's instructor ID"
                        value={instructorId}
                        onChange={(e) => setInstructorId(e.target.value)}
                    />

                    {
                        props.course.courseId ?
                            <button
                                onClick={updateCourse}
                                className="btn btn-success mt-3"
                            >Update</button>
                            :
                            <button
                                onClick={insertCourse}
                                className="btn btn-success mt-3"
                            >Insert</button>
                    }



                </div>
            ) : null
            }

        </div>
    )
}

export default CourseForm