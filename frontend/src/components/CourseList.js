import React from 'react'
import APIService from './APIService'

export default function CourseList(props) {

    // Corresponds with the update button
    const editCourse = (course) => {
        props.editCourse(course)
    }

    // Corresponds with the delete button
    const deleteCourse = (course) => {
        APIService.DeleteCourse(course.courseId)
            .then(() => props.deleteCourse(course))
    }

    return (
        <div>
            <table className='course-table'>
                <thead>
                    <tr>
                        <th>Course ID</th>
                        <th>Course Name</th>
                        <th>Instructor ID</th>
                        <th></th>
                        <th>Update Course</th>
                        <th>Delete Course</th>
                    </tr>
                </thead>
                <tbody>

                    {props.courses && props.courses.map(course => {
                        return (
                            <tr>
                                <td><p>{course.courseId}</p></td>
                                <td><p>{course.courseName}</p></td>
                                <td><p>{course.instructorId}</p></td>

                                <td className='table-divider'></td>
                                <td>
                                    <button className="btn btn-primary"
                                        onClick={() => editCourse(course)}
                                    >Update</button>
                                </td>

                                <td>
                                    <button className="btn btn-danger"
                                        onClick={() => deleteCourse(course)}
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
