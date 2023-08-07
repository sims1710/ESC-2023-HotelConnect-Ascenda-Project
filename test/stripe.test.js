require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);
//const { response } = require('express');
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

  test('should make successful price object', async() =>{
    const price = await stripe.prices.create({
      product: "prod_OPBZdNif2ZWBXQ",
      unit_amount: 2000,
      currency: 'sgd',
  
    });
  
    expect(price.unit_amount).toBe(2000)
    expect(price.currency).toBe("sgd")
    expect(price.product).toBe("prod_OPBZdNif2ZWBXQ")
    });
  
  
    test('should make successful checkout session', async() =>{
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price: "price_1NcNBwLqzJj2zPxpH1QG4gfZ",
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: 'http://example.com/paymentsuccess',
        cancel_url: 'http://example.com/paymentcancel',
      });
      expect(session.payment_status).toBe("unpaid")
      expect(session.status).toBe("open")
    });
  
    test('Stripe checkout bad request' , async() =>{
      try {
        const session = await stripe.checkout.sessions.create({
  
          mode: "payment",
          success_url: 'http://example.com/paymentsuccess',
          cancel_url: 'http://example.com/paymentcancel',
        });
      } catch (e) {
        console.log(e);
        expect(e.type).toBe( "StripeInvalidRequestError" )
      }
    });
  
    test('Stripe prices bad request' , async() =>{
      try {
        const price = await stripe.prices.create({
          product: "invalid id",
          unit_amount: 2000,
          // missing currency
      
        });
      } catch (e) {
        console.log(e);
        expect(e.type).toBe( "StripeInvalidRequestError" )
      }
    });
});