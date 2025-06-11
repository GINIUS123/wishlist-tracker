📦 Wishlist Tracker – Developer Guide
A simple web app to track your wishlist product prices across different websites.
Built with Node.js, MongoDB, Vue 3, and Playwright.

📁 Project Structure
bash
Copy
Edit
wishlist-tracker/
│
├── backend/              # Node.js + Express + MongoDB backend
│   ├── routes/
│   ├── services/
│   └── server.js
│
└── frontend/             # Vue 3 frontend (Vite-powered)
    └── frontend/
        ├── views/
        ├── components/
        └── App.vue
▶️ Run the Application
✅ Start Backend Server
bash
Copy
Edit
cd backend
node server.js
Server runs at: http://localhost:5000

🧪 🔥 IMPORTANT: Test Tools (Backend Only)
⚠️ Note: These tests require the backend server to be running and MongoDB to be connected.

🔍 Test Price Checker

bash


cd backend
node services/testPriceChecker.js
📧 Test Email Functionality

bash


cd backend
node services/testEmail.js
🌐 Test MongoDB Connection

bash


cd backend
node testConnection.js


✅ Start Frontend Server
bash


cd frontend/frontend
npm install   # Run only once
npm run dev
Frontend opens at: http://localhost:5173

🧪 POST Request Example (via Postman)
URL:

bash
Copy
Edit
http://localhost:5000/api/wishlist
Method: POST

Headers:

http
Copy
Edit
Content-Type: application/json
Body:

json
Copy
Edit
{
  "userId": "681d44152d8a2cf195495119",
  "productUrl": "https://www.amazon.de/dp/B08N5WRWNW"
}
📝 Notes
Ensure MongoDB is connected and accessible before starting the backend.

Use a valid userId from your MongoDB database (view with MongoDB Compass).

productUrl must be a valid product link (e.g., from Amazon, Nike, etc.).

Price checking runs every 6 hours via a cron job in services/priceTracker.js.
