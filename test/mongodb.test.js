const { app, server } = require('../app.js');
const { connectDB,disconnectDB } = require('../db.js')
const request = require('supertest');
const Payment = require('../app.js');
const mongoose = require("mongoose");


describe('MongoDB Functionality Test Suite', () => {
  beforeAll(async () => {
    connectDB();
  });

  afterAll(async () => {
    await disconnectDB();
    server.close();
  });

  afterEach(async () => {
    // Clean up the database after each test
    await mongoose.connection.dropDatabase();
  });

  it('should save payment data to the database', async () => {
    const paymentData = {
      fullname: 'John Doe',
      email: 'john@example.com',
    };

    const res = await request(app).post('/submit').send(paymentData);
    expect(res.status).toBe(200);

    const savedPayment = await Payment.findOne({ fullname: 'John Doe' });
    expect(savedPayment).toBeTruthy();  
    expect(savedPayment.email).toBe('john@example.com');
  });

  it('should return 500 if an error occurs while saving data', async () => {
    jest.spyOn(mongoose.Model.prototype, 'save').mockRejectedValue(new Error('Database error'));

    const paymentData = {
      fullname: 'Jane Doe',
      email: 'jane@example.com',
    };

    const res = await request(app)
      .post('/submit')
      .send(paymentData);

    expect(res.status).toBe(500);
    expect(res.body).toEqual({ error: 'An error occurred while saving the data.' });
  });
});