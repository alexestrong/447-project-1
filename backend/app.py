from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:''@localhost:4306/university_ia'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
ma = Marshmallow(app)


#########################################################################################
#                                 Database  Population                                  #
#########################################################################################
@app.before_first_request
def create_tables():
    db.create_all()
    populateAll()


def populateAll():
    populateStudents()
    populateInstructors()
    populateCourses()
    populateEnrollments()


def populateStudents():
    student1 = Students('Alex Strong', '120')
    student2 = Students('Bob Billy', '40')
    student3 = Students('Charles Cook', '25')
    student4 = Students('Dan Duncan', '99')
    student5 = Students('Eric Elm', '8')
    student6 = Students('Gina Gulley', '200')
    with app.app_context():
        db.session.add(student1)
        db.session.add(student2)
        db.session.add(student3)
        db.session.add(student4)
        db.session.add(student5)
        db.session.add(student6)
        db.session.commit()


def populateInstructors():
    instructor1 = Instructors('Professor Abhijit Dutt', 'Computer Science')
    instructor2 = Instructors('Professor Eric Hamilton', 'Geography')
    instructor3 = Instructors('Professor Maya Larson', 'Art')
    instructor4 = Instructors(
        'Professor Ivan Sekyonda', 'Mechanical Engineering')
    instructor5 = Instructors('Professor Gerald Tompkins', 'History')
    instructor6 = Instructors('Professor David Freet', 'Finance')
    with app.app_context():
        db.session.add(instructor1)
        db.session.add(instructor2)
        db.session.add(instructor3)
        db.session.add(instructor4)
        db.session.add(instructor5)
        db.session.add(instructor6)
        db.session.commit()


def populateCourses():
    course1 = Courses('Software Engineering', 1)
    course2 = Courses('Geo-Politics in Europe', 2)
    course3 = Courses('Intro to Art', 3)
    course4 = Courses('Advanced Engineering', 4)
    course5 = Courses('Civil History', 5)
    course6 = Courses('Managing Investments', 6)
    course7 = Courses('Intro to AI', 1)
    with app.app_context():
        db.session.add(course1)
        db.session.add(course2)
        db.session.add(course3)
        db.session.add(course4)
        db.session.add(course5)
        db.session.add(course6)
        db.session.add(course7)
        db.session.commit()


def populateEnrollments():
    # Student 1
    enrollment1 = Enrollments('A+', 1, 1)
    enrollment2 = Enrollments('A+', 1, 2)
    enrollment3 = Enrollments('A', 1, 3)
    enrollment4 = Enrollments('A', 1, 7)

    # Student 2
    enrollment5 = Enrollments('B', 2, 2)
    enrollment6 = Enrollments('B', 2, 4)
    enrollment7 = Enrollments('B', 2, 1)

    # Student 3
    enrollment8 = Enrollments('B-', 3, 3)
    enrollment9 = Enrollments('B-', 3, 6)

    # Student 4
    enrollment10 = Enrollments('C+', 4, 7)

    # Student 5
    enrollment11 = Enrollments('D', 5, 5)
    enrollment12 = Enrollments('C-', 5, 6)

    # Student 6
    enrollment13 = Enrollments('A', 6, 2)
    enrollment14 = Enrollments('C', 6, 4)
    enrollment15 = Enrollments('B+', 6, 1)

    with app.app_context():
        db.session.add(enrollment1)
        db.session.add(enrollment2)
        db.session.add(enrollment3)
        db.session.add(enrollment4)
        db.session.add(enrollment5)
        db.session.add(enrollment6)
        db.session.add(enrollment7)
        db.session.add(enrollment8)
        db.session.add(enrollment9)
        db.session.add(enrollment10)
        db.session.add(enrollment11)
        db.session.add(enrollment12)
        db.session.add(enrollment13)
        db.session.add(enrollment14)
        db.session.add(enrollment15)
        db.session.commit()


