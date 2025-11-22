# Organ Donation API Backend

A complete RESTful API backend for managing organ donation registrations and contact inquiries.

## 🚀 Features

- **Donor Registration Management**: Secure storage and retrieval of organ donor registrations
- **Contact Form Handling**: Management of general inquiries and contact submissions
- **Admin Dashboard Support**: Protected endpoints for administrative operations
- **MongoDB Integration**: Non-relational database with Mongoose ODM
- **Input Validation**: Comprehensive data validation and sanitization
- **Error Handling**: Centralized error handling with meaningful responses
- **Security**: API key-based authentication for admin routes

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB Atlas account or local MongoDB installation
- npm or yarn package manager

## 🛠️ Installation

1. **Clone and setup the project:**
   ```bash
   npm install
   ```

2. **Configure environment variables:**
   Create a `.env` file in the root directory with the following variables:
   ```env
   PORT=5000
   MONGO_URI="mongodb+srv://<YOUR_DB_USER>:<YOUR_DB_PASSWORD>@cluster0.abcde.mongodb.net/OrganDonationDB?retryWrites=true&w=majority"
   ADMIN_API_KEY="a-secure-random-key-12345"
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **For production:**
   ```bash
   npm start
   ```

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api/v1
```

### Public Endpoints

#### Register Donor
- **POST** `/register/donor`
- **Description**: Register a new organ donor
- **Body**:
  ```json
  {
    "fullName": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "birthDate": "1990-01-01",
    "organChoice": "All",
    "specificOrgans": ["Heart", "Liver"]
  }
  ```

#### Submit Contact Form
- **POST** `/contact`
- **Description**: Submit a general inquiry
- **Body**:
  ```json
  {
    "name": "Jane Smith",
    "email": "jane@example.com",
    "subject": "Question about donation process",
    "message": "I have some questions about the organ donation process..."
  }
  ```

### Admin Endpoints (Require API Key)

All admin endpoints require the `x-api-key` header with a valid API key.

#### Get All Donors
- **GET** `/admin/donors?page=1&limit=10`
- **Description**: Retrieve all donor registrations with pagination

#### Get All Contacts
- **GET** `/admin/contacts?page=1&limit=10`
- **Description**: Retrieve all contact submissions with pagination

#### Mark Contact as Resolved
- **PATCH** `/admin/contact/:id`
- **Description**: Mark a specific contact submission as resolved

### Health Check
- **GET** `/health`
- **Description**: Check API status

## 🗄️ Database Models

### DonorRegistration
- `fullName` (String, required)
- `email` (String, required, unique)
- `phone` (String, optional)
- `birthDate` (Date, required)
- `organChoice` (String, enum: ['All', 'Specific'])
- `specificOrgans` (Array of Strings)
- `isConfirmed` (Boolean, default: true)
- `createdAt` (Date, default: Date.now)

### ContactSubmission
- `name` (String, required)
- `email` (String, required)
- `subject` (String, required)
- `message` (String, required)
- `isResolved` (Boolean, default: false)
- `createdAt` (Date, default: Date.now)

## 🔒 Security Features

- **API Key Authentication**: Admin routes protected with API key validation
- **Input Validation**: Comprehensive validation using Mongoose schemas
- **Email Uniqueness**: Prevents duplicate donor registrations
- **CORS Enabled**: Cross-origin resource sharing configured
- **Error Handling**: Centralized error handling with sanitized responses

## 🧪 Testing the API

You can test the API using tools like Postman, curl, or any HTTP client:

```bash
# Register a donor
curl -X POST http://localhost:5000/api/v1/register/donor \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "John Doe",
    "email": "john@example.com",
    "birthDate": "1990-01-01",
    "organChoice": "All"
  }'

# Submit contact form
curl -X POST http://localhost:5000/api/v1/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Smith",
    "email": "jane@example.com",
    "subject": "Question",
    "message": "Test message"
  }'

# Get all donors (admin)
curl -X GET http://localhost:5000/api/v1/admin/donors \
  -H "x-api-key: a-secure-random-key-12345"
```

## 📁 Project Structure

```
organ-donation-api/
├── config/
│   └── database.js          # MongoDB connection
├── controllers/
│   ├── adminController.js   # Admin operations
│   ├── contactController.js # Contact form handling
│   └── donorController.js   # Donor registration
├── middleware/
│   ├── auth.js             # API key authentication
│   └── errorHandler.js     # Error handling
├── models/
│   ├── ContactSubmission.js # Contact model
│   └── DonorRegistration.js # Donor model
├── routes/
│   ├── adminRoutes.js      # Admin endpoints
│   ├── contactRoutes.js    # Contact endpoints
│   └── donorRoutes.js      # Donor endpoints
├── .env                    # Environment variables
├── package.json           # Dependencies
├── README.md             # Documentation
└── server.js            # Main application file
```

## 🚀 Deployment

For production deployment:

1. Set up a MongoDB Atlas cluster
2. Configure environment variables on your hosting platform
3. Use `npm start` to run the production server
4. Ensure your hosting platform supports Node.js applications

## 📝 License

MIT License - feel free to use this project for your organ donation initiatives.
