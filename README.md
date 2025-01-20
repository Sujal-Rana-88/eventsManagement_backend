# Event Management System - Backend

## Overview
The backend for the **Event Management System** handles user authentication, event creation, and retrieval using Firebase and Firestore. The backend is built with Node.js and Express.js and provides APIs to interact with the database.

## Features
- **Firebase Authentication**: Authenticate users via Firebase and manage user sessions.
- **Event Management**: Create and retrieve events based on user input and date.
- **Rate Limiting**: Prevent abuse of API with a request rate limiter.

## Prerequisites
- Node.js installed on your system.
- Firebase project set up with Firestore.
- `.env` file with the following variables:
  plaintext
  PORT=5000
  FIREBASE_TYPE=service_account
  FIREBASE_PROJECT_ID=<your-project-id>
  FIREBASE_PRIVATE_KEY_ID=<your-private-key-id>
  FIREBASE_PRIVATE_KEY=<your-private-key>
  FIREBASE_CLIENT_EMAIL=<your-client-email>
  FIREBASE_CLIENT_ID=<your-client-id>
  FIREBASE_AUTH_URI=https://accounts.google.com/o/oauth2/auth
  FIREBASE_TOKEN_URI=https://oauth2.googleapis.com/token
  FIREBASE_AUTH_PROVIDER_X509_CERT_URL=https://www.googleapis.com/oauth2/v1/certs
  FIREBASE_CLIENT_X509_CERT_URL=https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk
  JWT_SECRET=<your-jwt-secret>


## Installation
### 1. Clone the repository
- git clone https://github.com/yourusername/event-management-backend.git
- cd event-management-backend

### 2. Install dependencies
- npm install
### 3. Run backend
- node index.js or nodemon index.js(for instant rerender)

### 3. API Endpoints
**User Authentication**

*POST /create-user: Authenticate or create a new user.*
# Event Management:
*POST /events: Retrieve events for a user (with optional date filter).*
*POST /events/create: Create a new event for a user.*

## - Project Structure
- routes/: Contains API routes for user and event management.
- controller/: Implements the business logic for authentication and event handling.
- config/: Firebase configuration and initialization.
- index.js: Main entry point for the application.
- .env: contains all data of configurations
