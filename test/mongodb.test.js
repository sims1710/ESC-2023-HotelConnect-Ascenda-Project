const mongoose = require('mongoose');
const { app, server } = require('../app.js');
const { connectDB,disconnectDB } = require('../db.js')
const request = require('supertest');
const Payment = require('../app.js');

//
//#MongooseError: Can't call `openUri()` on an active connection with different connection strings. Make sure you aren't calling `mongoose.connect()` multiple 
//times. See: https://mongoosejs.com/docs/connections.html#multiple_connections

jest.mock('mongoose');
const MockedModel = {
  find: jest.fn(),

};

describe('MongoDB Functionality Test Suite', () => {
  beforeAll(async () => {
    connectDB();
  });

  afterAll(async () => {
    disconnectDB();
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
    expect(res.status).toBe(302);

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