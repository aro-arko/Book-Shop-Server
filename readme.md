# BookShop REST API 📚

A feature-rich backend for an online bookstore with user authentication, product management, shopping cart, and payment integration. Built with Node.js, Express, TypeScript, and MongoDB.

## Live Backend URL

The live backend URL for the BookShop REST API is: [https://book-shop-server-api.vercel.app](https://book-shop-server-api.vercel.app)

## Technologies Used

![Node.js](https://img.shields.io/badge/Node.js-18.x-green)
![Express](https://img.shields.io/badge/Express-4.x-lightgrey)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-7.x-green)
![Mongoose](https://img.shields.io/badge/Mongoose-8.x-red)

## Installation

To run this project on your local machine, follow these steps:

1. **Clone the repository**:
   ```sh
   git clone https://github.com/your-username/book-store-api.git
   cd book-store-api
   ```

## Setting Up for Local Development

To run this project on your local machine, you need to create a `.env` file in the root directory of the project with the following environment variables:

```properties
NODE_ENV=development
PORT=5000
DATABASE_URL=your_mongodb_connection_string
BCRYPT_SALT_ROUNDS=12
JWT_ACCESS_SECRET=your_jwt_secret
JWT_ACCESS_EXPIRES_IN=5d
RESET_PASS_UI_LINK=your_frontend_reset_password_link
SP_ENDPOINT=your_shurjopay_endpoint
SP_USERNAME=your_shurjopay_username
SP_PASSWORD=your_shurjopay_password
SP_PREFIX=your_shurjopay_prefix
SP_RETURN_URL=your_shurjopay_return_url
SMTP_USER=your_smtp_user
SMTP_PASS=your_smtp_password
RESEND_API_KEY=your_resend_api_key
```

---

## Authentication API

This section of the BookShop API focuses on **User Authentication** and **Authorization**. It allows users to register, log in, and manage their account credentials securely using JWT (JSON Web Tokens). This section also supports password recovery via token-based reset.

### **Features** 🔐

- **User Registration**: Create a new user account
- **User Login**: Log in to an existing account
- **Change Password**: Update your password
- **Forgot Password**: Recover access by resetting the password
- **Password Reset**: Reset password via token for secure authentication

---

## **API Endpoints** 🌐

### 1. **User Registration**

**Endpoint**: `/api/auth/register`
**Method**: `POST`

**Description**:
Registers a new user in the system. Provide basic user information (name, phone, email, and password) to create a new account. The password is stored securely.

#### Request Body:

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

### 2. **User Login** 🔐

**Endpoint**: `/api/auth/login`  
**Method**: `POST`

**Description**:  
Logs in an existing user by verifying their email and password. Upon successful authentication, a **JWT token** (`accessToken`) is returned, which should be used for future requests to authenticate the user.

#### Request Body 📥:

```json
{
  "email": "johndoe@example.com",
  "password": "test1234"
}
```

- email: The email address of the user (must be registered).
- password: The user's password.

**Response 📤:**

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

#### 5. Reset Password

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

### 1. Create Product

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

### 2. Get Product

#### Endpoint:

`/api/product?title={title}&category={category}&page={page}&limit={limit}`
**Method:** `GET`

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

### 3. Get Product by ID

#### Endpoint:`GET /api/product/:id`

**Method:** `GET`

This API allows users to retrieve a product by its **ID**.

#### Request Parameters:

- **id**: The unique identifier of the product to retrieve (required).

#### Request Example:

`/api/product/67a60a6b9a4dc360bf9b210e
`
Response:

```json
{
  "message": "Book retrieved successfully",
  "status": true,
  "data": {
    "_id": "67b1b18a06b12cef318ab3b9",
    "title": "1984",
    "author": "George Orwell",
    "price": 21,
    "category": "Fiction",
    "description": "It is a dystopian novel set in a world of totalitarian surveillance and thought control. Orwell's chilling vision of a society controlled by 'Big Brother' remains relevant today.",
    "image": "https://i.ibb.co/21rDsnqP/1984.webp",
    "quantity": 99,
    "inStock": true,
    "createdAt": "2025-02-16T09:36:10.007Z",
    "updatedAt": "2025-02-16T09:36:10.007Z"
  }
}
```

### 4. Update Product

#### Endpoint: `/api/product/:id`

**Method:** `PUT`

This API allows **only admins** to update a product by its **ID**.

#### Request Parameters:

- **id**: The unique identifier of the product to update (required).

#### Request Body:

- You can update **any field** in the product.

#### Request Example:

`PATCH /api/product/67a60a6b9a4dc360bf9b210e
`

**Response:**

```json
{
  "message": "Book retrieved successfully",
  "status": true,
  "data": {
    "_id": "67b1b18a06b12cef318ab3b9",
    "title": "1984",
    "author": "George Orwell",
    "price": 21,
    "category": "Fiction",
    "description": "It is a dystopian novel set in a world of totalitarian surveillance and thought control. Orwell's chilling vision of a society controlled by 'Big Brother' remains relevant today.",
    "image": "https://i.ibb.co/21rDsnqP/1984.webp",
    "quantity": 99,
    "inStock": true,
    "createdAt": "2025-02-16T09:36:10.007Z",
    "updatedAt": "2025-02-16T09:36:10.007Z"
  }
}
```

### 5. Delete Product

#### Endpoint:`/api/product/:id`

**Method:** `DELETE`

This API allows **only admins** to delete a product by its **ID**.

#### Request Parameters:

- **id**: The unique identifier of the product to delete (required).

#### Request Example:

`/api/product/67b2c5cada65e7ee5f5096f5
`
**Response:**

```json
{
  "message": "Book deleted successfully",
  "status": true,
  "data": {}
}
```

## Order Management

### 1. Create Order

#### Endpoint:

`POST /api/order`

This API allows **only authenticated users** to create an order.

#### Request Body:

```json
{
  "products": [
    {
      "product": "67b1bdb6c4eef4ad21a973fc",
      "quantity": 1
    }
  ]
}
```

**products: An array of objects containing:**

- product (string, required): The unique product ID.
- quantity (integer, required): Number of units to order.

**Response:**:

```json
{
  "success": true,
  "message": "Order placed successfully",
  "statusCode": 201,
  "data": "https://sandbox.securepay.shurjopayment.com/spaycheckout/?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL3NhbmRib3guc2h1cmpvcGF5bWVudC5jb20vYXBpL2xvZ2luIiwiaWF0IjoxNzM5NzY5NzMwLCJleHAiOjE3Mzk3NzMzMzAsIm5iZiI6MTczOTc2OTczMCwianRpIjoiTUxsTkdNUXUwa2FsVll3MiIsInN1YiI6IjEiLCJwcnYiOiI4MDVmMzllZWZjYzY4YWZkOTgyNWI0MTIyN2RhZDBhMDc2YzQ5NzkzIn0.41bEERn5jxYNgmLslKXci1hUJDKhs68AGteTvXU9XGc&order_id=SP67b2c782a6f1b"
}
```

- data: Contains the payment link where the user can complete the payment for the order.
  Order Status:
- When an order is placed, its status will be set to "Pending" until the payment is successfully completed.
- Once the payment is confirmed, the order status will be updated to "Paid", and processing will begin.
- If the payment fails, the order will remain in the "Pending" state.

Note:

- Users must be authenticated to place an order.
- Orders may include multiple products.
- Payment must be completed for order processing to begin.

### 3. Verify Payment

#### Endpoint:

`GET /api/order/verify?order_id=SP67b2c782a6f1b`

This API allows users to verify the payment status of an order using the `order_id`.

#### Query Parameter:

- **order_id** (string, required): The unique order ID assigned during order creation.

#### Response (Success):

```json
{
  "success": true,
  "message": "Order verified successfully",
  "statusCode": 201,
  "data": [
    {
      "id": 84701,
      "order_id": "SP67b2c782a6f1b",
      "currency": "BDT",
      "amount": 21,
      "payable_amount": 21,
      "discount_amount": null,
      "disc_percent": 0,
      "received_amount": "10.0000",
      "usd_amt": 0,
      "usd_rate": 0,
      "is_verify": 0,
      "card_holder_name": null,
      "card_number": "accoxxxxxxxx",
      "phone_no": "01122334455",
      "bank_trx_id": "67b2c93b",
      "invoice_no": "SP67b2c782a6f1b",
      "bank_status": "Success",
      "customer_order_id": "67b2c781da65e7ee5f50970c",
      "sp_code": "1000",
      "sp_message": "Success",
      "name": "Arko",
      "email": "randomemail@gmail.com",
      "address": "Nagua-2nd",
      "city": "Kishoreganj",
      "value1": null,
      "value2": null,
      "value3": null,
      "value4": null,
      "transaction_status": null,
      "method": "iBanking",
      "date_time": "2025-02-17 11:29:31"
    }
  ]
}
```

### 4. Get User Orders

### Endpoint: `/api/order`

**Method:** `GET`

#### Access Control:

- Only authenticated users can access this endpoint.
- Users will only receive their own orders.

_Response (Success):_

```json
{
  "success": true,
  "message": "Order retrieved successfully",
  "statusCode": 201,
  "data": [
    {
      "transaction": {
        "id": "SP67b2bef7d112f",
        "transactionStatus": null,
        "bank_status": "Success",
        "date_time": "2025-02-17 10:45:53",
        "method": "Nagad",
        "sp_code": "1000",
        "sp_message": "Success"
      },
      "_id": "67b2bef6045f91f06e11798b",
      "user": "67b0a46b2572447d9c9648cf",
      "products": [
        {
          "product": "67b1bcaec4eef4ad21a973f3",
          "quantity": 1,
          "_id": "67b2bef6045f91f06e11798c"
        }
      ],
      "totalPrice": 21,
      "status": "Paid",
      "createdAt": "2025-02-17T04:45:42.380Z",
      "updatedAt": "2025-02-17T04:45:55.560Z",
      "__v": 0
    }
  ]
}
```

### 5. Get All User Order

**Endpoint: `/api/order/all`**

**Method:** `GET`

### Access Control:

- Only admins can access this endpoint.
- Returns all user orders.

**Response (Success):**

```json
{
  "success": true,
  "message": "Orders retrieved successfully",
  "statusCode": 200,
  "data": [
    {
      "_id": "67b2c781da65e7ee5f50970c",
      "user": "67a609749a4dc360bf9b20fc",
      "totalPrice": 21,
      "status": "Paid",
      "createdAt": "2025-02-17T05:22:09.144Z"
    },
    {
      "_id": "67b2c2d46bd68defe4952fd1",
      "user": "67a609749a4dc360bf9b2k3c",
      "totalPrice": 21,
      "status": "Paid",
      "createdAt": "2025-02-17T05:02:12.724Z"
    }
  ]
}
```

### 6. Get All Orders

This API allows an admin to retrieve all the orders placed by users.

**Endpoint : `/api/order/all`**

**Method:** `GET`

This API allows an admin to retrieve all the orders placed by users.

#### Access Control

- Only **admins** can access this endpoint.

#### Request

This API does not require any specific user data, but the request must be made by an admin to be successful.

#### Example Request

```json
{
  "success": true,
  "message": "Orders retrieved successfully",
  "statusCode": 200,
  "data": [
    {
      "_id": "67b2c781da65e7ee5f50970c",
      "user": "67a609749a4dc360bf9b20fc",
      "totalPrice": 21,
      "status": "Paid",
      "createdAt": "2025-02-17T05:22:09.144Z"
    },
    {
      "_id": "67b2c2d46bd68defe4952fd1",
      "user": "67a609749a4dc360bf9b2k3c",
      "totalPrice": 21,
      "status": "Paid",
      "createdAt": "2025-02-17T05:02:12.724Z"
    }
  ]
}
```

## User Management

### 1. Get All Users

This API allows an admin to retrieve all user information from the system.

**Endpoint:** `/api/user`

**Method:** `GET`

```json
{
  "success": true,
  "message": "Users retrieved successfully",
  "statusCode": 200,
  "data": [
    {
      "_id": "67a609749a4dc360bf9b20fc",
      "name": "John Doe",
      "email": "john@example.com",
      "createdAt": "2025-01-10T05:22:09.144Z"
    },
    {
      "_id": "67b1bdb6c4eef4ad21a973fc",
      "name": "Jane Smith",
      "email": "jane@example.com",
      "createdAt": "2025-02-01T05:30:12.724Z"
    }
  ]
}
```

### 2. Update User data

This API allows an authorized user to update their data (except email).

**Endpoint:** `api/user/:email`

**Method:** `PATCH`

### URL Parameters

- `email` (required): The email address of the user to be updated (e.g., `john@example.com`).

#### Access Control

- Only the **authorized user** (the user with the provided email) can update their data.
- **Email** cannot be updated through this API.

#### Request

The user must be authenticated and authorized to update their details. The request should not include the email field, as it cannot be updated.

#### Request Body

```json
{
  "name": "John Doe",
  "phone": "1234567890",
  "address": "123 Main St, Springfield",
  "city": "Springfield"
}
```

#### Success Response

```json
{
  "success": true,
  "message": "User is updated successfully",
  "statusCode": 200,
  "data": {
    "_id": "67b2c781da65e7ee5f50970d",
    "name": "John Doe",
    "email": "johndoe@example.com",
    "role": "user",
    "phone": "1234567890",
    "address": "123 Main St, Springfield",
    "city": "Springfield",
    "createdAt": "2025-01-10T05:22:09.144Z",
    "updatedAt": "2025-02-17T05:53:08.559Z"
  }
}
```

### 3. Get User Profile API

This API allows a user (including admins) to retrieve their own profile information.

#### Endpoint: `api/user/me`

**Method:** `GET`

#### Response:

```json
{
  "success": true,
  "message": "User is retrieved successfully",
  "statusCode": 200,
  "data": {
    "_id": "67b2c781da65e7ee5f50970d",
    "name": "John Doe",
    "email": "johndoe@example.com",
    "role": "user",
    "phone": "1234567890",
    "address": "123 Main St, Springfield",
    "city": "Springfield",
    "createdAt": "2025-01-10T05:22:09.144Z",
    "updatedAt": "2025-02-17T05:53:08.559Z"
  }
}
```

### 4. Get User by ID

This API allows an **admin** to retrieve information for any user by their unique user ID.

#### Endpoint: `api/user/:id`

**Method:** `GET`

#### Response:

```json
{
  "success": true,
  "message": "User is retrieved successfully",
  "statusCode": 200,
  "data": {
    "_id": "67b2c781da65e7ee5f50970d",
    "name": "John Doe",
    "email": "johndoe@example.com",
    "role": "user",
    "phone": "1234567890",
    "address": "123 Main St, Springfield",
    "city": "Springfield",
    "createdAt": "2025-01-10T05:22:09.144Z",
    "updatedAt": "2025-02-17T05:53:08.559Z"
  }
}
```

## Cart Management

### 1. Add to Cart API

This API allows a **user** to add a product to their cart.

#### Endpoint: `api/cart/add`

**Method:** `POST`

#### Request Body:

```json
{
  "productId": "67b1b18a06b12cef318ab3b9",
  "quantity": 2
}
```

#### Response:

```json
{
  "success": true,
  "message": "Product added to cart successfully",
  "statusCode": 201
}
```

### 2. Get Cart

This API allows a **user** to retrieve their own cart information.

#### Endpoint: `/api/cart`

**Method**: `GET`

#### Response:

```json
{
  "success": true,
  "message": "Cart retrieved successfully",
  "statusCode": 200,
  "data": {
    "_id": "67b1d5972673371f286d038a",
    "user": "67a609749a4dc360bf9b20fc",
    "items": [
      {
        "product": {
          "_id": "67b1bdb6c4eef4ad21a973fc",
          "title": "Rich Dad Poor Dad",
          "author": "Robert Kiyosaki",
          "price": 21,
          "category": "Fiction",
          "description": "A personal finance book that contrasts the financial philosophies of Kiyosaki’s two “dads” and teaches principles for wealth creation.",
          "image": "https://i.ibb.co/5XrrPdjf/image.png",
          "quantity": 107,
          "inStock": true,
          "createdAt": "2025-02-16T10:28:06.173Z",
          "updatedAt": "2025-02-17T05:29:58.914Z"
        },
        "quantity": 1,
        "_id": "67b2c2bd6bd68defe4956f28"
      }
    ],
    "totalPrice": 21,
    "createdAt": "2025-02-16T12:09:59.574Z",
    "updatedAt": "2025-02-17T06:09:17.240Z"
  }
}
```

### 3. Remove Product from Cart

This API allows a **user** to remove a product from their cart.

#### Endpoint: `/api/cart/remove/:id`

**Method**: `DELETE`

#### Response:

```json
{
  "success": true,
  "message": "Product removed from cart successfully",
  "statusCode": 200
}
```

### 4. Update Cart API

This API allows a **user** to update the quantity of a product by product id in their cart.

#### Endpoint: `api/cart/update/:id`

#### Request Body:

```json
{
  "quantity": 11
}
```

#### Response:

```json
{
  "success": true,
  "message": "Cart updated successfully",
  "statusCode": 200
}
```

## Acknowledgements

The BookShop REST API is built using the following open-source technologies:

- **Node.js:** A JavaScript runtime environment that executes JavaScript code server-side. (You can optionally link to: [https://nodejs.org/](https://nodejs.org/))
- **MongoDB:** A NoSQL document database. (You can optionally link to: [https://www.mongodb.com/](https://www.mongodb.com/))
- **Mongoose:** An Object Data Modeling (ODM) library for MongoDB and Node.js. (You can optionally link to: [https://mongoosejs.com/](https://mongoosejs.com/))
- **Express.js:** A web application framework for Node.js. (You can optionally link to: [https://expressjs.com/](https://expressjs.com/))
- **TypeScript:** A typed superset of JavaScript that compiles to plain JavaScript. (You can optionally link to: [https://www.typescriptlang.org/](https://www.typescriptlang.org/))
- **Surjopay:** The payment gateway used for processing transactions. (Link to their site if available)

We gratefully acknowledge the contributions of the developers and communities behind these projects.

## Support

We appreciate your interest in the BookShop REST API. For support or inquiries, please contact us through [email address or link to support forum].

## Feedback and Contributions

We welcome your feedback and contributions to the BookShop REST API! Please feel free to submit issues or pull requests on our [GitHub repository link, if applicable].

Best regards,

Aro Arko
