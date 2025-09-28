# 🚀 Express + PostgreSQL CRUD API

Simple CRUD API built with **Node.js, Express, PostgreSQL**.  
This project is for showcasing backend skills when applying for jobs.  

🌐 **Live Demo**: [[https://crud-express.onrender.com](https://crud-express.onrender.com)](https://nodejs-express-crud-mhso.onrender.com/api/user)

---

## 📂 Features
- RESTful CRUD endpoints (Create, Read, Update, Delete)
- PostgreSQL as database
- Environment variable configuration
- Error handling & logging
- Ready for deployment (Render / Railway)
- Bonus: Swagger UI docs (optional)

---

## ⚙️ Tech Stack
- **Backend**: Node.js + Express  
- **Database**: PostgreSQL  
- **Deployment**: Render / Railway  
- **Tools**: Nodemon, dotenv  

---

## 🛠️ Installation & Usage

Clone repo:
```bash
git clone https://github.com/username/express-postgres-crud.git
cd express-postgres-crud


Install dependencies:

npm install


Run in dev mode:

npm run dev


Run in production:

npm start

🔑 Environment Variables

Create .env file:

## .env for test demo connect to postgresDB dockerFile 
PORT=5001
DB_USER=postgres
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
DB_DATABASE=express-crud

📡 API Endpoints
Users
Method      Endpoint        Description
GET         /users          Get all users
GET         /users/:id      Get single user
POST        /users          Create user
PUT         /users/:id      Update user
DELETE      /users/:id      Delete user

📌 Example: for thunder client

curl -X POST (https://localhost:5001/api/user)\
-H "Content-Type: application/json" \
-d '{"name":"John Doe","email":"john@example.com"}'

🗂️ Database Schema (ERD)
Users
-----
id (PK)
name
email
created_at


(สามารถเพิ่ม diagram PNG/ภาพ ERD ได้ — ดู professional มากขึ้น)

🧪 Testing (Optional)
npm test

🚀 Deployment

This project is deployed on:

Render (https://crud-express.onrender.com
)

Railway (optional)

✨ Future Improvements

Add Swagger API Docs

Add JWT Authentication

Add Docker support

Add CI/CD with GitHub Actions

👨‍💻 Author

Kornpitak Kannika
LinkedIn | GitHub

## 🙏 Acknowledgements

This project was initially inspired by the tutorial from  
[Dipesh Malvia](https://youtu.be/TYB-Lz8YGFk?si=F843L5gDOdNHaXpc).  
I followed along and later improved it by:
- Connecting it to Render for live deployment
- Adding better error handling & environment variables
- Writing production-ready README