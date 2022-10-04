export default class APIService {

    /********************************************************************
    *                                                                   *
    *                       STUDENTS API CALLS                          *
    *                                                                   *
    ********************************************************************/

    // Makes call to the API backend to update an existing student
    static UpdateStudent(id, body) {
        return fetch(`http://127.0.0.1:5000/updateStudent/${id}/`, {
            'method': 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
            .then(resp => resp.json())
    }

    // Makes call to the API backend to insert a new student
    static InsertStudent(body) {
        return fetch(`http://127.0.0.1:5000/addStudent`, {
            'method': 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
            .then(resp => resp.json())
    }

    // Makes call to the API backend to delete an existing student
    static DeleteStudent(id) {
        return fetch(`http://127.0.0.1:5000/deleteStudent/${id}/`, {
            'method': 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })
    }


    /********************************************************************
    *                                                                   *
    *                       INSTRUCTOR API CALLS                        *
    *                                                                   *
    ********************************************************************/
    // Makes call to the API backend to update an existing instructor
    static UpdateInstructor(id, body) {
        return fetch(`http://127.0.0.1:5000/updateInstructor/${id}/`, {
            'method': 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
            .then(resp => resp.json())
    }

    // Makes call to the API backend to insert a new instructor
    static InsertInstructor(body) {
        return fetch(`http://127.0.0.1:5000/addInstructor`, {
            'method': 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
            .then(resp => resp.json())
    }

    // Makes call to the API backend to delete an existing instructor
    static DeleteInstructor(id) {
        return fetch(`http://127.0.0.1:5000/deleteInstructor/${id}/`, {
            'method': 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })
    }



    /********************************************************************
    *                                                                   *
    *                       COURSES API CALLS                           *
    *                                                                   *
    ********************************************************************/
    // Makes call to the API backend to update an existing course
    static UpdateCourse(id, body) {
        return fetch(`http://127.0.0.1:5000/updateCourse/${id}/`, {
            'method': 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
            .then(resp => resp.json())
    }

    // Makes call to the API backend to insert a new course
    static InsertCourse(body) {
        return fetch(`http://127.0.0.1:5000/addCourse`, {
            'method': 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
            .then(resp => resp.json())
    }

    // Makes call to the API backend to delete an existing course
    static DeleteCourse(id) {
        return fetch(`http://127.0.0.1:5000/deleteCourse/${id}/`, {
            'method': 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })
    }




    /********************************************************************
    *                                                                   *
    *                       ENROLLMENTS API CALLS                       *
    *                                                                   *
    ********************************************************************/

    // Makes call to the API backend to update an existing enrollment
    static UpdateEnrollment(id, body) {
        return fetch(`http://127.0.0.1:5000/updateEnrollment/${id}/`, {
            'method': 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
            .then(resp => resp.json())
    }

    // Makes call to the API backend to insert a new enrollment
    static InsertEnrollment(body) {
        return fetch(`http://127.0.0.1:5000/addEnrollment`, {
            'method': 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
            .then(resp => resp.json())
    }

    // Makes call to the API backend to delete an existing enrollment
    static DeleteEnrollment(id) {
        return fetch(`http://127.0.0.1:5000/deleteEnrollment/${id}/`, {
            'method': 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })
    }
}