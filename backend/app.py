from tokenize import Comment
from xml.dom.pulldom import COMMENT
from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
#import datetime
from flask_marshmallow import Marshmallow
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:''@localhost:4306/university_ia'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
ma = Marshmallow(app)


#########################################################################################
#                                       Database                                        #
#########################################################################################
class Students(db.Model):
    __tablename__ = 'students'
    studentId = db.Column(db.Integer, primary_key=True)
    studentName = db.Column(db.String(100))
    studentCredits = db.Column(db.Integer)

    # Set up foreign key relationships (Declare in advance that enrollments will need a key from students)
    enrollments = db.relationship('Enrollments', backref='students')

    def __init__(self, studentName, studentCredits):
        self.studentName = studentName
        self.studentCredits = studentCredits


class StudentSchema(ma.Schema):
    class Meta:
        fields = ('studentId', 'studentName', 'studentCredits')


student_schema = StudentSchema()
students_schema = StudentSchema(many=True)

##########################################################################################


class Instructors(db.Model):
    __tablename__ = 'instructors'
    instructorId = db.Column(db.Integer, primary_key=True)
    instructorName = db.Column(db.String(100))
    instructorDepartment = db.Column(db.String(100))

    # Set up foreign key relationships (Declare in advance that courses will need a key from instructors)
    courses = db.relationship('Courses', backref='instructors')

    def __init__(self, instructorName, instructorDepartment):
        self.instructorName = instructorName
        self.instructorDepartment = instructorDepartment


class InstructorSchema(ma.Schema):
    class Meta:
        fields = ('instructorId', 'instructorName', 'instructorDepartment')


instructor_schema = InstructorSchema()
instructors_schema = InstructorSchema(many=True)

#########################################################################################


class Courses(db.Model):
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


class CourseSchema(ma.Schema):
    class Meta:
        fields = ('courseId', 'courseName', 'instructorId')


course_schema = CourseSchema()
courses_schema = CourseSchema(many=True)

#########################################################################################


class Enrollments(db.Model):
    __tablename__ = 'enrollments'
    enrollmentId = db.Column(db.Integer, primary_key=True)
    enrollmentGrade = db.Column(db.Integer)

    # Foreign keys!
    studentId = db.Column(db.Integer, db.ForeignKey('students.studentId'))
    courseId = db.Column(db.Integer, db.ForeignKey('courses.courseId'))

    def __init__(self, enrollmentGrade, studentId, courseId):
        self.enrollmentGrade = enrollmentGrade
        self.studentId = studentId
        self.courseId = courseId


class EnrollmentSchema(ma.Schema):
    class Meta:
        fields = ('enrollmentId', 'enrollmentGrade', 'studentId', 'courseId')


enrollment_schema = EnrollmentSchema()
enrollments_schema = EnrollmentSchema(many=True)


#########################################################################################
#                                      FLASK ROUTES                                     #
#########################################################################################
# GET ALL
@app.route('/getAll', methods=['GET'])
def get_all():
    all_students = Students.query.all()
    resultsStudents = students_schema.dump(all_students)

    all_instructors = Instructors.query.all()
    resultsInstructors = instructors_schema.dump(all_instructors)

    all_courses = Courses.query.all()
    resultsCourses = courses_schema.dump(all_courses)

    resultsAll = [
        resultsStudents,
        resultsInstructors,
        resultsCourses
    ]
    return jsonify(resultsAll)

#########################################################################################
#########################################################################################
# Students

# Get all students


@app.route('/getStudents', methods=['GET'])
def get_students():
    all_students = Students.query.all()
    results = students_schema.dump(all_students)
    return jsonify(results)

# Get single student based on ID


@app.route('/getStudent/<id>/', methods=['GET'])
def student_details(id):
    student = Students.query.get(id)
    return student_schema.jsonify(student)

# Add single student with: studentName studentCredits


@app.route('/addStudent', methods=['POST', 'GET'])
def add_student():
    studentName = request.json['studentName']
    studentCredits = request.json['studentCredits']

    students = Students(studentName, studentCredits)
    db.session.add(students)
    db.session.commit()

    return student_schema.jsonify(students)

# Update single student based on ID


@app.route('/updateStudent/<id>/', methods=['PUT'])
def update_article(id):
    student = Students.query.get(id)

    studentName = request.json['studentName']
    studentCredits = request.json['studentCredits']

    student.studentName = studentName
    student.studentCredits = studentCredits

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
# Instructors

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
# Courses

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


if __name__ == "__main__":
    app.run(debug=True)
