const data = [
    {
        place:'Switzerland Alps',
        title:'SAINT',
        title2:'ANTONIEN',
        description:'Tucked away in the Switzerland Alps, Saint Antönien offers an idyllic retreat for those seeking tranquility and adventure alike. It\'s a hidden gem for backcountry skiing in winter and boasts lush trails for hiking and mountain biking during the warmer months.',
        image:'https://assets.codepen.io/3685267/timed-cards-1.jpg'
    },
    {
        place:'Japan Alps',
        title:'NANGANO',
        title2:'PREFECTURE',
        description:'Nagano Prefecture, set within the majestic Japan Alps, is a cultural treasure trove with its historic shrines and temples, particularly the famous Zenkō-ji. The region is also a hotspot for skiing and snowboarding, offering some of the country\'s best powder.',
        image:'https://assets.codepen.io/3685267/timed-cards-2.jpg'
    },
    {
        place:'Sahara Desert - Morocco',
        title:'MARRAKECH',
        title2:'MEROUGA',
        description:'The journey from the vibrant souks and palaces of Marrakech to the tranquil, starlit sands of Merzouga showcases the diverse splendor of Morocco. Camel treks and desert camps offer an unforgettable immersion into the nomadic way of life.',
        image:'https://assets.codepen.io/3685267/timed-cards-3.jpg'
    },
    {
        place:'Sierra Nevada - USA',
        title:'YOSEMITE',
        title2:'NATIONAL PARAK',
        description:'Yosemite National Park is a showcase of the American wilderness, revered for its towering granite monoliths, ancient giant sequoias, and thundering waterfalls. The park offers year-round recreational activities, from rock climbing to serene valley walks.',
        image:'https://assets.codepen.io/3685267/timed-cards-4.jpg'
    },
    {
        place:'Tarifa - Spain',
        title:'LOS LANCES',
        title2:'BEACH',
        description:'Los Lances Beach in Tarifa is a coastal paradise known for its consistent winds, making it a world-renowned spot for kitesurfing and windsurfing. The beach\'s long, sandy shores provide ample space for relaxation and sunbathing, with a vibrant atmosphere of beach bars and cafes.',
        image:'https://assets.codepen.io/3685267/timed-cards-5.jpg'
    },
    {
        place:'Cappadocia - Turkey',
        title:'Göreme',
        title2:'Valley',
        description:'Göreme Valley in Cappadocia is a historical marvel set against a unique geological backdrop, where centuries of wind and water have sculpted the landscape into whimsical formations. The valley is also famous for its open-air museums, underground cities, and the enchanting experience of hot air ballooning.',
        image:'https://assets.codepen.io/3685267/timed-cards-6.jpg'
    },
]

const _ = (id)=>document.getElementById(id)
const cards = data.map((i, index)=>`<div class="card" id="card${index}" style="background-image:url(${i.image})"  ></div>`).join('')



const cardContents = data.map((i, index)=>`<div class="card-content" id="card-content-${index}">
<div class="content-start"></div>
<div class="content-place">${i.place}</div>
<div class="content-title-1">${i.title}</div>
<div class="content-title-2">${i.title2}</div>

</div>`).join('')


const sildeNumbers = data.map((_, index)=>`<div class="item" id="slide-item-${index}" >${index+1}</div>`).join('')
_('demo').innerHTML =  cards + cardContents
_('slide-numbers').innerHTML =  sildeNumbers


const range = (n) =>
  Array(n)
    .fill(0)
    .map((i, j) => i + j);
const set = gsap.set;

function getCard(index) {
  return `#card${index}`;
}
function getCardContent(index) {
  return `#card-content-${index}`;
}
function getSliderItem(index) {
  return `#slide-item-${index}`;
}

function animate(target, duration, properties) {
  return new Promise((resolve) => {
    gsap.to(target, {
      ...properties,
      duration: duration,
      onComplete: resolve,
    });
  });
}

let order = [0, 1, 2, 3, 4, 5];
let detailsEven = true;
let isStepping = false;

let offsetTop = 200;
let offsetLeft = 700;
let cardWidth = 200;
let cardHeight = 300;
let gap = 40;
let numberSize = 50;
const ease = "sine.inOut";

