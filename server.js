const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// In-memory data store
const slides = [
  {
    id: 1,
    place: 'Switzerland Alps',
    title: 'SAINT',
    title2: 'ANTONIEN',
    description: "Tucked away in the Switzerland Alps, Saint Antönien offers an idyllic retreat for those seeking tranquility and adventure alike. It's a hidden gem for backcountry skiing in winter and boasts lush trails for hiking and mountain biking during the warmer months.",
    image: 'https://assets.codepen.io/3685267/timed-cards-1.jpg',
    basePrice: 150
  },
  {
    id: 2,
    place: 'Japan Alps',
    title: 'NANGANO',
    title2: 'PREFECTURE',
    description: "Nagano Prefecture, set within the majestic Japan Alps, is a cultural treasure trove with its historic shrines and temples, particularly the famous Zenkō-ji. The region is also a hotspot for skiing and snowboarding, offering some of the country's best powder.",
    image: 'https://assets.codepen.io/3685267/timed-cards-2.jpg',
    basePrice: 180
  },
  {
    id: 3,
    place: 'Sahara Desert - Morocco',
    title: 'MARRAKECH',
    title2: 'MEROUGA',
    description: 'The journey from the vibrant souks and palaces of Marrakech to the tranquil, starlit sands of Merzouga showcases the diverse splendor of Morocco. Camel treks and desert camps offer an unforgettable immersion into the nomadic way of life.',
    image: 'https://assets.codepen.io/3685267/timed-cards-3.jpg',
    basePrice: 200
  },
  {
    id: 4,
    place: 'Sierra Nevada - USA',
    title: 'YOSEMITE',
    title2: 'NATIONAL PARAK',
    description: 'Yosemite National Park is a showcase of the American wilderness, revered for its towering granite monoliths, ancient giant sequoias, and thundering waterfalls. The park offers year-round recreational activities, from rock climbing to serene valley walks.',
    image: 'https://assets.codepen.io/3685267/timed-cards-4.jpg',
    basePrice: 120
  },
  {
    id: 5,
    place: 'Tarifa - Spain',
    title: 'LOS LANCES',
    title2: 'BEACH',
    description: "Los Lances Beach in Tarifa is a coastal paradise known for its consistent winds, making it a world-renowned spot for kitesurfing and windsurfing. The beach's long, sandy shores provide ample space for relaxation and sunbathing, with a vibrant atmosphere of beach bars and cafes.",
    image: 'https://assets.codepen.io/3685267/timed-cards-5.jpg',
    basePrice: 100
  },
  {
    id: 6,
    place: 'Cappadocia - Turkey',
    title: 'Göreme',
    title2: 'Valley',
    description: 'Göreme Valley in Cappadocia is a historical marvel set against a unique geological backdrop, where centuries of wind and water have sculpted the landscape into whimsical formations. The valley is also famous for its open-air museums, underground cities, and the enchanting experience of hot air ballooning.',
    image: 'https://assets.codepen.io/3685267/timed-cards-6.jpg',
    basePrice: 140
  }
];

const destinations = [
  { id: 1, name: 'Saint Antönien', img: 'https://assets.codepen.io/3685267/timed-cards-1.jpg', oldPrice: 1200, newPrice: 899, discount: '25% OFF' },
  { id: 2, name: 'Nagano Prefecture', img: 'https://assets.codepen.io/3685267/timed-cards-2.jpg', oldPrice: 1500, newPrice: 1199, discount: '20% OFF' },
  { id: 3, name: 'Marrakech', img: 'https://assets.codepen.io/3685267/timed-cards-3.jpg', oldPrice: 2000, newPrice: 1499, discount: '25% OFF' },
  { id: 4, name: 'Yosemite', img: 'https://assets.codepen.io/3685267/timed-cards-4.jpg', oldPrice: 1000, newPrice: 850, discount: '15% OFF' }
];

const tours = [
  { id: 1, name: 'Los Lances Beach', img: 'https://assets.codepen.io/3685267/timed-cards-5.jpg', oldPrice: 800, newPrice: 599, discount: 'Early Bird' },
  { id: 2, name: 'Göreme Valley', img: 'https://assets.codepen.io/3685267/timed-cards-6.jpg', oldPrice: 450, newPrice: 350, discount: 'Hot Deal' },
  { id: 3, name: 'Swiss Alpine Tour', img: 'https://assets.codepen.io/3685267/timed-cards-1.jpg', oldPrice: 600, newPrice: 499, discount: '15% OFF' }
];

const bookings = [];
const contacts = [];

// REST API Endpoints
app.get('/api/slides', (req, res) => {
  res.json({ success: true, data: slides });
});

app.get('/api/destinations', (req, res) => {
  res.json({ success: true, data: destinations });
});

app.get('/api/tours', (req, res) => {
  res.json({ success: true, data: tours });
});

app.post('/api/bookings', (req, res) => {
  const { destination, date, tickets, name, email, phone, price } = req.body;
  if (!destination || !date || !tickets || !name || !email) {
    return res.status(400).json({ success: false, message: 'Missing required booking fields.' });
  }

  const bookingId = 'BT' + Math.floor(100000 + Math.random() * 900000);
  const newBooking = {
    id: bookingId,
    destination,
    date,
    tickets: Number(tickets),
    name,
    email,
    phone: phone || '',
    totalPrice: price,
    createdAt: new Date().toISOString()
  };

  bookings.push(newBooking);
  res.status(201).json({ success: true, booking: newBooking });
});

app.get('/api/bookings/:id', (req, res) => {
  const booking = bookings.find(b => b.id === req.params.id);
  if (!booking) {
    return res.status(404).json({ success: false, message: 'Booking not found.' });
  }
  res.json({ success: true, booking });
});

app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'Name, email, and message are required.' });
  }

  const newContact = {
    id: 'C' + Date.now(),
    name,
    email,
    message,
    createdAt: new Date().toISOString()
  };

  contacts.push(newContact);
  res.status(201).json({ success: true, message: 'Contact submission received.', contact: newContact });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

module.exports = app;
