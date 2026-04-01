# 📚 Library Web Application

**A Library Book Borrowing Registration System with Modern DevOps Setup**

## 📋 Project Overview

This is a comprehensive full-stack web application for managing library book borrowing registrations. It demonstrates:
- Modern web development with React and Node.js/Express
- Database integration with MongoDB
- DevOps best practices with Docker and Docker Compose
- Git version control with proper branching strategy

## 💡 Features

### Application Features
- ✅ **Book Registration Form**: Register book borrowing with Student Name, Student ID, and Book Name
- ✅ **Live List Display**: View all registered borrowers in real-time
- ✅ **Student Information Page** (`/about`): Display student details and app information
- ✅ **Health Check Endpoint** (`/health`): Monitor API health status
- ✅ **Responsive Design**: Works seamlessly on desktop and mobile devices

### Technical Features
- 🐳 **Docker Containerization**: Separate containers for Backend, Frontend, and Database
- 🔗 **Docker Compose**: Orchestrate all services with a single command
- 🌍 **Environment Variables**: Centralized configuration management
- 📊 **MongoDB Database**: Real data persistence (not hardcoded)
- 🔄 **RESTful API**: Complete CRUD operations for book registrations

## 🏗️ Project Structure

```
library-web/
├── server/                          # Backend (Node.js/Express)
│   ├── models/
│   │   └── Borrower.js              # MongoDB Schema
│   ├── controllers/
│   │   └── borrowerController.js    # Business Logic
│   ├── routes/
│   │   └── borrowerRoutes.js        # API Routes
│   ├── index.js                     # Main Server File
│   ├── package.json
│   ├── .env
│   ├── .env.example
│   └── Dockerfile
│
├── client/                          # Frontend (React)
│   ├── src/
│   │   ├── components/
│   │   │   ├── BorrowerForm.js      # Registration Form Component
│   │   │   ├── BorrowerList.js      # Display List Component
│   │   │   └── *.css                # Styling
│   │   ├── pages/
│   │   │   └── About.js             # Student Info Page
│   │   ├── App.js                   # Main App Component
│   │   └── index.js
│   ├── public/
│   │   └── index.html
│   ├── package.json
│   ├── .env
│   ├── .env.example
│   └── Dockerfile
│
├── docker-compose.yml               # Docker Compose Configuration
├── .env.example                    # Environment Variables Template
├── .gitignore
├── .git/                           # Git Repository
└── README.md                       # This File
```

## 🚀 Tech Stack

| Component | Technology |
|-----------|-----------|
| **Backend** | Node.js, Express.js |
| **Frontend** | React 18, React Router |
| **Database** | MongoDB 6.0 |
| **Container** | Docker, Docker Compose |
| **HTTP Client** | Axios |

## 📖 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- Docker & Docker Compose
- Git

### Local Development Setup

1. **Clone/Navigate to Repository**
   ```bash
   cd library-web
   ```

2. **Install Backend Dependencies**
   ```bash
   cd server
   npm install
   cd ..
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd client
   npm install
   cd ..
   ```

4. **Start with Docker Compose**
   ```bash
   docker-compose up --build
   ```

5. **Access the Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - MongoDB: mongodb://localhost:27017

### Manual Setup (Without Docker)

1. **Start MongoDB** (ensure MongoDB is running)

2. **Backend**
   ```bash
   cd server
   npm install
   npm run dev
   ```

3. **Frontend** (in new terminal)
   ```bash
   cd client
   npm install
   npm start
   ```

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/borrowers` | Get all borrowers |
| `GET` | `/api/borrowers/:id` | Get specific borrower |
| `POST` | `/api/borrowers` | Create new registration |
| `PUT` | `/api/borrowers/:id` | Update borrower info |
| `DELETE` | `/api/borrowers/:id` | Delete registration |
| `GET` | `/health` | Health check |
| `GET` | `/about` | Student information |

### Example Requests

**Register a Book:**
```bash
curl -X POST http://localhost:5000/api/borrowers \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Nguyễn Văn A",
    "studentId": "MSV20001",
    "bookName": "JavaScript Mastery"
  }'
```

**Get All Registrations:**
```bash
curl http://localhost:5000/api/borrowers
```

## 🐳 Docker Commands

### Build Images
```bash
# Backend
docker build -t <username>/library-backend:latest ./server

# Frontend
docker build -t <username>/library-frontend:latest ./client
```

### Run with Docker Compose
```bash
# Start services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Remove all data
docker-compose down -v
```

### Push to Docker Hub
```bash
docker push <username>/library-backend:latest
docker push <username>/library-frontend:latest
```

## 📊 Database Models

### Borrower Schema
```javascript
{
  fullName: String (required),
  studentId: String (required, unique),
  bookName: String (required),
  borrowDate: Date (default: now),
  dueDate: Date (default: now + 14 days),
  status: String (enum: 'borrowed', 'returned'),
  createdAt: Date,
  updatedAt: Date
}
```

## 🔧 Environment Variables

### Server (.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/library_db
NODE_ENV=development
APP_NAME=Library Web Application
```

### Client (.env)
```
REACT_APP_API_URL=http://localhost:5000
```

## 📝 Git Workflow

### Branches
- `main` - Production-ready code
- `develop` - Development branch
- `feature/*` - Feature branches

### Making a Commit
```bash
git add .
git commit -m "feat: Add book registration feature"
git push origin develop
```

## 🎯 Requirements Met

✅ **Project Structure**: Backend + Frontend + Database
✅ **APIs**: ≥2 API endpoints (GET, POST, PUT, DELETE)
✅ **Frontend**: Display data, form interaction, styling
✅ **Database**: MongoDB with persistent data
✅ **Git**: Multiple commits and branches
✅ **Environment Variables**: .env configuration
✅ **Docker**: Separate containers for each service
✅ **Docker Compose**: Full orchestration
✅ **Health Check**: `/health` endpoint
✅ **Student Info**: `/about` page

## 🐛 Troubleshooting

**MongoDB Connection Error**
- Ensure MongoDB is running
- Check MONGODB_URI in .env

**Port Already in Use**
```bash
# Change ports in docker-compose.yml or .env files
```

**Frontend Can't Connect to Backend**
- Verify REACT_APP_API_URL in .env
- Check backend is running on port 5000
- Check CORS is enabled in server

**Docker Build Issues**
```bash
docker system prune -a
docker-compose up --build
```

## 📧 Support & Contact

For issues or questions, create an issue in the repository.

---

**Made with ❤️ for Education**