function init() {
  const [active, ...rest] = order;
  const detailsActive = detailsEven ? "#details-even" : "#details-odd";
  const detailsInactive = detailsEven ? "#details-odd" : "#details-even";
  const { innerHeight: height, innerWidth: width } = window;
  offsetTop = height - 430;
  offsetLeft = width - 830;

  gsap.set("#pagination", {
    top: offsetTop + 330,
    left: offsetLeft,
    y: 200,
    opacity: 0,
    zIndex: 60,
  });
  gsap.set("nav", { y: -200, opacity: 0 });

  const prevArrow = document.querySelector(".arrow-left");
  const nextArrow = document.querySelector(".arrow-right");
  prevArrow?.addEventListener("click", () => queueStep("prev"));
  nextArrow?.addEventListener("click", () => queueStep("next"));

  gsap.set(getCard(active), {
    x: 0,
    y: 0,
    width: window.innerWidth,
    height: window.innerHeight,
  });
  gsap.set(getCardContent(active), { x: 0, y: 0, opacity: 0 });
  gsap.set(detailsActive, { opacity: 0, zIndex: 22, x: -200 });
  gsap.set(detailsInactive, { opacity: 0, zIndex: 12 });
  gsap.set(`${detailsInactive} .text`, { y: 100 });
  gsap.set(`${detailsInactive} .title-1`, { y: 100 });
  gsap.set(`${detailsInactive} .title-2`, { y: 100 });
  gsap.set(`${detailsInactive} .desc`, { y: 50 });
  gsap.set(`${detailsInactive} .cta`, { y: 60 });

  gsap.set(".progress-sub-foreground", {
    width: 500 * (1 / order.length) * (active + 1),
  });

  rest.forEach((i, index) => {
    gsap.set(getCard(i), {
      x: offsetLeft + 400 + index * (cardWidth + gap),
      y: offsetTop,
      width: cardWidth,
      height: cardHeight,
      zIndex: 30,
      borderRadius: 10,
    });
    gsap.set(getCardContent(i), {
      x: offsetLeft + 400 + index * (cardWidth + gap),
      zIndex: 40,
      y: offsetTop + cardHeight - 100,
    });
    gsap.set(getSliderItem(i), { x: (index + 1) * numberSize });
  });

  gsap.set(".indicator", { x: -window.innerWidth });

  const startDelay = 0.6;

  gsap.to(".cover", {
    x: width + 400,
    delay: 0.5,
    ease,
    onComplete: () => {
      setTimeout(() => {
        loop();
      }, 500);
    },
  });
  rest.forEach((i, index) => {
    gsap.to(getCard(i), {
      x: offsetLeft + index * (cardWidth + gap),
      zIndex: 30,
      delay: 0.05 * index,
      ease,
      delay: startDelay,
    });
    gsap.to(getCardContent(i), {
      x: offsetLeft + index * (cardWidth + gap),
      zIndex: 40,
      delay: 0.05 * index,
      ease,
      delay: startDelay,
    });
  });
  gsap.to("#pagination", { y: 0, opacity: 1, ease, delay: startDelay });
  gsap.to("nav", { y: 0, opacity: 1, ease, delay: startDelay });
  gsap.to(detailsActive, { opacity: 1, x: 0, ease, delay: startDelay });
}

let clicks = 0;

function queueStep(direction = "next") {
  if (isStepping) return;
  isStepping = true;
  step(direction).finally(() => {
    isStepping = false;
  });
}

