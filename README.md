# JobFinder App

JobFinder is a full-stack web application built with the **MERN stack (MongoDB, Express.js, React, Node.js)**. It allows users to search for jobs, post new job listings, and manage applications.

## Features
- 🔍 Job searching with filters (location, category, keywords)
- 📝 Post, edit, and delete job listings (Admin/Recruiters)
- 👤 User authentication and profile management
- 📄 Apply for jobs and track your applications
- 🛡️ Secure RESTful API with JWT authentication
- 💾 MongoDB database integration

## Tech Stack

### Frontend:
- React.js
- Axios
- React Router DOM
- Tailwind CSS (or Bootstrap/Material UI)

### Backend:
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- bcrypt for password hashing

### Deployment:
- Frontend: Vercel / Netlify
- Backend & Database: Render / Railway / MongoDB Atlas

## Folder Structure

```
/jobfinder-app
│── /backend
│   ├── /controllers
│   ├── /models
│   ├── /routes
│   ├── /middlewares
│   ├── /config
│   └── server.js
│
│── /frontend
│   ├── /src
│   │   ├── /components
│   │   ├── /pages
│   │   ├── /redux
│   │   ├── App.js
│   │   └── index.js
│
├── package.json
└── README.md
```

## Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/jobfinder-app.git
cd jobfinder-app
```

### 2. Setup Backend
```bash
cd backend
npm install
```
Create a `.env` file in the `/backend` directory with your MongoDB URI and JWT secret:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

Run the backend:
```bash
npm run dev
```

### 3. Setup Frontend
```bash
cd ../frontend
npm install
```
Run the frontend:
```bash
npm start
```

### 4. Access the App
Visit:
```
http://localhost:3000
```

## API Endpoints

| Method | Endpoint              | Description                     |
|-------|------------------------|---------------------------------|
| POST  | /api/users/register     | Register new user               |
| POST  | /api/users/login        | Login user                      |
| GET   | /api/jobs               | Get all jobs                    |
| POST  | /api/jobs               | Post a new job (Protected)      |
| PUT   | /api/jobs/:id           | Update a job (Protected)        |
| DELETE| /api/jobs/:id           | Delete a job (Protected)        |
| POST  | /api/jobs/:id/apply     | Apply for a job (Protected)     |

## Future Improvements
- Job recommendations using AI
- Admin dashboard
- Email notifications
- Resume upload functionality
- Pagination and search optimization

## License
This project is open source and available under the [MIT License](LICENSE).
