# AWS Cloud Final Project

This is a Node.js project that uses Express.js to create a REST API for managing students and teachers. It is built with TypeScript.

## Installation

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file based on the `.env.example` file and add the necessary environment variables.

## Usage

*   To run the project in development mode (with hot-reloading):
    ```bash
    npm run dev
    ```
*   To build the project for production:
    ```bash
    npm run build
    ```
*   To run the project in production:
    ```bash
    npm start
    ```

The application will start on the port specified in the `SERVER_PORT` environment variable (defaults to 3000).

## API Endpoints

### Students (`/alumnos`)

*   `GET /`: Get all students.
*   `GET /:id`: Get a student by ID.
*   `POST /`: Create a new student.
*   `PUT /:id`: Update a student by ID.
*   `DELETE /:id`: Delete a student by ID.

### Teachers (`/profesores`)

*   `GET /`: Get all teachers.
*   `GET /:id`: Get a teacher by ID.
*   `POST /`: Create a new teacher.
*   `PUT /:id`: Update a teacher by ID.
*   `DELETE /:id`: Delete a teacher by ID.