function step(direction = "next") {
  return new Promise((resolve) => {
    if (direction === "next") {
      order.push(order.shift());
    } else {
      order.unshift(order.pop());
    }
    detailsEven = !detailsEven;

    const detailsActive = detailsEven ? "#details-even" : "#details-odd";
    const detailsInactive = detailsEven ? "#details-odd" : "#details-even";

    document.querySelector(`${detailsActive} .place-box .text`).textContent =
      data[order[0]].place;
    document.querySelector(`${detailsActive} .title-1`).textContent =
      data[order[0]].title;
    document.querySelector(`${detailsActive} .title-2`).textContent =
      data[order[0]].title2;
    document.querySelector(`${detailsActive} .desc`).textContent =
      data[order[0]].description;

    gsap.set(detailsActive, { zIndex: 22 });
    gsap.to(detailsActive, { opacity: 1, delay: 0.4, ease });
    gsap.to(`${detailsActive} .text`, {
      y: 0,
      delay: 0.1,
      duration: 0.7,
      ease,
    });
    gsap.to(`${detailsActive} .title-1`, {
      y: 0,
      delay: 0.15,
      duration: 0.7,
      ease,
    });
    gsap.to(`${detailsActive} .title-2`, {
      y: 0,
      delay: 0.15,
      duration: 0.7,
      ease,
    });
    gsap.to(`${detailsActive} .desc`, {
      y: 0,
      delay: 0.3,
      duration: 0.4,
      ease,
    });
    gsap.to(`${detailsActive} .cta`, {
      y: 0,
      delay: 0.35,
      duration: 0.4,
      onComplete: resolve,
      ease,
    });
    gsap.set(detailsInactive, { zIndex: 12 });

    const [active, ...rest] = order;
    const prv = direction === "next" ? rest[rest.length - 1] : rest[0];

    gsap.set(getCard(prv), { zIndex: 10 });
    gsap.set(getCard(active), { zIndex: 20 });
    gsap.to(getCard(prv), { scale: 1.5, ease });

    gsap.to(getCardContent(active), {
      y: offsetTop + cardHeight - 10,
      opacity: 0,
      duration: 0.3,
      ease,
    });
    gsap.to(getSliderItem(active), { x: 0, ease });
    gsap.to(getSliderItem(prv), { x: -numberSize, ease });
    gsap.to(".progress-sub-foreground", {
      width: 500 * (1 / order.length) * (active + 1),
      ease,
    });

    gsap.to(getCard(active), {
      x: 0,
      y: 0,
      ease,
      width: window.innerWidth,
      height: window.innerHeight,
      borderRadius: 0,
      onComplete: () => {
        const xNew = offsetLeft + (rest.length - 1) * (cardWidth + gap);
        gsap.set(getCard(prv), {
          x: xNew,
          y: offsetTop,
          width: cardWidth,
          height: cardHeight,
          zIndex: 30,
          borderRadius: 10,
          scale: 1,
        });

        gsap.set(getCardContent(prv), {
          x: xNew,
          y: offsetTop + cardHeight - 100,
          opacity: 1,
          zIndex: 40,
        });
        gsap.set(getSliderItem(prv), { x: rest.length * numberSize });

        gsap.set(detailsInactive, { opacity: 0 });
        gsap.set(`${detailsInactive} .text`, { y: 100 });
        gsap.set(`${detailsInactive} .title-1`, { y: 100 });
        gsap.set(`${detailsInactive} .title-2`, { y: 100 });
        gsap.set(`${detailsInactive} .desc`, { y: 50 });
        gsap.set(`${detailsInactive} .cta`, { y: 60 });
        clicks -= 1;
        if (clicks > 0) {
          step();
        }
      },
    });

    rest.forEach((i, index) => {
      if (i !== prv) {
        const xNew = offsetLeft + index * (cardWidth + gap);
        gsap.set(getCard(i), { zIndex: 30 });
        gsap.to(getCard(i), {
          x: xNew,
          y: offsetTop,
          width: cardWidth,
          height: cardHeight,
          ease,
          delay: 0.1 * (index + 1),
        });

        gsap.to(getCardContent(i), {
          x: xNew,
          y: offsetTop + cardHeight - 100,
          opacity: 1,
          zIndex: 40,
          ease,
          delay: 0.1 * (index + 1),
        });
        gsap.to(getSliderItem(i), { x: (index + 1) * numberSize, ease });
      }
    });
  });
}

async function loop() {
  await animate(".indicator", 0.5, { x: 0 });
  await animate(".indicator", 0.4, { x: window.innerWidth, delay: 0.3 });
  set(".indicator", { x: -window.innerWidth });
  await step();
  loop();
}

