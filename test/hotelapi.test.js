// Test code for disphotel
const {app, server} = require('../app.js');
const request = require("supertest");

// #TODO: fix TSLWRAP/TCPWRAP whatever and let jest exit successfully

//cleanup any rejected promises
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection:', reason);
});

describe('Backend test Cases for fetching hotels', () => {

  beforeAll((done) =>{
    jest.setTimeout(10000); //10 sec timeout
    process.env.PORT = 3002;
    server.on('listening', () => {
      done();
    });
  });

  it('should respond with the contents of HomePage.html', async () => {
    await new Promise((resolve) => setTimeout(() => resolve(), 500));
    const res = await request(app).get("/");
    expect(res.status).toBe(200);
  });

  it('should respond with hotel data and DisplayHotels.html', async () => {
    const validParams = {
      destination_id: 'RsBU',
      checkin: '2023-09-21',
      checkout: '2023-10-01',
      guests: '2',
    };
    
    await new Promise((resolve) => setTimeout(() => resolve(), 500));
    const res = await request(app)
    .get(`/api/disphotels`)
    .query(validParams);
    expect(res.status).toBe(200);
    expect(res.body).toBeDefined();
  });

  it('should respond with an error for missing query parameters', async () => {
    const missingParams = {
      checkin: '2023-09-21',
      checkout: '2023-10-01',
  };
    await new Promise((resolve) => setTimeout(() => resolve(), 500));
    const res = await request(app)
    .get('/api/disphotels')
    .query(missingParams);
    expect(res.status).toBe(400);
    expect(res.text).toContain("Missing query parameter");
  });

  it('should respond with an error for incorrect data types', async () => {
    const invalidParams = {
      destination_id: '5678',
      checkin: '2023-09-21',
      checkout: '2023-10-01',
      guests: '2',
    };
    await new Promise((resolve) => setTimeout(() => resolve(), 500));
    const res = await request(app)
      .get('/api/disphotels')
      .query(invalidParams);
    expect(res.status).toBe(400);
    expect(res.text).toContain("Invalid query parameter");
  });

  it('should respond with a 404 error for an invalid route', async () => {
    await new Promise((resolve) => setTimeout(() => resolve(), 500));
    const res = await request(app)
      .get('/invalid_route')
    expect(res.status).toBe(404);
  });

  it('should return a 200 code if the parameters entered are correct, but the destination code does not return any hotels', async () => {
    const noHotels = {
      destination_id: 'S000',
      checkin: '2023-09-21',
      checkout: '2023-10-01',
      guests: '2',
    };
    await new Promise((resolve) => setTimeout(() => resolve(), 500));
    const res = await request(app)
    .get('/api/disphotels')
    .query(noHotels);
    expect(res.status).toBe(200);
    expect(res.body).toBeDefined();
  });

  afterAll(async () => {
    await new Promise(resolve => setTimeout(() => resolve(), 500)); // avoid jest open handle error
    server.close();
  });
});
