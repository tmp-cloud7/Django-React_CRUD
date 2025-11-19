React CRUD Frontend

The React CRUD Frontend connects to a Django REST Framework backend to provide a user interface for managing resources such as products, users, or items. Users can view, add, edit, and delete data through a responsive interface.

✨ Features

List, create, update, and delete resources

Responsive and clean UI

Forms with validation

Dynamic state management with useState and useEffect

API integration using Axios

JWT-based authentication support (if backend implements JWT)

🛠️ Tech Stack
Category	Technology
Frontend	React 18
Styling	Bootstrap 5 / CSS Modules
HTTP Client	Axios
State Management	useState, useEffect
Routing	React Router DOM
⚙️ Setup Instructions

1️⃣ Clone the repository

git clone https://github.com/yourusername/react_crud_frontend.git
cd react_crud_frontend


2️⃣ Install dependencies

npm install


3️⃣ Create .env file

REACT_APP_API_BASE_URL=http://127.0.0.1:8000


4️⃣ Run the development server

npm start


Frontend runs on:
➡️ http://localhost:3000/

🔌 API Connection

All CRUD operations point to the Django backend API. Example:

axios.get(`${process.env.REACT_APP_API_BASE_URL}/items/`)
     .then(res => setItems(res.data))
     .catch(err => console.error(err));


🧑‍💻 Developer

Tayo Popoola — Frontend Developer (React / UI Design)
📧 GitHub - [Frontend](https://github.com/tmp-cloud7/Django-React_CRUD)
