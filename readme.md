# Book Store REST API

This application is a complete REST API for managing a Book Store, built with Express, TypeScript, and MongoDB. It handles books, orders, user information, and cart management using Mongoose for schema definition and data validation. A payment gateway, Surjopay, has been integrated. Users can register, log in, change passwords, and reset passwords using a token received via the forgot password feature.

## Features

- **User Authentication & Authorization** using JWT tokens
- **User Management**: Register, log in, change password, forgot password, and reset password
- **Book Management**: Create, update, retrieve, and delete books (products)
- **Search & Retrieve** books by their respective ID
- **Cart Management**: Add books to the cart and manage items
- **Order Processing**: Place orders and update inventory accordingly
- **Payment Integration** with Surjopay

## API Endpoints

### Authentication

#### 1. Register

**Endpoint:** `/api/auth/register`  
**Method:** `POST`

**Request Body:**

```json
{
  "name": "John Doe",
  "phone": "0123456789",
  "email": "johndoe@example.com",
  "password": "test1234"
}
```

**Response:**

```json
{
  "success": true,
  "message": "User created successfully",
  "statusCode": 201,
  "data": {
    "_id": "67b29d3b8c8ba639fdeee4a3",
    "name": "John Doe",
    "email": "johndoe@example.com"
  }
}
```

#### 2. Login

**Endpoint:** `/api/auth/login`  
**Method:** `POST`

**Request Body:**

```json
{
  "email": "johndoe@example.com",
  "password": "test1234"
}
```

**Response:**

```json
{
  "success": true,
  "message": "User is logged in successfully!",
  "statusCode": 200,
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvaG5kb2VAZXhhbXBsZS5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3Mzk3NTk2MzUsImV4cCI6MTc0MDE5MTYzNX0.O9sfDOq_51Wl6-mNJ6FTXvf_splGEsBExU09wHv6ai0"
  }
}
```

#### 3. Change Password

**Endpoint:** `/api/auth/change-password`  
**Method:** `POST`

**Request Body:**

```json
{
  "oldPassword": "secure1234",
  "newPassword": "newPass2343"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Password is updated successfully!",
  "statusCode": 200,
  "data": null
}
```

**Description:** This endpoint allows users to change their password by providing their current password and the new password. The old password is validated, and if it matches the stored password, the new password is hashed and updated.

Error Response Example (Old Password Incorrect):

```json
{
  "success": false,
  "message": "Password do not matched",
  "statusCode": 403,
  "error": {
    "details": {
      "statusCode": 403
    }
  },
  "stack": null
}
```

#### 4. Forget Password

**Endpoint:** `/api/auth/forget-password`  
**Method:** `POST`

**Request Body:**

```json
{
  "email": "dummyemail@example.com"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Reset link is generated successfully!",
  "statusCode": 200
}
```

**Description:** This endpoint allows users to request a password reset by providing their registered email address. A reset link is sent to the provided email address.

Error Response Example (Old Password Incorrect):

```json
{
  "success": false,
  "message": "This user is not found !",
  "statusCode": 404,
  "error": {
    "details": {
      "statusCode": 404
    }
  },
  "stack": null
}
```

#### 4. Reset Password

**Endpoint:** `/api/auth/reset-password`  
**Method:** `POST`

**Request Body:**

```json
{
  "email": "dummyemail@example.com",
  "newPassword": "admin12345"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Password reset successfully!",
  "statusCode": 200
}
```

**Description:** This endpoint allows users to reset their password using the reset token they received after initiating the forget password process. It requires the email address and a new password.

Error Response Example (User Not Found):

```json
{
  "success": false,
  "message": "This user is not found!",
  "statusCode": 404,
  "error": {
    "details": {
      "statusCode": 404
    }
  },
  "stack": null
}
```

## Product Management

### 1. **Create Product**

**Endpoint:** `/api/product`  
**Method:** `POST`  
**Authentication:** Admin Only (Requires JWT Token)

**Request Body:**

```json
{
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "price": 15.99,
  "category": "Fiction",
  "description": "A novel about the American dream, wealth, and society in the Jazz Age.",
  "image": "https://i.ibb.co/rRx03QFc/book-1.jpg",
  "quantity": 50,
  "inStock": true
}
```

**Description:** This endpoint allows an admin to create a new product (book) in the store. The admin needs to provide the book details, including title, author, price, category, description, image URL, quantity, and stock availability.

Error Response Example (Unauthorized User):

```json
{
  "success": false,
  "message": "Invalid or expired token!",
  "statusCode": 401,
  "error": {
    "details": {
      "statusCode": 401
    }
  },
  "stack": null
}
```

### 2. **Get Product**

#### Endpoint:

`GET /api/product?title={title}&category={category}&page={page}&limit={limit}`

This API allows users to search for products using **title** and **category**. Additionally, it provides options for **pagination**.

#### Query Parameters:

- **title** (optional): A search term to filter products by **title**.
- **category** (optional): A search term to filter products by **category**.
- **page** (optional, default: `1`): The page number for pagination.
- **limit** (optional, default: `10`): The number of products per page.

#### Request Examples:

1. **Search for products by Title, with Pagination:**

`/api/product?title=Reclaim Your Heart&page=1&limit=1
`

```json
{
  "message": "Books retrieved successfully",
  "status": true,
  "data": [
    {
      "_id": "67b1b61f06b12cef318ab3f0",
      "title": "Reclaim Your Heart",
      "author": "Yasmin Mogahed",
      "price": 18,
      "category": "Religious",
      "description": "This book offers deep reflections on spirituality, personal struggles, and maintaining faith in difficult times. Yasmin Mogahed’s writing is emotional, insightful, and empowering for those seeking inner peace through Islam.",
      "image": "https://i.ibb.co/0R9thZrQ/image.png",
      "quantity": 52,
      "inStock": true,
      "createdAt": "2025-02-16T09:55:43.189Z",
      "updatedAt": "2025-02-16T09:55:43.189Z"
    }
  ]
}
```

---
