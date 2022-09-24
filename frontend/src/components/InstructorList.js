import React from 'react'
import APIService from './APIService'

export default function InstructorList(props) {

    // Corresponds with the update button
    const editInstructor = (instructor) => {
        props.editInstructor(instructor)
    }

    // Corresponds with the delete button
    const deleteInstructor = (instructor) => {
        APIService.DeleteInstructor(instructor.instructorId)
            .then(() => props.deleteInstructor(instructor))
    }

    return (
        <div>
            <table className='instructor-table'>
                <thead>
                    <tr>
                        <th>Instructor ID</th>
                        <th>Instructor Name</th>
                        <th>Instructor's Department</th>
                        <th></th>
                        <th>Update Instructor</th>
                        <th>Delete Instructor</th>
                    </tr>
                </thead>
                <tbody>

                    {props.instructors && props.instructors.map(instructor => {
                        return (
                            <tr>
                                <td><p>{instructor.instructorId}</p></td>
                                <td><p>{instructor.instructorName}</p></td>
                                <td><p>{instructor.instructorDepartment}</p></td>

                                <td className='table-divider'></td>
                                <td>
                                    <button className="btn btn-primary"
                                        onClick={() => editInstructor(instructor)}
                                    >Update</button>
                                </td>

                                <td>
                                    <button className="btn btn-danger"
                                        onClick={() => deleteInstructor(instructor)}
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