#########################################################################################
#                                   Database Setup                                      #
#########################################################################################
class Students(db.Model):
    # Declare table name, columns, and column types
    __tablename__ = 'students'
    studentId = db.Column(db.Integer, primary_key=True)
    studentName = db.Column(db.String(100))
    studentCredits = db.Column(db.Integer)

    # Set up foreign key relationships (Declare in advance that enrollments will need a key from students)
    enrollments = db.relationship('Enrollments', backref='students')

    # Constructor to assign variables when creating a student with: Students(x, y)
    def __init__(self, studentName, studentCredits):
        self.studentName = studentName
        self.studentCredits = studentCredits


# Class will take in a marshmallow json object and put all of the contents of an object in the fields listed below
class StudentSchema(ma.Schema):
    class Meta:
        fields = ('studentId', 'studentName', 'studentCredits')


# Creating a variable that will call the function with (1 or more) parameters passed in
student_schema = StudentSchema()
students_schema = StudentSchema(many=True)

##########################################################################################


class Instructors(db.Model):
    # Declare table name, columns, and column types
    __tablename__ = 'instructors'
    instructorId = db.Column(db.Integer, primary_key=True)
    instructorName = db.Column(db.String(100))
    instructorDepartment = db.Column(db.String(100))

    # Set up foreign key relationships (Declare in advance that courses will need a key from instructors)
    courses = db.relationship('Courses', backref='instructors')

    def __init__(self, instructorName, instructorDepartment):
        self.instructorName = instructorName
        self.instructorDepartment = instructorDepartment


# Class will take in a marshmallow json object and put all of the contents of an object in the fields listed below
class InstructorSchema(ma.Schema):
    class Meta:
        fields = ('instructorId', 'instructorName', 'instructorDepartment')


# Creating a variable that will call the function with (1 or more) parameters passed in
instructor_schema = InstructorSchema()
instructors_schema = InstructorSchema(many=True)

#########################################################################################


class Courses(db.Model):
    # Declare table name, columns, and column types
    __tablename__ = 'courses'
    courseId = db.Column(db.Integer, primary_key=True)
    courseName = db.Column(db.String(100))

    # Foreign Key!
    instructorId = db.Column(
        db.Integer, db.ForeignKey('instructors.instructorId'))

    # Set up foreign key relationships (Declare in advance that enrollments will need a key from here: courses)
    enrollments = db.relationship('Enrollments', backref='courses')

    def __init__(self, courseName, instructorId):
        self.courseName = courseName
        self.instructorId = instructorId


# Class will take in a marshmallow json object and put all of the contents of an object in the fields listed below
class CourseSchema(ma.Schema):
    class Meta:
        fields = ('courseId', 'courseName', 'instructorId')


# Creating a variable that will call the function with (1 or more) parameters passed in
course_schema = CourseSchema()
courses_schema = CourseSchema(many=True)

#########################################################################################


class Enrollments(db.Model):
    # Declare table name, columns, and column types
    __tablename__ = 'enrollments'
    enrollmentId = db.Column(db.Integer, primary_key=True)
    enrollmentGrade = db.Column(db.String(20))

    # Foreign keys!
    studentId = db.Column(db.Integer, db.ForeignKey('students.studentId'))
    courseId = db.Column(db.Integer, db.ForeignKey('courses.courseId'))

    def __init__(self, enrollmentGrade, studentId, courseId):
        self.enrollmentGrade = enrollmentGrade
        self.studentId = studentId
        self.courseId = courseId


# Class will take in a marshmallow json object and put all of the contents of an object in the fields listed below
class EnrollmentSchema(ma.Schema):
    class Meta:
        fields = ('enrollmentId', 'enrollmentGrade', 'studentId', 'courseId')


# Creating a variable that will call the function with (1 or more) parameters passed in
enrollment_schema = EnrollmentSchema()
enrollments_schema = EnrollmentSchema(many=True)


