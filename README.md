# AWS Cloud Final Project

This is a Node.js project that uses Express.js to create a REST API for managing students and teachers. It is built with TypeScript.

## Installation
1.  Install dependencies:

    ```bash
    npm install
    ```
2.  Create a `.env` file based on the `.env.example` file and add the necessary environment variables.

## Usage

- To run the project in development mode (with hot-reloading):

    ```bash
    npm run dev
    ```
- To build the project for production:
    ```bash 
    npm run build
    ```

- To run the project in production:

    ```bash
    npm start
    ```

The application will start on the port specified in the `SERVER_PORT` environment variable (defaults to 3000).

## API Endpoints

### Students

*   `GET /alumnos`: Get all students.
*   `GET /alumnos/:id`: Get a student by ID.
*   `POST /alumnos`: Create a new student.
*   `PUT /alumnos/:id`: Update a student by ID.
*   `DELETE /alumnos/:id`: Delete a student by ID.

### Teachers

*   `GET /profesores`: Get all teachers.
*   `GET /profesores/:id`: Get a teacher by ID.
*   `POST /profesores`: Create a new teacher.
*   `PUT /profesores/:id`: Update a teacher by ID.
*   `DELETE /profesores/:id`: Delete a teacher by ID.
