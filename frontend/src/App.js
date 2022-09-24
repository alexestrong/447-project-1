import './App.css';
import { useState, useEffect } from 'react';
import StudentList from './components/StudentList';
import StudentForm from './components/StudentForm';
import InstructorList from './components/InstructorList';
import InstructorForm from './components/InstructorForm';
import CourseList from './components/CourseList';
import CourseForm from './components/CourseForm';

function App() {

/********************************************************************
*                                                                   *
*                       STUDENT SETUP                               *
*                                                                   *
********************************************************************/
  const [students, setStudents] = useState([])
  const [editedStudent, setEditedStudent] = useState(null)

  useEffect(() => {
    fetch('http://127.0.0.1:5000/getStudents', {
      'method': 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(resp => resp.json())
      .then(resp => setStudents(resp))
      .catch(error => console.log(error))
  }, [])


  // editStudent will put the updated name into the database
  const editStudent = (student) => {
    setEditedStudent(student)
  }

  // updatedStudent will rerender the updated student name onto the HTML website without refreshing
  const updatedStudent = (student) => {
    const new_student = students.map(my_student => {
      if (my_student.studentId === student.studentId) {
        return student
      } else {
        return my_student
      }
    })
    setStudents(new_student)
  }

  // Insertion of students
  const openStudentForm = () => {
    setEditedStudent({ studentName: '', studentCredits: '' })
  }

  // To rerender the HTML to see live insertion
  const insertedStudent = (student) => {
    const new_students = [...students, student]
    setStudents(new_students)
  }

  // To rerender the HTML to see live deletion
  const deleteStudent = (student) => {
    const new_students = students.filter(mystudent => {
      if (mystudent.studentId === student.studentId) {
        return false;
      }
      return true
    })

    setStudents(new_students)
  }

/********************************************************************
*                                                                   *
*                       INSTRUCTOR SETUP                            *
*                                                                   *
********************************************************************/
  const [instructors, setInstructors] = useState([])
  const [editedInstructor, setEditedInstructor] = useState(null)

  useEffect(() => {
    fetch('http://127.0.0.1:5000/getInstructors', {
      'method': 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(resp => resp.json())
      .then(resp => setInstructors(resp))
      .catch(error => console.log(error))
  }, [])


  // editInstructor will put the updated name into the database
  const editInstructor = (instructor) => {
    setEditedInstructor(instructor)
  }

  // updatedInstructor will rerender the updated instructor name onto the HTML website without refreshing
  const updatedInstructor = (instructor) => {
    const new_instructor = instructors.map(my_instructor => {
      if (my_instructor.instructorId === instructor.instructorId) {
        return instructor
      } else {
        return my_instructor
      }
    })
    setInstructors(new_instructor)
  }

  // Insertion of instructors
  const openInstructorForm = () => {
    setEditedInstructor({ instructorName: '', instructorDepartment: '' })
  }

  // To rerender the HTML to see live insertion
  const insertedInstructor = (instructor) => {
    const new_instructors = [...instructors, instructor]
    setInstructors(new_instructors)
  }

  // To rerender the HTML to see live deletion
  const deleteInstructor = (instructor) => {
    const new_instructors = instructors.filter(myinstructor => {
      if (myinstructor.instructorId === instructor.instructorId) {
        return false;
      }
      return true
    })

    setInstructors(new_instructors)
  }

/********************************************************************
*                                                                   *
*                       COURSE SETUP                                *
*                                                                   *
********************************************************************/
  const [courses, setCourses] = useState([])
  const [editedCourse, setEditedCourse] = useState(null)

  useEffect(() => {
    fetch('http://127.0.0.1:5000/getCourses', {
      'method': 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(resp => resp.json())
      .then(resp => setCourses(resp))
      .catch(error => console.log(error))
  }, [])


  // editCourse will put the updated name into the database
  const editCourse = (course) => {
    setEditedCourse(course)
  }

  // updatedCourse will rerender the updated course name onto the HTML website without refreshing
  const updatedCourse = (course) => {
    const new_course = courses.map(my_course => {
      if (my_course.courseId === course.courseId) {
        return course
      } else {
        return my_course
      }
    })
    setCourses(new_course)
  }

  // Insertion of courses
  const openCourseForm = () => {
    setEditedCourse({ courseName: '', instructorId: '' })
  }

  // To rerender the HTML to see live insertion
  const insertedCourse = (course) => {
    const new_courses = [...courses, course]
    setCourses(new_courses)
  }

  // To rerender the HTML to see live deletion
  const deleteCourse = (course) => {
    const new_courses = courses.filter(mycourse => {
      if (mycourse.courseId === course.courseId) {
        return false;
      }
      return true
    })

    setCourses(new_courses)
  }



  return (
    <div className="App">
      <div className="row-header-1">
        <div className="col">
          <h1>Welcome to <b>CRUD</b> University <button className='emoji'>👋</button></h1>
        </div>
      </div>

      <br /><hr></hr><br />
      <div className='table-title-container'>
      <div className="table-title">
        <h2>Students </h2>
      </div>
      </div>
      <br /><br />

      <StudentList students={students} editStudent={editStudent} deleteStudent={deleteStudent} />
      <div className="insert-box">
        <button
          className="btn btn-success"
          onClick={openStudentForm}
        >Create Student</button>
      </div>
      {editedStudent ? <StudentForm student={editedStudent} updatedStudent={updatedStudent} insertedStudent={insertedStudent} /> : null}

      <br /><br /><hr></hr><br /><br />
      <div className='table-title-container'>
      <div className="table-title">
        <h2>Instructors </h2>
      </div>
      </div>
      <br /><br />

      <InstructorList instructors={instructors} editInstructor={editInstructor} deleteInstructor={deleteInstructor} />
      <div className="insert-box">
        <button
          className="btn btn-success"
          onClick={openInstructorForm}
        >Create Instructor</button>
      </div>
      {editedInstructor ? <InstructorForm instructor={editedInstructor} updatedInstructor={updatedInstructor} insertedInstructor={insertedInstructor} /> : null}

      <br /><br /><hr></hr><br /><br />
      <div className='table-title-container'>
      <div className="table-title">
        <h2>Courses </h2>
      </div>
      </div>
      <br /><br />

      <CourseList courses={courses} editCourse={editCourse} deleteCourse={deleteCourse} />
      <div className="insert-box">
        <button
          className="btn btn-success"
          onClick={openCourseForm}
        >Create Course</button>
      </div>
      {editedCourse ? <CourseForm course={editedCourse} updatedCourse={updatedCourse} insertedCourse={insertedCourse} /> : null}


    </div>
  );
}

export default App;
