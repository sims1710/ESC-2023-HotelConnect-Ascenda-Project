// Test code for the first feature
const {app, server} = require('../app.js');
const request = require("supertest");


describe('Backend test Cases for fetching hotels', () => {

  beforeAll((done) =>{
    process.env.PORT = 3002;
    server.on('listening', () => {
      done();
    });
  });

  afterAll((done) => {
    server.close(done);
  }, 5000);

  test('should respond with the contents of HomePage.html', async () => {
    const res = await request(app).get("/")
    expect(res.status).toBe(200);
  });

  test('should respond with hotel data and DisplayHotels.html', async () => {
    const destinationId = '050G';
    const checkinDate = '2023-09-21';
    const checkoutDate = '2023-10-01';
    const guests = 2;

    // Call the exported function from app.js using supertest
    const res = await request(app)
    .get(`/api/disphotels?destination_id=${destinationId}&checkin=${checkinDate}&checkout=${checkoutDate}&guests=${guests}`);
    expect(res.status).toBe(200);
    expect(res.body).toBeDefined();
  });

  test('should respond with an error for missing query parameters', async () => {
    const res = await request(app)
    .get('/api/disphotels?destination_id=12345&lang=en&currency=USD&checkin=2023-08-01&checkout=2023-08-05')
    expect(res.status).toBe(400);
  });

  test('should respond with an error for incorrect data types', async () => {
    const res = await request(app)
      .get('/api/disphotels?destination_id=abc&lang=en&currency=USD&checkin=2023-08-01&checkout=2023-08-05&country_code=US&guests=2&partner_id=xyz')
    expect(res.status).toBe(400);
  });

  test('should respond with hotel data but no hotel prices', async () => {
    const res = await request(app)
      .get('/api/disphotels?destination_id=6789&lang=en&currency=USD&checkin=2023-08-01&checkout=2023-08-05&country_code=US&guests=2&partner_id=54321')
      expect(res.status).toBe(200);
  });

  test('should respond with an error when the API is unreachable', async () => {
    try {
      const res = await request(app)
        .get('/api/disphotels?destination_id=RsBu&lang=en&currency=USD&checkin=2023-07-01&checkout=2023-08-05&country_code=US&guests=2&partner_id=54321');
      expect(res.status).toBe(500);
    } catch (error) {
      console.error('Caught error:', error);
      throw error;
    }
  });

  test('should respond with a 404 error for an invalid route', async () => {
    const res = await request(app)
      .get('/invalid_route')
    expect(res.status).toBe(404);
  });


});
