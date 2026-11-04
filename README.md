# Book Trip - Animated Travel Booking Site 🌍✈️

![Book Trip Preview](https://assets.codepen.io/3685267/timed-cards-3.jpg)

**Book Trip** is a stunning, fully-functional, frontend travel booking application built with modern web technologies. It features a beautiful, full-screen interactive slider built with GSAP and a complete glassmorphism-themed booking flow.

### 🔗 Live Demo
**[Experience Book Trip Here on Vercel](https://book-trip-animated.vercel.app)**

---

## ✨ Features

- **Immersive GSAP Animations:** A buttery-smooth, full-screen animated slider that lets you swipe through breathtaking destinations.
- **Glassmorphism UI:** Premium, blurred, semi-transparent modals that provide a modern and sleek aesthetic.
- **Functional Booking Flow:** Click "Book Now" to open a dynamic booking modal where users can pick dates, calculate prices based on the number of tickets, and receive a generated Success Ticket.
- **Dynamic Content:** The "Destinations" and "Tours" navigation links open a rich grid of travel deals, complete with original prices, discounted prices, and discount badges.
- **Interactive About & Contact Pages:** A beautifully designed Contact section with an integrated mockup form, alongside a detailed About section highlighting agency statistics.
- **Fully Responsive:** Beautifully crafted for both desktop and mobile users.

## 🛠️ Technology Stack

- **HTML5:** Semantic markup structure.
- **CSS3 (Vanilla):** Custom layout using CSS Grid and Flexbox, Glassmorphism, and responsive design principles.
- **JavaScript (Vanilla):** Dynamic DOM manipulation, state management, and modal interaction logic.
- **GSAP (GreenSock):** Advanced timeline and robust physics-based animations for the interactive card slider.
- **Vercel:** Deployed seamlessly for fast, secure global access.

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
4. **Start the Express backend and client:**
   ```bash
   npm start
   ```
   The application will be live at `http://localhost:3000`.

5. **Run test suite:**
   ```bash
   npm test
   ```

---

## 📡 Backend REST API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Health check endpoint |
| `GET` | `/api/slides` | Fetch travel destinations for GSAP slider |
| `GET` | `/api/destinations` | Fetch highlighted deals for destinations modal |
| `GET` | `/api/tours` | Fetch curated tours for tours modal |
| `GET` | `/api/bookings` | List all booked trips |
| `POST` | `/api/bookings` | Submit new booking with passenger and ticket details |
| `GET` | `/api/bookings/:id` | Retrieve booking details by booking ID |
| `GET` | `/api/contact` | Retrieve customer contact inquiries |
| `POST` | `/api/contact` | Submit contact message inquiry |

---
*Created as a freelance booking platform project.*
