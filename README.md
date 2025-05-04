This is a full-stack Learning Management System (LMS) project consisting of:

- **Frontend**: built with Next.js
- **Backend**: built with Express.js and TypeScript
- **Database**: MongoDB Atlas
- **Containerized** with Docker & managed via Docker Compose
- **Reverse Proxy** via Nginx

__________

Before running this project, make sure you have the following installed:

- [Docker](https://www.docker.com/) & Docker Compose
- A `.env` file in the project root (see `.env.example`)
- A MongoDB Atlas cluster (or local MongoDB)

___________
## Technologies

- **Backend**: Express.js, MongoDB
- **Frontend**: Next.js
- **Containerization**: Docker
- **ORM**: Mongoose (for MongoDB)
- **Version Control**: Git
- **Styling**: Tailwind CSS (if used in the project)

_______________

## Functionality Description

1. **User Roles**:
    - `Admin`: Can manage everything in the system.

_______________

How to Run the Project

1. Clone the repository

git clone https://github.com/aniakarpliuk21/lms-project.git
cd lms-project
2. Create .env File
   Copy the example file and fill in your environment variables:

cp .env.example .env
Edit .env and set values for:

3. - To  **backend**:
 ```bash
      cd backend
      npm install
```

- To  **frontend**:
  ```bash
  cd frontend
  npm install
     
4.Start the App with Docker
- Open the terminal and run the following commands:
  ```bash
      docker-compose up --build
   ```

    - This will build and start all necessary containers: backend, frontend, MongoDB.

3. **Running Locally (without Docker)**:
   
    - To run the **frontend**:
      ```bash
      cd frontend
      npm run build
      npm run dev
      ```

   The frontend will be available at `http://localhost:3000`.


________

🧪 API Documentation
The backend API supports Swagger or Postman

Swagger:
http://localhost/api/docs

Postman Collection: https://drive.google.com/file/d/1BtODGiYwXsMbR41aN2bKHU30qLXnJ2P3/view?usp=sharing

...

_______
To stop the services and remove containers:

docker-compose down