async function loadImage(src) {
  return new Promise((resolve, reject) => {
    let img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

async function loadImages() {
  const promises = data.map(({ image }) => loadImage(image));
  return Promise.all(promises);
}

async function start() {
  try {
    await loadImages();
    init();
  } catch (error) {
    console.error("One or more images failed to load", error);
  }
}

start()

// Interactivity & Modal Logic
function showToast(message) {
  const toast = document.getElementById('toast');
  if(!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

// Modal Elements
const modalOverlay = document.getElementById('modal-overlay');
const bookingModal = document.getElementById('booking-modal');
const successModal = document.getElementById('success-modal');
const infoModal = document.getElementById('info-modal');

const closeBooking = document.getElementById('close-booking');
const closeSuccess = document.getElementById('close-success');
const closeInfo = document.getElementById('close-info');

function openModal(modal) {
  modalOverlay.classList.add('active');
  modal.classList.add('active');
}

function closeAllModals() {
  modalOverlay.classList.remove('active');
  bookingModal.classList.remove('active');
  successModal.classList.remove('active');
  infoModal.classList.remove('active');
}

modalOverlay.addEventListener('click', closeAllModals);
closeBooking.addEventListener('click', closeAllModals);
closeSuccess.addEventListener('click', closeAllModals);
closeInfo.addEventListener('click', closeAllModals);

// Mock data for Destinations and Tours
const mockDestinations = [
  { name: 'Saint Antönien', img: 'https://assets.codepen.io/3685267/timed-cards-1.jpg', oldPrice: 1200, newPrice: 899, discount: '25% OFF' },
  { name: 'Nagano Prefecture', img: 'https://assets.codepen.io/3685267/timed-cards-2.jpg', oldPrice: 1500, newPrice: 1199, discount: '20% OFF' },
  { name: 'Marrakech', img: 'https://assets.codepen.io/3685267/timed-cards-3.jpg', oldPrice: 2000, newPrice: 1499, discount: '25% OFF' },
  { name: 'Yosemite', img: 'https://assets.codepen.io/3685267/timed-cards-4.jpg', oldPrice: 1000, newPrice: 850, discount: '15% OFF' }
];

const mockTours = [
  { name: 'Los Lances Beach', img: 'https://assets.codepen.io/3685267/timed-cards-5.jpg', oldPrice: 800, newPrice: 599, discount: 'Early Bird' },
  { name: 'Göreme Valley', img: 'https://assets.codepen.io/3685267/timed-cards-6.jpg', oldPrice: 450, newPrice: 350, discount: 'Hot Deal' },
  { name: 'Swiss Alpine Tour', img: 'https://assets.codepen.io/3685267/timed-cards-1.jpg', oldPrice: 600, newPrice: 499, discount: '15% OFF' }
];

function generateGrid(items) {
  return `
    <div class="dest-grid">
      ${items.map(item => `
        <div class="dest-card">
          <div class="discount-badge">${item.discount}</div>
          <div class="dest-card-img" style="background-image: url('${item.img}')"></div>
          <div class="dest-card-body">
            <div class="dest-card-title">${item.name}</div>
            <div class="dest-card-price">
              <span class="price-original">$${item.oldPrice}</span>
              <span class="price-discounted">$${item.newPrice}</span>
            </div>
            <button class="dest-card-btn" onclick="openQuickBook('${item.name}', ${item.newPrice})">Book Deal</button>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

// Quick book function for grid cards
window.openQuickBook = function(name, price) {
  closeAllModals();
  setTimeout(() => {
    document.getElementById('booking-dest-name').textContent = name;
    document.getElementById('booking-form').reset();
    priceDisplay.textContent = '$' + price;
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('booking-date').setAttribute('min', today);
    openModal(bookingModal);
  }, 300);
};

// Nav links functionality
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const section = e.target.textContent;
    document.getElementById('info-title').textContent = section;
    
    let content = '';
    switch(section.toUpperCase()) {
      case 'DESTINATIONS':
        content = '<p style="margin-bottom:15px; color:#ccc;">Explore popular destinations around the globe with exclusive online discounts. Limited time offers!</p>' + generateGrid(mockDestinations);
        break;
      case 'TOURS':
        content = '<p style="margin-bottom:15px; color:#ccc;">Discover curated tour packages. Book now to secure your spot and save big on the price difference.</p>' + generateGrid(mockTours);
        break;
      case 'ABOUT':
        content = `
          <div class="about-section">
            <img src="https://assets.codepen.io/3685267/timed-cards-3.jpg" alt="About Us" class="about-banner">
            <div class="about-text">
              <h3>Curating Unforgettable Experiences</h3>
              <p>Book Trip is a premier travel agency dedicated to making luxury travel accessible and seamless. With over 10 years of experience, we handpick the best destinations, ensuring you get premium value at discounted rates.</p>
              <div class="stats-grid">
                <div class="stat-box"><strong>50K+</strong><br>Happy Travelers</div>
                <div class="stat-box"><strong>120+</strong><br>Destinations</div>
                <div class="stat-box"><strong>24/7</strong><br>Support</div>
              </div>
            </div>
          </div>
        `;
        break;
      case 'CONTACT':
        content = `
          <div class="contact-section">
            <div class="contact-info">
              <div class="contact-item">
                <span class="icon">📍</span>
                <div><strong>Office</strong><br>123 Wanderlust Ave, NY 10001</div>
              </div>
              <div class="contact-item">
                <span class="icon">📞</span>
                <div><strong>Phone</strong><br>+1 (800) 123-4567</div>
              </div>
              <div class="contact-item">
                <span class="icon">✉️</span>
                <div><strong>Email</strong><br>hello@booktrip.com</div>
              </div>
            </div>
            <form class="contact-form" onsubmit="event.preventDefault(); showToast('Message Sent Successfully!'); document.getElementById('close-info').click();">
              <div class="input-group">
                <input type="text" placeholder="Your Name" required>
              </div>
              <div class="input-group">
                <input type="email" placeholder="Your Email" required>
              </div>
              <div class="input-group">
                <textarea placeholder="How can we help you?" rows="4" style="width: 100%; padding: 12px; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); border-radius: 8px; color: #fff; font-family: Inter;" required></textarea>
              </div>
              <button type="submit" class="submit-btn">Send Message</button>
            </form>
          </div>
        `;
        break;
      default:
        content = '<p>Information not available.</p>';
    }
    document.getElementById('info-content').innerHTML = content;
    openModal(infoModal);
  });
});

document.querySelector('.logo').addEventListener('click', (e) => {
  window.location.reload();
});

// Booking Form Logic
const TICKET_PRICE = 150; // Mock base price
const ticketsInput = document.getElementById('booking-tickets');
const priceDisplay = document.getElementById('booking-price');

ticketsInput.addEventListener('input', (e) => {
  const qty = e.target.value;
  priceDisplay.textContent = '$' + (qty * TICKET_PRICE);
});

// Dynamic buttons functionality
document.addEventListener('click', (e) => {
  // Open Booking Modal
  if (e.target.closest('.discover')) {
    const activePlace = data[order[0]].place;
    document.getElementById('booking-dest-name').textContent = activePlace;
    
    // Reset form
    document.getElementById('booking-form').reset();
    priceDisplay.textContent = '$' + TICKET_PRICE;
    
    // Set min date to today
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('booking-date').setAttribute('min', today);
    
    openModal(bookingModal);
  }
  
  // Bookmark Toggle
  if (e.target.closest('.bookmark')) {
    const btn = e.target.closest('.bookmark');
    btn.classList.toggle('active');
    if (btn.classList.contains('active')) {
      showToast(`Added to your Bookmarks!`);
      btn.style.backgroundColor = '#d35400';
    } else {
      showToast(`Removed from Bookmarks.`);
      btn.style.backgroundColor = '#ecad29';
    }
  }
});

// Handle Booking Submission
document.getElementById('booking-form').addEventListener('submit', (e) => {
  e.preventDefault();
  
  // Get values
  const dest = document.getElementById('booking-dest-name').textContent;
  const date = document.getElementById('booking-date').value;
  const qty = document.getElementById('booking-tickets').value;
  const name = document.getElementById('booking-name').value;
  
  // Populate Ticket
  document.getElementById('ticket-id').textContent = '#BT' + Math.floor(Math.random() * 1000000);
  document.getElementById('ticket-dest').textContent = dest;
  document.getElementById('ticket-date').textContent = date;
  document.getElementById('ticket-qty').textContent = qty;
  document.getElementById('ticket-name').textContent = name;
  
  // Transition to Success Modal
  bookingModal.classList.remove('active');
  setTimeout(() => {
    openModal(successModal);
  }, 300); // Wait for fade out
});

document.getElementById('download-ticket').addEventListener('click', () => {
  showToast('Downloading ticket...');
});