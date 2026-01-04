# MERN Portfolio

A modern, full-stack portfolio application built with MongoDB, Express.js, React, and Node.js, featuring a premium design with glassmorphism effects and smooth animations.

## Features

- ✨ Modern, premium UI with glassmorphism design
- 🎨 Smooth animations using Framer Motion
- 📱 Fully responsive across all devices
- 🚀 Dynamic content management via REST APIs
- 💬 Working contact form with MongoDB storage
- 🎯 Project showcase with filtering
- 💡 Skills display with proficiency indicators
- 🌈 Gradient effects and animated elements

## Tech Stack

### Frontend
- React 18
- Vite
- **Tailwind CSS**
- Framer Motion
- React Router DOM
- React Icons
- Axios

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- CORS
- dotenv

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd my-portfolio
```

2. **Install Backend Dependencies**
```bash
cd backend
npm install
```

3. **Install Frontend Dependencies**
```bash
cd ../frontend
npm install
```

4. **Configure Environment Variables**

Create a `.env` file in the `backend` directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/portfolio
# Or use MongoDB Atlas:
# MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/portfolio
```

5. **Seed the Database (Optional)**
```bash
cd backend
npm run seed
```

## Running the Application

### Development Mode

1. **Start the Backend Server**
```bash
cd backend
npm run dev
```
The backend will run on `http://localhost:5000`

2. **Start the Frontend (in a new terminal)**
```bash
cd frontend
npm run dev
```
The frontend will run on `http://localhost:3000`

### Production Build

```bash
cd frontend
npm run build
```

## Project Structure

```
my-portfolio/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── projectController.js
│   │   ├── skillController.js
│   │   └── contactController.js
│   ├── models/
│   │   ├── Project.js
│   │   ├── Skill.js
│   │   └── Contact.js
│   ├── routes/
│   │   ├── projectRoutes.js
│   │   ├── skillRoutes.js
│   │   └── contactRoutes.js
│   ├── seed/
│   │   └── seedData.js
│   ├── .env
│   ├── server.js
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx/css
    │   │   ├── Hero.jsx/css
    │   │   ├── About.jsx/css
    │   │   ├── Skills.jsx/css
    │   │   ├── Projects.jsx/css
    │   │   ├── Contact.jsx/css
    │   │   └── Footer.jsx/css
    │   ├── services/
    │   │   └── api.js
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── index.html
    ├── vite.config.js
    └── package.json
```

## API Endpoints

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/featured` - Get featured projects
- `GET /api/projects/:id` - Get single project
- `POST /api/projects` - Create project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Skills
- `GET /api/skills` - Get all skills
- `GET /api/skills/category/:category` - Get skills by category
- `POST /api/skills` - Create skill

### Contact
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all messages

## Customization

1. **Update Personal Information**: Edit the content in components (Hero, About, Footer)
2. **Add Projects**: Use the seed script or POST to `/api/projects`
3. **Add Skills**: Use the seed script or POST to `/api/skills`
4. **Change Colors**: Modify CSS variables in `frontend/src/index.css`
5. **Social Links**: Update links in Hero and Footer components

## License

MIT License - feel free to use this project for your own portfolio!

## Support

For issues or questions, please open an issue on GitHub.
