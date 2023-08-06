const stripe = require('stripe')('sk_test_51NYm3RLqzJj2zPxpXeYHtRBUzWlquc68Yk3fqFEX6kzQveB2Bpvg19G1kDFrTdwJsaVQVOdMmoviAiyxfVsVzVbU00yiJp03yT');
const { response } = require('express');
const { app, server } = require('../app');
const request = require('supertest');

describe('Stripe API Integration Test Suite', () => {
  beforeAll((done) => {
    process.env.PORT = 3003;
    server.on('listening', () => {
      done();
    });
  });

  afterAll((done) => {
    server.close(done);
  });

  test('should create a successful checkout session', async () => {
    const response = await request(app).post('/create-checkout-session').send({
        line_items: [
          {
            price: 'price_12345',
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: 'http://example.com/paymentsuccess',
        cancel_url: 'http://example.com/paymentcancel',
      
    });

    // Ensure the response status is a 303 redirect
    expect(response.status).toBe(303);

    // Ensure the response contains a session URL
    expect(response.header['location']).toBeTruthy();
  });

  test('should handle successful payment', async () => {
    const price = await stripe.prices.create({
      product: 'prod_ONhMmONRJXwXcC',
      unit_amount: 2000,
      currency: 'sgd',
    });

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: price.id,
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'http://example.com/paymentsuccess',
      cancel_url: 'http://example.com/paymentcancel',
    });

    const response = await request(app).get(session.success_url);

    // Ensure the response status is 200 OK
    expect(response.status).toBe(200);
  });

  test('should handle canceled payment', async () => {
    // Create a mock checkout session using the test API key
    const session = await stripe.checkout.sessions.create({
      line_items: [],
      mode: 'payment',
      success_url: 'http://example.com/paymentsuccess',
      cancel_url: 'http://example.com/paymentcancel',
    });

    // Make a request to the cancel URL to simulate canceled payment
    const response = await request(app).get(session.cancel_url);

    // Ensure the response status is 200 OK
    expect(response.status).toBe(200);

  });
});