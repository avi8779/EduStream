# 📚 EduStream — Full Stack Learning Management System

A production-ready **Learning Management System** built with the **MERN Stack**, featuring course purchases via Razorpay, media uploads via Cloudinary, JWT authentication, an admin analytics dashboard, and email notifications.

---

## 🚀 Live Demo

| Service | URL |
|---|---|
| 🌐 Frontend | [https://e-learning-avinash.vercel.app](https://e-learning-avinash.vercel.app) |
| ⚙️ Backend API | [https://lms-api-avinash.onrender.com](https://lms-api-avinash.onrender.com) |

> ⚠️ Replace the above links with your actual deployed URLs after deployment.

---

## ✨ Features

### 👤 User
- JWT-based authentication with HTTP-only cookies (secure login/logout)
- User registration with email verification via Nodemailer
- Browse and search available courses
- Purchase courses via **Razorpay** payment gateway
- Access enrolled course content (videos, materials)
- Track course progress
- Update profile and change password

### 🎓 Admin
- Admin dashboard with analytics charts (powered by **Chart.js**)
- Create, update, and delete courses
- Upload course thumbnails and video lectures via **Cloudinary**
- View all registered users
- Manage course enrollments and payments
- Revenue and enrollment statistics

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React 18 | UI framework |
| Redux Toolkit | Global state management |
| React Router v6 | Client-side routing |
| Axios | HTTP requests to backend API |
| Tailwind CSS + DaisyUI | Styling and UI components |
| Chart.js + react-chartjs-2 | Admin analytics dashboard |
| React Hot Toast | User notifications |
| React Icons | Icon library |

### Backend
| Technology | Purpose |
|---|---|
| Node.js + Express | REST API server |
| MongoDB + Mongoose | Database and ODM |
| JSON Web Tokens (JWT) | Authentication |
| bcryptjs | Password hashing |
| Cloudinary | Video and image upload/storage |
| Razorpay | Payment gateway integration |
| Nodemailer | Email notifications |
| Multer | File upload middleware |
| Morgan | HTTP request logging |
| Cookie Parser | Cookie handling |
| CORS | Cross-origin resource sharing |

---

## 📁 Project Structure

```
E-Learning-Website/
├── client/                         # React frontend
│   ├── public/
│   └── src/
│       ├── components/             # Reusable UI components
│       ├── pages/                  # Route-level page components
│       ├── redux/                  # Redux Toolkit slices & store
│       ├── helpers/                # Utility functions
│       └── App.js
│
├── server/                         # Node.js + Express backend
│   ├── configs/
│   │   └── dbConn.js               # MongoDB connection
│   ├── controllers/                # Route handler logic
│   ├── middlewares/
│   │   └── error.middleware.js     # Global error handler
│   ├── models/                     # Mongoose schemas
│   ├── routes/
│   │   ├── user.routes.js
│   │   ├── course.routes.js
│   │   ├── payment.routes.js
│   │   └── miscellaneous.routes.js
│   ├── utils/                      # Helper utilities
│   ├── app.js                      # Express app setup
│   └── server.js                   # Entry point
│
└── README.md
```

---

## ⚙️ Getting Started — Run Locally

### Prerequisites
- Node.js v16+
- MongoDB Atlas account (or local MongoDB)
- Cloudinary account
- Razorpay account
- Gmail account (for Nodemailer)

### 1. Clone the repository

```bash
git clone https://github.com/avi8779/E-Learning-Website.git
cd E-Learning-Website
```

### 2. Set up the Backend

```bash
cd server
npm install
```

Create a `.env` file inside the `server/` folder:

```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRY=7d
FRONTEND_URL=http://localhost:3000

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_SECRET=your_razorpay_secret

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=your_email@gmail.com
SMTP_PASSWORD=your_gmail_app_password
SMTP_FROM_EMAIL=your_email@gmail.com
```

Start the backend server:

```bash
npm run dev
```

Backend runs at: `http://localhost:5000`

### 3. Set up the Frontend

```bash
cd ../client
npm install
```

Create a `.env` file inside the `client/` folder:

```env
REACT_APP_BASE_URL=http://localhost:5000/api/v1
```

Start the React app:

```bash
npm start
```

Frontend runs at: `http://localhost:3000`

---

## 🔌 API Endpoints

### Auth — `/api/v1/user`
| Method | Endpoint | Description |
|---|---|---|
| POST | `/register` | Register new user |
| POST | `/login` | Login user |
| GET | `/logout` | Logout user |
| GET | `/me` | Get logged-in user profile |
| PUT | `/update` | Update profile |

### Courses — `/api/v1/courses`
| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Get all courses |
| GET | `/:id` | Get single course |
| POST | `/` | Create course (Admin) |
| PUT | `/:id` | Update course (Admin) |
| DELETE | `/:id` | Delete course (Admin) |

### Payments — `/api/v1/payments`
| Method | Endpoint | Description |
|---|---|---|
| POST | `/subscribe` | Create Razorpay order |
| POST | `/verify` | Verify payment signature |
| DELETE | `/unsubscribe` | Cancel subscription |

---

## 🌐 Deployment

### Backend → Render
1. Go to [render.com](https://render.com) → New Web Service
2. Connect your GitHub repo
3. Set **Root Directory** to `server`
4. Build command: `npm install`
5. Start command: `node server.js`
6. Add all environment variables from your `.env` file

### Frontend → Vercel
1. Go to [vercel.com](https://vercel.com) → New Project
2. Connect your GitHub repo
3. Set **Root Directory** to `client`
4. Framework preset: **Create React App**
5. Add environment variable: `REACT_APP_BASE_URL=https://your-render-url.onrender.com/api/v1`

---

## 🔒 Security Features

- Passwords hashed with **bcryptjs**
- JWT stored in **HTTP-only cookies** (XSS protection)
- CORS restricted to frontend origin only
- Environment variables for all secrets (never hardcoded)

---

## 📸 Screenshots

> Add screenshots of your app here after deployment.
> 
> Suggested: Home page, Course listing, Course detail, Admin dashboard, Payment flow

---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

---

## 👨‍💻 Author

**Avinash Kumar**
- GitHub: [@avi8779](https://github.com/avi8779)
- LinkedIn: [Avinash Kumar](https://www.linkedin.com/in/avinash-kumar-web-developer/)
- Email: avinashkumar.gupta12556@gmail.com

---

## 📄 License

This project is licensed under the [ISC License](LICENSE).

---

⭐ If you found this project helpful, please give it a star on GitHub!
