# Plate2Share Backend

This is the backend API for the Plate2Share application, built with Node.js, Express, and MongoDB.

## Features

- User authentication and authorization
- Food donation management
- User management (admin only)
- Notification system
- RESTful API endpoints

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

## Setup

1. Clone the repository
2. Navigate to the backend directory:
   ```bash
   cd backend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a `.env` file in the backend directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/plate2share
   JWT_SECRET=your_jwt_secret_key_here
   NODE_ENV=development
   ```
5. Start the server:
   ```bash
   npm start
   ```

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register a new user
- POST `/api/auth/login` - Login user
- GET `/api/auth/profile` - Get current user profile
- PATCH `/api/auth/profile` - Update user profile

### Donations
- POST `/api/donations` - Create new donation
- GET `/api/donations` - Get all donations (with filters)
- GET `/api/donations/:id` - Get single donation
- PATCH `/api/donations/:id/status` - Update donation status (admin only)
- DELETE `/api/donations/:id` - Delete donation (admin only)

### Notifications
- GET `/api/notifications` - Get user's notifications
- PATCH `/api/notifications/:id/read` - Mark notification as read
- PATCH `/api/notifications/read-all` - Mark all notifications as read
- DELETE `/api/notifications/:id` - Delete notification

### Users (Admin Only)
- GET `/api/users` - Get all users
- GET `/api/users/:id` - Get user by ID
- PATCH `/api/users/:id` - Update user
- DELETE `/api/users/:id` - Delete user
- GET `/api/users/stats/overview` - Get user statistics

## Error Handling

The API uses standard HTTP status codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error

## Security

- JWT-based authentication
- Password hashing with bcrypt
- Role-based access control
- Input validation and sanitization

## Development

To run the server in development mode with auto-reload:
```bash
npm run dev
```

## Testing

To run tests:
```bash
npm test
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request 