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

## 🔌 Backend REST API Endpoints

- `GET /api/health`: Server health status, uptime, and state.
- `GET /api/slides`: Interactive slide cards with base pricing and scenery details.
- `GET /api/destinations`: Curated top destinations with active discounts.
- `GET /api/tours`: Tour packages and deal offerings.
- `GET /api/bookings`: Retrieve list of all confirmed bookings.
- `GET /api/bookings/:id`: Retrieve single booking by reservation ID.
- `POST /api/bookings`: Create and confirm a travel reservation with validation.
- `POST /api/contact`: Send a contact and inquiry message.

## 🚀 Running Locally

1. **Clone the repository:**
   ```bash
   git clone https://github.com/nijjukrr/BOOK-TRIP.git
   cd BOOK-TRIP
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Start the application server:**
   ```bash
   npm start
   ```
   Open `http://localhost:3000` in your web browser.

4. **Run tests:**
   ```bash
   npm test
   ```

---
*Created as a freelance booking platform project.*
