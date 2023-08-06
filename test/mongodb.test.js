const mongoose = require('mongoose');
const { app, server } = require('../app');
const request = require('supertest');
const Payment = require('../app.js');

describe('MongoDB Functionality Test Suite', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/test-paymentdb', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    // Close the database connection and stop the Express server
    await mongoose.connection.close();
    server.close();
  });

  beforeEach(async () => {
    // Clear the test database before each test
    await Payment.deleteMany({});
  });

  test('should save payment data to the database', async () => {
    const paymentData = {
      fullname: 'John Doe',
      email: 'john@example.com',
    };

    const res = await request(app).post('/submit').send(paymentData);
    expect(res.status).toBe(302);

    const savedPayment = await Payment.findOne({ fullname: 'John Doe' });
    expect(savedPayment).toBeTruthy();  
    expect(savedPayment.email).toBe('john@example.com');
  });

  test('should retrieve payment data from the database', async () => {
    const samplePayment = new Payment({
      fullname: 'Jane Smith',
      email: 'jane@example.com',
    });
    await samplePayment.save();

    const res = await request(app).get('/api/get-payment');
    expect(res.status).toBe(200);
    expect(res.body.fullname).toBe('Jane Smith');
    expect(res.body.email).toBe('jane@example.com');
  });

});