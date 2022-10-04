import React from 'react'
import APIService from './APIService'

export default function EnrollmentList(props) {

    // Corresponds with the update button
    const editEnrollment = (enrollment) => {
        props.editEnrollment(enrollment)
    }

    // Corresponds with the delete button
    const deleteEnrollment = (enrollment) => {
        APIService.DeleteEnrollment(enrollment.enrollmentId)
            .then(() => props.deleteEnrollment(enrollment))
    }

    return (
        <div>
            <table className='entity-table'>
                <thead>
                    <tr>
                        <th>Enrollment ID</th>
                        <th>Enrollment Grade</th>
                        <th>Student ID</th>
                        <th>Course ID</th>
                        <th></th>
                        <th>Update Enrollment</th>
                        <th>Delete Enrollment</th>
                    </tr>
                </thead>
                <tbody>

                    {props.enrollments && props.enrollments.map(enrollment => {
                        return (
                            <tr>
                                <td><p>{enrollment.enrollmentId}</p></td>
                                <td><p>{enrollment.enrollmentGrade}</p></td>
                                <td><p>{enrollment.studentId}</p></td>
                                <td><p>{enrollment.courseId}</p></td>

                                <td className='table-divider'></td>
                                <td>
                                    <button className="btn btn-primary"
                                        onClick={() => editEnrollment(enrollment)}
                                    >Update</button>
                                </td>

                                <td>
                                    <button className="btn btn-danger"
                                        onClick={() => deleteEnrollment(enrollment)}
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
