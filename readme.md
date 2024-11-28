# Book Shop API

## Description

The present application is meant to be a complete REST API utilizing Express framework and TypeScript along with MongoDB for managing Book Store. It handles products/articles or books along with orders to be included in a CRUD inventory, as well as revenues from the sales. Mongoose is being used for defining the schema relevant to the data integrity validated by built-in rules.

## Features

- Create, Update, Retrieve and Delete books (products)
- Look up books by their respective ID
- Order books, decrement inventory as orders come in
- All income generated from orders using MongoDB aggregation
- Data integrity with Mongoose built-in validators for validating schema

## Technologies Used

- **Node.js** with **Express.js**
- **TypeScript**
- **MongoDB** with **Mongoose**
- **Mongoose built-in validators** (e.g., required, min, enum, maxlength)

## Project Setup

### Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v14 or higher)
- MongoDB (locally or use MongoDB Atlas)

### Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/aro-arko/Book-Shop-Server.git
   ```
2. Install Dependencies:
   ```bash
   cd book-shop-api
   npm install
   ```
3. Set up environment variables:
   Create a .env file in the root of the project and configure it as needed (e.g., MongoDB connection URL).
4. Start the application:
   ```bash
   npm run dev
   ```
   This will start the server at `http://localhost:5000/`

## Endpoints

### 1. Create a Book

#### EndPoint: `/api/products`

#### Method: `POST`

#### Request Body:

    {
        "title": "The Great Gatsby",
        "author": "F. Scott Fitzgerald",
        "price": 10,
        "category": "Fiction",
        "description": "A story about the American dream.",
        "quantity": 100,
         "inStock": true
    }

#### Response:

    {
        "message": "Book created successfully",
        "success": true,
        "data": {
            "_id": "648a45e5f0123c45678d9012",
            "title": "The Great Gatsby",
            "author": "F. Scott Fitzgerald",
            "price": 10,
            "category": "Fiction",
            "description": "A story about the American dream.",
            "quantity": 100,
            "inStock": true,
            "createdAt": "2024-11-19T10:23:45.123Z",
            "updatedAt": "2024-11-19T10:23:45.123Z"
        }
    }

### 2. Get All books

#### EndPoint: `/api/products`

#### Method: `GET`

#### Query Parameter: `searchTerm` (e.g., title, author, category)

#### Response:

    {
        "message": "Books retrieved successfully",
        "status": true,
        "data": [
            {
            "_id": "648a45e5f0123c45678d9012",
            "title": "The Great Gatsby",
            "author": "F. Scott Fitzgerald",
            "price": 10,
            "category": "Fiction",
            "description": "A story about the American dream.",
            "quantity": 100,
            "inStock": true,
            "createdAt": "2024-11-19T10:23:45.123Z",
            "updatedAt": "2024-11-19T10:23:45.123Z"
            }
        ]
    }

### 3. Get a Specific Book

#### EndPoint: `/api/products/:productId`

#### Method: `GET`

#### Response:

    {
        "message": "Book retrieved successfully",
        "status": true,
        "data": {
            "_id": "648a45e5f0123c45678d9012",
            "title": "The Great Gatsby",
            "author": "F. Scott Fitzgerald",
            "price": 10,
            "category": "Fiction",
            "description": "A story about the American dream.",
            "quantity": 100,
            "inStock": true,
            "createdAt": "2024-11-19T10:23:45.123Z",
            "updatedAt": "2024-11-19T10:23:45.123Z"
        }
    }

### 4. Update a Book

#### EndPoint: `/api/products/:productId`

#### Method: `PUT`

#### Request Body:

    {
        "price": 15,
        "quantity": 25
    }

#### Response:

    {
        "message": "Book updated successfully",
        "status": true,
        "data": {
            "_id": "648a45e5f0123c45678d9012",
            "title": "The Great Gatsby",
            "author": "F. Scott Fitzgerald",
            "price": 15,
            "category": "Fiction",
            "description": "A story about the American dream.",
            "quantity": 25,
            "inStock": true,
            "createdAt": "2024-11-19T10:23:45.123Z",
            "updatedAt": "2024-11-19T11:00:00.000Z"
        }
    }

### 5. Delete a Book

#### EndPoint: `/api/products/:productId`

#### Method: `DELETE`

#### Response:

    {
        "message": "Book deleted successfully",
        "status": true,
        "data": {}
    }

### 5. Order a Book

#### EndPoint: `/api/orders`

#### Method: `POST`

#### Request Body:

    {
        "email": "customer@example.com",
        "product": "648a45e5f0123c45678d9012",
        "quantity": 2,
        "totalPrice": 30
    }

#### Response:

    {
        "message": "Order created successfully",
        "status": true,
        "data": {
            "_id": "648b45f5e1234b56789a6789",
            "email": "customer@example.com",
            "product": "648a45e5f0123c45678d9012",
            "quantity": 2,
            "totalPrice": 30,
            "createdAt": "2024-11-19T12:00:00.000Z",
            "updatedAt": "2024-11-19T12:00:00.000Z"
        }
    }

### 7. Calculate Revenue from Orders

#### EndPoint: `/api/orders/revenue`

#### Method: `GET`

#### Response:

    {
        "message": "Revenue calculated successfully",
        "status": true,
        "data": {
            "totalRevenue": 450
        }
    }

### Error Response

The error responses follow a consistent format

```
{
  "message": "Validation failed",
  "success": false,
  "error": {
    "name": "ValidationError",
    "errors": {
      "price": {
        "message": "Price cannot be negative",
        "name": "ValidatorError",
        "properties": {
          "message": "Price cannot be negative",
          "type": "min",
          "min": 0
        },
        "kind": "min",
        "path": "price",
        "value": -5
      }
    }
  },
  "stack": "Error: Something went wrong\n    at app.js:23:13\n    at..."
}
```

## Acknowledgments

- Special thanks to MongoDB and Mongoose for their robust database solutions.
- Thanks to Express.js for simplifying the development of the REST API.
