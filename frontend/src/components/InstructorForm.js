import React, { useState, useEffect } from 'react'
import APIService from './APIService'

function InstructorForm(props) {
    const [instructorName, setInstructorName] = useState('')
    const [instructorDepartment, setInstructorDepartment] = useState('')

    // To clear form when clicking on new "update button"
    useEffect(() => {
        setInstructorName(props.instructor.instructorName)
        setInstructorDepartment(props.instructor.instructorDepartment)

    }, [props.instructor])

    // Makes call to APIService to PUT (update) to an existing instructor in the Database
    const updateInstructor = () => {
        APIService.UpdateInstructor(props.instructor.instructorId, { instructorName, instructorDepartment })
            .then(resp => props.updatedInstructor(resp))
            .catch(error => console.log(error))
    }

    // Makes call to APIService to POST to the Database to insert new instructor
    const insertInstructor = () => {
        APIService.InsertInstructor({ instructorName, instructorDepartment })
            .then(resp => props.insertedInstructor(resp))
            .catch(error => console.log(error))
    }

    return (
        <div>
            {props.instructor ? (
                < div className="mb-3">
                    <label htmlFor="instructor-name" className="form-label">Instructor Name</label>
                    <input type="text" className="form-control" placeholder="Please enter instructor name"
                        value={instructorName}
                        onChange={(e) => setInstructorName(e.target.value)}
                    />

                    <label htmlFor="instructor-department" className="form-label">Instructor Department</label>
                    <input type="text" className="form-control" placeholder="Please enter the instructor's department"
                        value={instructorDepartment}
                        onChange={(e) => setInstructorDepartment(e.target.value)}
                    />

                    {
                        props.instructor.instructorId ?
                            <button
                                onClick={updateInstructor}
                                className="btn btn-success mt-3"
                            >Update</button>
                            :
                            <button
                                onClick={insertInstructor}
                                className="btn btn-success mt-3"
                            >Insert</button>
                    }



                </div>
            ) : null
            }

        </div>
    )
}

export default InstructorForm