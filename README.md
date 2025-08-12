Full-Stack React & Node.js Project with Dockerized MongoDB

This repository contains a full-stack web application with a React frontend (/client), a Node.js backend API (/api), and
a MongoDB database running in Docker.

---

### Prerequisites

Before you start, make sure you have the following installed:

- Node.js (v16+ recommended) - https://nodejs.org/
- npm (comes with Node.js) - https://www.npmjs.com/get-npm
- Docker - https://www.docker.com/get-started
- Docker Compose - https://docs.docker.com/compose/install/ (usually comes with Docker Desktop)

---

### Getting Started

1. Clone the repository

`git clone <your-repo-url>`

`cd <repo-folder>`

2. Start MongoDB with Docker Compose

MongoDB runs in a Docker container with its data persisted in a Docker volume.

From the root project folder (where docker-compose.yml is located), run:

`docker-compose up -d`

This will:

- Pull the official MongoDB image if not already present
- Run MongoDB in a container named mongo-db
- Map MongoDB's internal port 27017 to host port 27018
- Persist data in a volume called mongo-data
- Bind MongoDB to all IP addresses (--bind_ip_all) for connectivity

To verify Mongo is running, use:

docker ps

3. Setup and run the backend API

Install dependencies:

npm install

The default connection string assumes MongoDB on localhost port 27018.
MONGO_URI=mongodb://localhost:27018/mydb
PORT=8081

Start the backend server:

`npm start`

The backend server will start listening on port 8081.

4. Setup and run the React frontend

Install dependencies:

`npm install`

Start the React development server:

`npm start`

The frontend server will start on port 3000 and proxy API calls to localhost:8081.

---

### Project Structure Overview

/client # React frontend (Tailwind CSS, Redux, React Router)
/api # Node.js backend API (Express, Mongoose)
docker-compose.yml # Docker Compose file for MongoDB

---

#### Notes

- The MongoDB Docker container stores data persistently in the mongo-data volume
- The backend API connects to MongoDB using mongodb://localhost:27018/mydb
- Redux state is persisted on the frontend using redux-persist
- Tailwind CSS is used for styling the React components

---

### Stopping the project

To stop MongoDB container:

`docker-compose down`

To stop backend or frontend, use Ctrl+C in their terminal windows

---

Troubleshooting

MongoDB connection errors:

- Ensure Docker is running and container is healthy (docker ps, docker logs mongo-db)

API cannot connect to MongoDB:

- Confirm connection string in .env matches your Docker port mapping

Frontend cannot reach backend:

- Verify backend is running on port 8081