# Backend Setup

## Prerequisites
- Node.js
- MongoDB Atlas account

## Quick Start
1. `cd Task-Manager/backend`
2. `npm install`
3. Update `.env` (see below)
4. `npm start`

## .env Configuration
```
MONGO_URI=mongodb+srv://david_12:david123@cluster0.epnsxqw.mongodb.net/?retryWrites=true&w=majority
FRONT_END_URL=http://localhost:5173
JWT_SECRET=your-super-secret-jwt-key-here-change-in-production
```

**MongoDB Setup:**
1. Go to https://cloud.mongodb.com/v2/69df65a934ac1b72d0ab7d23#/clusters
2. Network Access → Add IP: `152.59.121.142/32` or `0.0.0.0/0` (dev)
3. Database Access → User `david_12`, password `david123`, role `readWriteAnyDatabase@admin`
4. **Important:** MONGO_URI password - NO `< >` brackets!

## Expected Output
```
Server is running on port 3000!
Database is connected
```

## Troubleshooting
- Auth failed: Check password (URL-decode special chars), Atlas user permissions
- Connect timeout: Whitelist IP
- Run `npm start` & share error
