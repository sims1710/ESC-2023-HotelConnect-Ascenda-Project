// Test code for disprooms
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

  it('should respond with hotel data and DisplayRoom.html', async () => {
    const validParams = {
        hotel_id: 'diH7',
        destination_id: 'WD0M',
        checkin: '2023-10-01',
        checkout: '2023-10-07',
        guests: '2',
        rooms:'2',
      };
    
    await new Promise((resolve) => setTimeout(() => resolve(), 500));
    const res = await request(app)
      .get('/api/disprooms')
      .query(validParams);
    expect(res.text).toContain("html");
    expect(res.status).toBe(200);
    expect(res.body).toBeDefined();
  });

  it('should respond with an error for missing query parameters', async () => {
    const missingParams = {
      hotel_id: 'RsBU',
      checkin: '2023-09-21',
      checkout: '2023-10-01',
    };
    await new Promise((resolve) => setTimeout(() => resolve(), 500));
    const res = await request(app)
    .get('/api/disprooms')
    .query(missingParams);
    expect(res.status).toBe(400);
    expect(res.text).toContain("Missing query parameter: destinationId");
  });

  it('should respond with an error for incorrect data types', async () => {
    const invalidParams = {
        hotel_id: 'ab*',
        destination_id: 'RsBu',
        checkin: '2023-09-21',
        checkout: '2023-10-01',
        guests: '2',
        rooms:'2',
      };
    await new Promise((resolve) => setTimeout(() => resolve(), 500));
    const res = await request(app)
      .get('/api/disprooms')
      .query(invalidParams);
    expect(res.status).toBe(400);
    expect(res.text).toContain("Invalid query parameter: hotelId");
  });

  it('should respond with a 404 error for an invalid route', async () => {
    await new Promise((resolve) => setTimeout(() => resolve(), 500));
    const res = await request(app)
      .get('/invalid_route')
    expect(res.status).toBe(404);
  });

  it('should return a 200 code if the parameters entered are correct, but the destination code does not return any hotels', async () => {
    const noHotels = {
        hotel_id: 'diG7',
        destination_id: 'RsBU',
        checkin: '2023-09-21',
        checkout: '2023-10-01',
        guests: '2',
        rooms:'2',
      };
    await new Promise((resolve) => setTimeout(() => resolve(), 500));
    const res = await request(app)
    .get('/api/disprooms')
    .query(noHotels);
    expect(res.status).toBe(200);
  });

  it('should respond with room data', async () => {
    const validParams = {
      hotelId: 'diG7',
      destinationId: 'WD0M',
      checkinDate: '2023-10-01',
      checkoutDate: '2023-10-07',
      guestVals: '2|2',
    };
    await new Promise((resolve) => setTimeout(() => resolve(), 500));
    const res = await request(app)
      .get('/api/getroomdetails');

    expect(res.status).toBe(200);
    expect(res.body).toBeDefined();
  });

  it('should respond with a 500 error for invalid data', async () => {
    const invalidParams = {
      hotel_id: 'RsBU',
      checkin: '2023-09-21',
      checkout: '',
    };

    const res = await request(app)
      .get('/api/getroomdetails');

    expect(res.status).toBe(500);
    expect(res.body.error).toBe('An error occurred while fetching hotel\'s room info.');
  });

  afterAll(async () => {
    await new Promise(resolve => setTimeout(() => resolve(), 500)); // avoid jest open handle error
    server.close();
  });
});