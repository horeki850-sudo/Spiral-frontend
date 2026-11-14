# Spiral Store – Frontend

## Project Description

Spiral Store is an e-commerce product management application developed using React and Material UI. This frontend connects to a Laravel REST API and provides user authentication, role-based access control, and product management features.

## Technologies Used

- React
- Vite
- Material UI (MUI)
- React Router DOM
- Axios
- JavaScript
- Laravel REST API
- Laravel Sanctum

## Features

### Authentication
- User registration
- User login
- User logout
- Token-based authentication using Laravel Sanctum
- Automatic token attachment to API requests
- Automatic logout when an unauthorized response (401) is received

### Authorization
- Admin and normal user roles
- Protected routes for authenticated users
- Admin-only product management controls
- Normal users can view products but cannot create, update, or delete them

### Product Management
- View product catalog
- View product details
- Add products (Admin)
- Edit products (Admin)
- Delete products (Admin)
- Search products
- Filter products by category
- Sort products by name and price

## Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/horeki850-sudo/Spiral-frontend.git
```

### 2. Open the Project Folder

```bash
cd Spiral-frontend
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure the API URL

Create a `.env` file in the project root and add:

```env
VITE_API_BASE_URL=http://127.0.0.1:8000/api
```

### 5. Start the Development Server

```bash
npm run dev
```

Open the local URL displayed in the terminal, usually:

`http://localhost:5173`

## Backend Connection

The frontend requires the Laravel backend to be running.

Default API address:

`http://127.0.0.1:8000/api`

Backend repository:

https://github.com/horeki850-sudo/Spiral-backend

## User Roles

| Role | Permissions |
|---|---|
| Admin | View, add, edit, and delete products |
| Normal User | View products and product details |
| Guest | Must log in before accessing the product catalog |

The backend also enforces authorization, so hiding management buttons in the frontend is not the only security measure.

## Project Repository

Frontend GitHub Repository:

https://github.com/horeki850-sudo/Spiral-frontend

## Developers

Developed as part of the Activity 8 requirements for authentication, authorization, and GitHub collaboration.