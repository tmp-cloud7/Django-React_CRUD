🧱 Django + React CRUD Application

A full-stack CRUD (Create, Read, Update, Delete) application built with Django (REST Framework) as the backend and React as the frontend.
This project was developed to understand full-stack development, API communication, and media management using Pillow.

🧠 Overview

This project demonstrates how a modern frontend (React + Vite) communicates seamlessly with a Django REST API backend.
It allows users to:

Register and authenticate accounts

Create, view, update, and delete records

Upload and serve images dynamically through the Django backend

With a clean, modular architecture and responsive UI, this project highlights practical integration between Django REST Framework and ReactJS.

⚙️ Core Features

👤 User Authentication

Register and login using a custom user model (CustomUser)

Passwords are securely hashed via Django’s built-in create_user() method

Authenticated API endpoints with Django REST Framework

📇 Record Management (CRUD)

Create, read, update, and delete records via the Django API

Each record includes full user information and media upload (image field handled with Pillow)

🖼️ Image Upload with Pillow

Pillow is used to process and validate uploaded images

Images are stored in media/uploads/records

The backend dynamically serves images to the frontend via Django’s media configuration

🔗 RESTful API

Built using Django REST Framework (serializers, viewsets, and routers)

JSON responses consumed directly by the React frontend

Example endpoints:

POST /api/register/ — create user

GET /api/records/ — list records

POST /api/records/ — create record

PUT /api/records/:id/ — update record

DELETE /api/records/:id/ — delete record

🧩 React Frontend

Responsive React interface built with Vite

CRUD operations connected via fetch() requests to the backend API

Separate pages for login, registration, record creation, and record list view

Uses React Hooks (useState, useEffect) for managing UI state


🛠️ Tech Stack

Layer	Technology

Backend Framework	Django + Django REST Framework

Frontend Framework	React (Vite)

Database	SQLite (default)

Image Handling	Pillow

API Format	JSON REST API

Deployment	Procfile for Render

Package Managers	pip (Python), npm (Node.js)

📁 Project Structure

Django-React-CRUD/

│

├── backend/                     # Django backend

│   ├── api/                     # API app with models, serializers, and views

│   │   ├── models.py            # CustomUser, Record models

│   │   ├── serializers.py       # DRF serializers for user and record

│   │   ├── views.py             # CRUD API logic

│   │   ├── urls.py              # API routes

│   ├── backend/                 # Project-level settings and URLs

│   ├── media/uploads/records/   # Uploaded images (handled by Pillow)

│   ├── db.sqlite3

│   ├── manage.py

│   └── requirements.txt

│

├── frontend/                    # React frontend

│   ├── src/

│   │   ├── components/          # UI components

│   │   ├── pages/               # Page views (Home, Login, Dashboard, etc.)

│   │   ├── api.js               # API calls to Django backend

│   │   ├── App.jsx              # Main React app entry

│   │   └── styles/              # CSS files

│   ├── vite.config.js

│   ├── package.json

│   ├── .env

│
├── Procfile                     # Deployment config (Render)

├── .gitignore

├── README.md


🧰 Installation & Setup

🧩 Backend (Django)


Clone the Repository

git clone https://github.com/tmp-cloud7/Django-React_CRUD.git

cd Django-React_CRUD./backend


Create Virtual Environment

python -m venv venv

venv\Scripts\activate    


Install Dependencies

pip install -r requirements.txt


Run Migrations

python manage.py makemigrations

python manage.py migrate


Start the Server

python manage.py runserver


Server runs at http://127.0.0.1:8000/

⚛️ Frontend (React)

Navigate to frontend folder

cd ../frontend


Install Dependencies

npm install


Start React App

npm run dev


App runs at http://localhost:5173/

Connect to Backend

Ensure .env file contains backend API base URL:

VITE_API_BASE_URL=http://127.0.0.1:8000/api/

🧠 Learning Highlights 

Build and structure a Django REST API with models, serializers, and views

Use React to consume APIs and handle CRUD operations

Manage media files with Pillow for image uploads and resizing

Configure CORS and connect frontend-backend

Deploy a full-stack project using Procfile for cloud platforms

🧩 Example Serializer (Backend)
class RecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = Record
        fields = [
            "id", "creation_date", "first_name", "last_name", 
            "email", "phone", "address", "city", "state", 
            "country", "picture", "user"
        ]
        extra_kwargs = {"user": {"read_only": True}}


✅ Pillow automatically handles and validates the picture field during file upload, ensuring that only valid image types are processed and stored.

📸 Example Screens

(Add screenshots later — e.g. dashboard, upload form, API view)

Page	Description
Home Page	Lists all records from backend
Add Record	Form with image upload preview
Edit Record	Update existing record
Profile/Authentication	Login and registration screens
🧾 Requirements

Python ≥ 3.10

Node.js ≥ 16

Pillow ≥ 9.0

Django REST Framework ≥ 3.14

React (Vite) ≥ 18

🏁 Conclusion

This Django + React CRUD Application demonstrates full-stack development with real-world features — authentication, image uploads, and RESTful API integration.
Using Pillow for image handling showcases how backend media can seamlessly integrate into frontend UIs.

This project forms a solid base for future e-commerce, dashboard, or admin system development.