#########################################################################################
#                                      FLASK ROUTES                                     #
#########################################################################################


# GET ALL
@app.route('/getAll', methods=['GET'])
def get_all():

    # Get all objects of students that were created, then keep serialized object in results
    all_students = Students.query.all()
    resultsStudents = students_schema.dump(all_students)

    # Get all objects of instructors that were created, then keep serialized object in results
    all_instructors = Instructors.query.all()
    resultsInstructors = instructors_schema.dump(all_instructors)

    # Get all objects of courses that were created, then keep serialized object in results
    all_courses = Courses.query.all()
    resultsCourses = courses_schema.dump(all_courses)

    # Get all objects of enrollments that were created, then keep serialized object in results
    all_enrollments = Enrollments.query.all()
    resultsEnrollments = enrollments_schema.dump(all_enrollments)

    # Store serialized objects in a list; separated by categories
    resultsAll = [
        resultsStudents,
        resultsInstructors,
        resultsCourses,
        resultsEnrollments
    ]

    # Transform list of serialized objects into JSON to return
    return jsonify(resultsAll)

#########################################################################################
#########################################################################################
# Student Routes

# Get all students


@app.route('/getStudents', methods=['GET'])
def get_students():
    # Get all object of students that were created
    all_students = Students.query.all()
    # Store the serialized object with assigned field names
    results = students_schema.dump(all_students)
    # Turn the serialized object into a JSON object to return
    return jsonify(results)

# Get single student based on ID


@app.route('/getStudent/<id>/', methods=['GET'])
def student_details(id):
    # Get object by ID of student that was created
    student = Students.query.get(id)
    return student_schema.jsonify(student)

# Add single student with: studentName studentCredits


@app.route('/addStudent', methods=['POST', 'GET'])
def add_student():
    # Request will pull from the JSON field when HTTP POST body is sent
    studentName = request.json['studentName']
    studentCredits = request.json['studentCredits']

    # Create new student object in python, as well as add it to the database
    students = Students(studentName, studentCredits)
    db.session.add(students)
    db.session.commit()

    return student_schema.jsonify(students)

# Update single student based on ID


@app.route('/updateStudent/<id>/', methods=['PUT'])
def update_article(id):
    # Get the student that already exists in the database by querying a Student object that has a specific "id"
    student = Students.query.get(id)

    # Get the updated info from the JSON field in the HTTP PUT body
    studentName = request.json['studentName']
    studentCredits = request.json['studentCredits']

    # Operate on the database object
    student.studentName = studentName
    student.studentCredits = studentCredits

    # Commit the new changes to the db object
    db.session.commit()
    return student_schema.jsonify(student)

# Delete single student based on ID


@app.route('/deleteStudent/<id>/', methods=['DELETE'])
def student_delete(id):
    student = Students.query.get(id)
    db.session.delete(student)
    db.session.commit()

    return student_schema.jsonify(student)

#########################################################################################
#########################################################################################
# Instructor Routes

# Get all instructors


@app.route('/getInstructors', methods=['GET'])
def get_instructors():
    all_instructors = Instructors.query.all()
    results = instructors_schema.dump(all_instructors)
    return jsonify(results)

# Get single instructor based on ID


@app.route('/getInstructor/<id>/', methods=['GET'])
def instructor_details(id):
    instructor = Instructors.query.get(id)
    return instructor_schema.jsonify(instructor)

# Add single instructor with: instructorName instructorDepartment


@app.route('/addInstructor', methods=['POST', 'GET'])
def add_instructor():
    instructorName = request.json['instructorName']
    instructorDepartment = request.json['instructorDepartment']

    instructors = Instructors(instructorName, instructorDepartment)
    db.session.add(instructors)
    db.session.commit()

    return instructor_schema.jsonify(instructors)

# Update single instructor based on ID


