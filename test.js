const test = require('node:test');
const assert = require('node:assert/strict');
const app = require('./server');

let server;
let baseUrl;

test.before((t, done) => {
  server = app.listen(0, () => {
    const port = server.address().port;
    baseUrl = `http://localhost:${port}`;
    done();
  });
});

test.after((t, done) => {
  server.close(done);
});

test('GET /api/slides returns slides data', async () => {
  const res = await fetch(`${baseUrl}/api/slides`);
  assert.strictEqual(res.status, 200);
  const data = await res.json();
  assert.strictEqual(data.success, true);
  assert.ok(Array.isArray(data.data));
  assert.ok(data.data.length >= 6);
});

test('GET /api/destinations returns destinations data', async () => {
  const res = await fetch(`${baseUrl}/api/destinations`);
  assert.strictEqual(res.status, 200);
  const data = await res.json();
  assert.strictEqual(data.success, true);
  assert.ok(Array.isArray(data.data));
  assert.ok(data.data.length >= 4);
});

test('GET /api/tours returns tours data', async () => {
  const res = await fetch(`${baseUrl}/api/tours`);
  assert.strictEqual(res.status, 200);
  const data = await res.json();
  assert.strictEqual(data.success, true);
  assert.ok(Array.isArray(data.data));
  assert.ok(data.data.length >= 3);
});

test('POST /api/bookings creates booking and GET /api/bookings/:id retrieves it', async () => {
  const bookingData = {
    destination: 'Switzerland Alps',
    date: '2025-06-15',
    tickets: 2,
    name: 'Alice Smith',
    email: 'alice@example.com',
    phone: '+123456789',
    price: '$300'
  };

  const postRes = await fetch(`${baseUrl}/api/bookings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(bookingData)
  });

  assert.strictEqual(postRes.status, 201);
  const postJson = await postRes.json();
  assert.strictEqual(postJson.success, true);
  assert.ok(postJson.booking.id);
  assert.strictEqual(postJson.booking.name, 'Alice Smith');

  const getRes = await fetch(`${baseUrl}/api/bookings/${postJson.booking.id}`);
  assert.strictEqual(getRes.status, 200);
  const getJson = await getRes.json();
  assert.strictEqual(getJson.success, true);
  assert.strictEqual(getJson.booking.destination, 'Switzerland Alps');
});

test('POST /api/bookings validates missing parameters', async () => {
  const res = await fetch(`${baseUrl}/api/bookings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'Incomplete' })
  });

  assert.strictEqual(res.status, 400);
  const json = await res.json();
  assert.strictEqual(json.success, false);
});

test('GET /api/bookings/:id returns 404 for non-existent booking', async () => {
  const res = await fetch(`${baseUrl}/api/bookings/BT99999999`);
  assert.strictEqual(res.status, 404);
  const json = await res.json();
  assert.strictEqual(json.success, false);
  assert.strictEqual(json.message, 'Booking not found.');
});

test('POST /api/contact records contact message', async () => {
  const contactData = {
    name: 'Bob Johnson',
    email: 'bob@example.com',
    message: 'Hello, inquiring about group tours.'
  };

  const res = await fetch(`${baseUrl}/api/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(contactData)
  });

  assert.strictEqual(res.status, 201);
  const json = await res.json();
  assert.strictEqual(json.success, true);
  assert.ok(json.contact.id);
  assert.strictEqual(json.contact.name, 'Bob Johnson');
});

test('POST /api/contact validates missing contact fields', async () => {
  const res = await fetch(`${baseUrl}/api/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'Bob' })
  });

  assert.strictEqual(res.status, 400);
  const json = await res.json();
  assert.strictEqual(json.success, false);
});

test('Static files serving (index.html)', async () => {
  const res = await fetch(`${baseUrl}/index.html`);
  assert.strictEqual(res.status, 200);
  const text = await res.text();
  assert.ok(text.includes('<title>Book Trip'));
});
