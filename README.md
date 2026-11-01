# Book Trip - Animated Travel Booking Site 🌍✈️

![Book Trip Preview](https://assets.codepen.io/3685267/timed-cards-3.jpg)

**Book Trip** is a stunning, full-stack travel booking application built with modern web technologies and an Express.js backend. It features a beautiful, full-screen interactive slider built with GSAP and a complete glassmorphism-themed booking flow connected end-to-end to REST API endpoints.

### 🔗 Live Demo
**[Experience Book Trip Here on Vercel](https://book-trip-animated.vercel.app)**

---

## ✨ Features

- **End-to-End Full-Stack Integration:** Connected frontend client to Express backend REST APIs for destinations, tours, slides, booking persistence, and contact forms.
- **Immersive GSAP Animations:** A buttery-smooth, full-screen animated slider that lets you swipe through breathtaking destinations.
- **Glassmorphism UI:** Premium, blurred, semi-transparent modals that provide a modern and sleek aesthetic.
- **Functional Booking Flow:** Click "Book Now" to open a dynamic booking modal where users can pick dates, calculate prices dynamically based on destination pricing and number of tickets, and receive a generated Success Ticket backed by API persistence.
- **Dynamic Content:** The "Destinations" and "Tours" navigation links open a rich grid of travel deals dynamically retrieved from the backend API, complete with original prices, discounted prices, and discount badges.
- **Interactive About & Contact Pages:** A beautifully designed Contact section with an integrated form connected to the backend API, alongside a detailed About section highlighting agency statistics.
- **Fully Responsive:** Beautifully crafted for both desktop and mobile users.

## 🛠️ Technology Stack

- **Backend:** Node.js, Express.js, CORS.
- **Frontend:** Vanilla JavaScript (ES6+), HTML5, CSS3 (CSS Grid & Flexbox, Glassmorphism).
- **Animations:** GSAP (GreenSock) for interactive physics-based slider animations.
- **Testing:** Node.js native test runner (`node:test`, `node:assert`).

## 🔌 REST API Endpoints

- `GET /api/slides` - Returns list of destination slides data for slider.
- `GET /api/destinations` - Returns discounted destinations deals.
- `GET /api/tours` - Returns curated tour packages.
- `POST /api/bookings` - Submits a new trip booking; responds with created booking details and booking ID.
- `GET /api/bookings/:id` - Retrieves booking details by ID.
- `POST /api/contact` - Submits contact inquiry message.

## 🚀 Running Locally

1. **Clone the repository:**
   ```bash
   git clone https://github.com/nijjukrr/BOOK-TRIP.git
   ```
2. **Navigate to the directory:**
   ```bash
   cd BOOK-TRIP
   ```
3. **Install dependencies:**
   ```bash
   npm install
   ```
4. **Start the server:**
   ```bash
   npm start
   ```
   Open `http://localhost:3000` in your browser.

## 🧪 Running Tests

Run the automated test suite using:
```bash
npm test
```

---
*Created as a freelance booking platform project.*