@app.route('/updateInstructor/<id>/', methods=['PUT'])
def update_instructor(id):
    instructor = Instructors.query.get(id)

    instructorName = request.json['instructorName']
    instructorDepartment = request.json['instructorDepartment']

    instructor.instructorName = instructorName
    instructor.instructorDepartment = instructorDepartment

    db.session.commit()
    return instructor_schema.jsonify(instructor)

# Delete single instructor based on ID


@app.route('/deleteInstructor/<id>/', methods=['DELETE'])
def instructor_delete(id):
    instructor = Instructors.query.get(id)
    db.session.delete(instructor)
    db.session.commit()

    return instructor_schema.jsonify(instructor)

#########################################################################################
#########################################################################################
# Course Routes

# Get all courses


@app.route('/getCourses', methods=['GET'])
def get_courses():
    all_courses = Courses.query.all()
    results = courses_schema.dump(all_courses)
    return jsonify(results)

# Get single course based on ID


@app.route('/getCourse/<id>/', methods=['GET'])
def course_details(id):
    course = Courses.query.get(id)
    return course_schema.jsonify(course)

# Add single course with: courseName instructorId


@app.route('/addCourse', methods=['POST', 'GET'])
def add_course():
    courseName = request.json['courseName']
    instructorId = request.json['instructorId']

    courses = Courses(courseName, instructorId)
    db.session.add(courses)
    db.session.commit()

    return course_schema.jsonify(courses)

# Update single course based on ID


@app.route('/updateCourse/<id>/', methods=['PUT'])
def update_course(id):
    course = Courses.query.get(id)

    courseName = request.json['courseName']
    instructorId = request.json['instructorId']

    course.courseName = courseName
    course.instructorId = instructorId

    db.session.commit()
    return course_schema.jsonify(course)

# Delete single course based on ID


@app.route('/deleteCourse/<id>/', methods=['DELETE'])
def course_delete(id):
    course = Courses.query.get(id)
    db.session.delete(course)
    db.session.commit()

    return course_schema.jsonify(course)
#########################################################################################
#########################################################################################
# Enrollment Routes

# Get all enrollments


@app.route('/getEnrollments', methods=['GET'])
def get_enrollments():
    all_enrollments = Enrollments.query.all()
    results = enrollments_schema.dump(all_enrollments)
    return jsonify(results)

# Get single enrollment based on ID


@app.route('/getEnrollment/<id>/', methods=['GET'])
def enrollment_details(id):
    enrollment = Enrollments.query.get(id)
    return enrollment_schema.jsonify(enrollment)

# Add single enrollment with: enrollmentName, studentId, courseId


@app.route('/addEnrollment', methods=['POST', 'GET'])
def add_enrollment():
    enrollmentGrade = request.json['enrollmentGrade']
    studentId = request.json['studentId']
    courseId = request.json['courseId']

    enrollments = Enrollments(enrollmentGrade, studentId, courseId)
    db.session.add(enrollments)
    db.session.commit()

    return enrollment_schema.jsonify(enrollments)

# Update single enrollment based on ID


@app.route('/updateEnrollment/<id>/', methods=['PUT'])
def update_enrollment(id):
    enrollment = Enrollments.query.get(id)

    enrollmentGrade = request.json['enrollmentGrade']
    studentId = request.json['studentId']
    courseId = request.json['courseId']

    enrollment.enrollmentGrade = enrollmentGrade
    enrollment.studentId = studentId
    enrollment.courseId = courseId

    db.session.commit()
    return enrollment_schema.jsonify(enrollment)

# Delete single enrollment based on ID


@app.route('/deleteEnrollment/<id>/', methods=['DELETE'])
def enrollment_delete(id):
    enrollment = Enrollments.query.get(id)
    db.session.delete(enrollment)
    db.session.commit()

    return enrollment_schema.jsonify(enrollment)
#########################################################################################
#########################################################################################


if __name__ == "__main__":
    app.run(debug=True)
