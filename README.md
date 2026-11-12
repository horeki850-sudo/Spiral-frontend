# Activity #7: ReactJS Events, State & API Integration

## Product Management with Axios and a REST API

### Project Description

This project is a Product Management application built using ReactJS, Material UI (MUI), Axios, and a Laravel REST API.

It allows users to view, create, update, and delete products. Product information is stored in the Laravel backend and MySQL database instead of being stored only in React state.

### Technologies Used

- ReactJS
- Vite
- Material UI (MUI)
- Axios
- React Router DOM
- Laravel REST API
- MySQL
- JavaScript
- CSS

### Project Setup

#### 1. Install Dependencies

Open a terminal inside the frontend project folder and run:

```bash
npm install
```

#### 2. Configure the API URL

Create or update the `.env` file in the frontend project root:

```env
VITE_API_BASE_URL=http://127.0.0.1:8000/api
```

#### 3. Start the Laravel Backend

Open a terminal inside the Laravel project folder:

```bash
cd C:\laragon\www\ecommerce-api
php artisan serve
```

The Laravel API should be available at:

`http://127.0.0.1:8000`

#### 4. Start the React Frontend

Open another terminal inside the frontend folder:

```bash
cd C:\laragon\e-commerce-fe
npm run dev
```

Open the Vite URL shown in the terminal, normally:

`http://localhost:5173`

Both the Laravel backend and React frontend must be running.

### API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | /api/products | Retrieve all products |
| GET | /api/products/{id} | Retrieve one product |
| POST | /api/products | Create a product |
| PUT | /api/products/{id} | Update a product |
| DELETE | /api/products/{id} | Delete a product |
| GET | /api/categories | Retrieve product categories |

### Main Features

1. Display all products from the Laravel API.
2. View individual product details.
3. Add new products.
4. Edit existing products.
5. Delete products with confirmation.
6. Search and filter products.
7. Validate product information.
8. Display loading indicators.
9. Display API error messages.
10. Display an empty-state message when no products exist.
11. Responsive layout for desktop, tablet, and mobile screens.

### React Concepts Demonstrated

**Events:** Event handlers respond to user actions, such as clicking buttons, submitting forms, and changing input values.

**State:** React `useState` manages product information, loading status, form visibility, and error messages.

**Effects:** React `useEffect` loads product and category information when components are opened or when the product ID changes.

**Axios:** Axios sends HTTP requests between the React frontend and Laravel backend.

**Routing:** React Router DOM handles navigation between the product catalog and individual product details.

### API Integration

Axios is configured in a reusable instance located at:

`src/api/axios.js`

The frontend communicates with Laravel through the configured API base URL.

The Laravel backend is responsible for storing and retrieving product information. Changes remain saved after refreshing the browser.

### Backend and Frontend Differences

- The backend uses `category_id` to identify product categories.
- Product codes must be unique.
- Price and stock must contain valid values.
- Product information is returned through Laravel API resources.
- The backend does not currently provide product image uploads, so the frontend uses a placeholder image.

### Screenshots

Place your Activity #7 screenshots in a folder named `screenshots`.

Include screenshots of:

- Product catalog
- Product details
- Adding a product
- Editing a product
- Deleting a product
- Duplicate product validation
- Empty product state
- API error state
- Restored API connection
- Responsive desktop, tablet, and mobile layouts

### Conclusion

This activity demonstrates how ReactJS can communicate with a Laravel REST API using Axios. It applies React events, state management, effects, routing, validation, and CRUD operations to create a functional Product Management application.