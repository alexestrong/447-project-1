Setup for Python/Flask/React/mySQL CRUD Application
===
Name: Alex Strong

## Database Setup
1) First set up your database
2) This project uses mySQL
3) Open your preferred choice of mySQL interface *(typically mySQL Workbench or PHPMyAdmin)*
4) Create a new database labeled "**university_ia**". This can also be any other name of your choosing, however **the name will be used, so remember it**.
5) After your new database is created, you are done setting up the database
6) Now move to the project folders, navigate to the frontend folder, and open app.py in your preferred editor.

7) You will need to adjust this line
    ```
    app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:''@localhost:4306/university_ia'
    ```

8) This links a connection to your mySQL server, and the database we will be using.

9) You will likely need to change **4306** to **3306**, as 3306 is the default mySQL port, but in development I began working on a different port than the default
    ```
    3306
    ```

10) If there is a different username and password on your mySQL instance, it will need to be changed here
    ```
    root:''
    ```
    You will enter your mySQL server username where "root" is located. If your password is blank you can leave the quotes. Otherwise, if your password is not blank, then you will not need quotes and you will enter your mySQL server password on the right of the colon

11) If you chose a different name for the database, then replace the name at the end of the line with the name of the database you chose
    ```
    university_ia
    ```
12) In some rare cases you may have to change "localhost" to the actual address of your localhost, typically "127.0.0.1"
    ```
    localhost
    ```
13) If you need additional help configuring the DATABASE_URI, refer to the SQLAlchemy documents at https://flask-sqlalchemy.palletsprojects.com/en/2.x/config/


## Backend Setup **(VS CODE)**
1) Start with downloading and unzipping the .zip file
2) Open VSCode, then choose the project folder to open
3) Press "Ctrl + Shft + P" to open the command palette
4) Begin typing "Python: Select Interpreter" until you see the option of "Python: Select Interpreter"
5) Select the option with the + (plus) next to it labeled: "Enter interpreter path"
6) Select "Find..."
7) Browse your file system for the .venv folder
8) Once in that folder navigate to /.venv/Scripts/ and select the file "Python.exe"
9) Now you are set up in the virtual environment. You may have to close your VSCode terminal and open a new one to see that ".venv" is active
10) I believe you are then able to skip installing dependencies since you are using the virtual environment that was provided

## Backend Setup **(WITHOUT VS CODE)**
1) Create a virtual environment, or load into the virtual environment provided in the codebase
2) If you are creating a new virtual environment then follow the next section - Install Dependencies

## Install Dependencies
- flask
- flask-cors
- Flask-SQLAlchemy
- mysqlclient
- flask-marshmallow
- marshmallow-sqlalchemy

### *Install Methods*
*This should typically be done in a virtual environment*

1) To install these packages you can install each individually: 
    ```
    pip install _______
    ```

2) Or you can install from the "requirements.txt":
    ```
    pip install -r requirements.txt
    ```

## Start Backend Server
1) **Only begin after database & dependencies (or virtual environment dependencies) has been set up**
2) If you are working in VSCode then with app.py open, press "F5" and select "Flask"
3) If you are not working in VSCode then in the terminal, navigate and go into the backend folder. Then run the app.py file with command
    ```
    python app.py
    ```
4) The terminal output should now tell you that the server is running and what address it is running on. (Should be on port 5000 of local host, or seen as http://127.0.0.1:5000)


## Frontend Setup
**You will need Node.js installed. If not installed already, refer to online documentation for install methods**
1) In a new terminal, make sure you are still in the virtual environment
2) Navigate to the frontend folder
3) Run the command below...
    ```
    npm start
    ```
4) If the webpage is not automatically opened for you, view the website link that is output in the terminal
5) Setup complete!
