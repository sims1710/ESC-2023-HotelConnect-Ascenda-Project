// Test code for the first feature
const supertest = require('supertest');
const app = require('./app.js'); // Replace './app' with the correct path to your app.js file

describe('Test Cases for Express App', function () {
  it('should respond with the contents of HomePage.html', function (done) {
    supertest(app)
      .get('/')
      .expect(200, done);
  });

  it('should respond with hotel data and DisplayHotels.html', function (done) {
    const destinationId = 12345;
    const checkinDate = '2023-08-01';
    const checkoutDate = '2023-08-05';
    const guests = 2;

    // Call the exported function from app.js
    app.getHotelsData(destinationId, checkinDate, checkoutDate, guests)
      .then(() => {
        // Add any assertions related to the getHotelsData function here if needed
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it('should respond with an error for missing query parameters', function (done) {
    supertest(app)
      .get('/api/disphotels?destination_id=12345&lang=en&currency=USD&checkin=2023-08-01&checkout=2023-08-05&guests=2')
      .expect(400, done);
  });

  it('should respond with an error for incorrect data types', function (done) {
    supertest(app)
      .get('/api/disphotels?destination_id=abc&lang=en&currency=USD&checkin=2023-08-01&checkout=2023-08-05&country_code=US&guests=2&partner_id=xyz')
      .expect(400, done);
  });

  it('should respond with hotel data but no hotel prices', function (done) {
    supertest(app)
      .get('/api/disphotels?destination_id=67890&lang=en&currency=USD&checkin=2023-08-01&checkout=2023-08-05&country_code=US&guests=2&partner_id=54321')
      .expect(200, done);
  });

  it('should respond with an error when the API is unreachable', function (done) {
    supertest(app)
      .get('/api/disphotels?destination_id=12345&lang=en&currency=USD&checkin=2023-08-01&checkout=2023-08-05&country_code=US&guests=2&partner_id=54321')
      .expect(500, done);
  });

  it('should respond with a 404 error for an invalid route', function (done) {
    supertest(app)
      .get('/invalid_route')
      .expect(404, done);
  });

  it('should respond with the appropriate CORS headers for custom Origin', function (done) {
    supertest(app)
      .get('/')
      .set('Origin', 'http://example.com')
      .expect('Access-Control-Allow-Origin', 'http://example.com')
      .expect(200, done);
  });

  it('should respond with the appropriate CORS headers for Credentials', function (done) {
    supertest(app)
      .get('/')
      .set('Origin', 'http://example.com')
      .set('Credentials', true)
      .expect('Access-Control-Allow-Origin', 'http://example.com')
      .expect('Access-Control-Allow-Credentials', 'true')
      .expect(200, done);
  });

  it('should serve the static image file', function (done) {
    supertest(app)
      .get('/public/image.jpg')
      .expect(200, done);
  });
});