const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs').promises;
const stripe = require('stripe')('sk_test_51NYm3RLqzJj2zPxpXeYHtRBUzWlquc68Yk3fqFEX6kzQveB2Bpvg19G1kDFrTdwJsaVQVOdMmoviAiyxfVsVzVbU00yiJp03yT');


const port = process.env.port || 3001;
const pollingInterval = 3000; // 10 seconds (increase if needed)

//global variables
let hotelId;
let destinationId;
let checkinDate;
let checkoutDate;
let guestNum;
let actualprice;
let rooms;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'HomePage.html'));
});

// stripe section start


app.post('/create-checkout-session', async (req, res) => {


    const hotelPrice = actualprice; //need to make this to handle FLOAT values***

    const price = await stripe.prices.create({
      product: "prod_ONhMmONRJXwXcC",
      unit_amount: hotelPrice,
      currency: 'sgd',

    });

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          price: price.id,
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `http://127.0.1.1:${port}/paymentsuccess`,
      cancel_url: `http://127.0.1.1:${port}/paymentcancel`,
    });


  res.redirect(303, session.url);
});


app.get('/paymentstripe', (req, res) => {
  actualprice = Math.round(req.query.price)*100; //convert to cents
  res.sendFile(path.resolve(__dirname, 'public', 'Checkout.html'));
});

app.get('/paymentsuccess', (req, res)=>{
  res.sendFile(path.resolve(__dirname, 'public', 'Success.html'));
})

app.get('/paymentcancel', (req, res)=>{
  res.sendFile(path.resolve(__dirname, 'public', 'Cancel.html'));
})

// stripe section end

//to open the additional payment HTML file
app.get('/payment', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'Payment.html'));
});

//for mongodb
var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended:true
}))
var mongoose = require("mongoose");
mongoose.connect('mongodb+srv://flo:flo@website.ekqpnqp.mongodb.net/?retryWrites=true&w=majority',{ //the database is called paymentdb
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

const connectDB = async () => {
  try {
    let dbUrl = 'mongodb+srv://flo:flo@website.ekqpnqp.mongodb.net/?retryWrites=true&w=majority';
    if (process.env.NODE_ENV === 'test') {
      mongod = await MongoMemoryServer.create();
      dbUrl = mongod.getUri();
    }

    const conn = await mongoose.connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

const disconnectDB = async () => {
  try {
    await mongoose.connection.close();
    if (mongod) {
      await mongod.stop();
    }
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

const paymentSchema = new mongoose.Schema({ //schema = define structure for how data will be arranged and stored in collection
  fullname: String,
  email: String,
  specialreq: String,
  billaddress: String,
  cardno: String,
  cvc: String,
  cardexpM: Number,
  cardexpY: Number,
});

app.post('/submit', (req, res) => {
  const {
    fullname,
    email,
    specialreq,
    billaddress,
    cardno,
    cvc,
    cardexpM,
    cardexpY,
  } = req.body;

  const paymentData = new Payment({
    fullname,
    email,
    specialreq,
    billaddress,
    cardno,
    cvc,
    cardexpM,
    cardexpY,
  });

  paymentData.save()
    .then(() => {
      //console.log('Data Inserted Successfully');
      res.json('data saved');
      //res.redirect('/paymentstripe'); // Redirect after successful submission
    })
    .catch((err) => {
      console.error('Error saving data to the database:', err);
      res.status(500).send('An error occurred while saving the data.');
    });
});

const Payment = mongoose.model('Payment', paymentSchema); //creates Mongoose model named "Payment" based on the paymentSchema
//model = class of collection, all this is stored in payment collection in mongodb

//checking valid query parameters
function isValidNumber(str) {
  return /^[0-9]+$/.test(str);
}

function containsSpecialChars(str) {
  const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  return specialChars.test(str);
}

function isValidDate(dateString) {
  // Regular expression to match YYYY-MM-DD format
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  return dateRegex.test(dateString);
}

function containsOnlyNumbers(str) {
  return /^\d+$/.test(str);
}

function isValidDestinationID(id) {
  return !containsOnlyNumbers(id) && !containsSpecialChars(id) && id.length === 4;
}
function isValidHotelID(id) {
  return !containsSpecialChars(id) && (id.length === 4 || id.length === 5);
}

function isValidGuestNum(guestNum) {
  // Regular expression pattern to match "x | x | x" where x is an integer
  const pattern = /^(\d+\s\|\s)+\d+$/;
  return pattern.test(input);
}

function validateQueryParam(param, paramName, validatorFn) {
  if (param == null) {
    return {
      statusCode: 400,
      errorMessage: `Missing query parameter: ${paramName}`,
    };
  }
  if (!validatorFn(param)){
    return {
      statusCode: 400,
      errorMessage: `Invalid query parameter: ${paramName}`,
    }
  }
  return null; // Indicates no error
}

app.get('/api/disphotels', async (req, res) => {
  const destinationId = req.query.destination_id;
  const checkinDate = req.query.checkin;
  const checkoutDate = req.query.checkout;
  const guestNum = req.query.guests;

  const invalidParam = 
    validateQueryParam(destinationId, "destinationId", isValidDestinationID) ||
    validateQueryParam(checkinDate, "checkinDate", isValidDate) ||
    validateQueryParam(checkoutDate, "checkoutDate", isValidDate) ||
    validateQueryParam(guestNum, "guestNum", isValidGuestNum);

  if (invalidParam) {
    return res.status(invalidParam.statusCode).send(invalidParam.errorMessage);
  }

  else{
    try {
      const hotelsapi = `https://hotelapi.loyalty.dev/api/hotels?destination_id=${destinationId}`;
      const hotelResponse = await fetch(hotelsapi);
      if (!hotelResponse.ok) {
        throw new Error("Error fetching hotel data");
      }
      const hotelResponseData = await hotelResponse.json();
  
      const filePath = './public/hotels_data.json';
      await fs.writeFile(filePath, JSON.stringify(hotelResponseData));
      res.sendFile(path.resolve(__dirname, 'public', 'DisplayHotels.html'));
    } catch (error) {
      console.error("Error while fetching hotels info:", error);
      res.status(500).json({ error: "An error occurred while fetching hotels info." });
      }
    }
  });

//gets room details for selected hotel
app.get('/api/disprooms', async (req, res)=>{
  //get query params
  const hotelId = req.query.hotel_id;
  const destinationId = req.query.destination_id;
  const checkinDate = req.query.checkin;
  const checkoutDate = req.query.checkout;
  const guestNum = req.query.guests;
  const roomNum = req.query.rooms;
  const invalidParam = 
    validateQueryParam(hotelId, "hotelId", isValidHotelID) ||
    validateQueryParam(destinationId, "destinationId", isValidDestinationID) ||
    validateQueryParam(checkinDate, "checkinDate", isValidDate) ||
    validateQueryParam(checkoutDate, "checkoutDate", isValidDate) ||
    validateQueryParam(guestNum, "guestNum", isValidGuestNum) ||
    validateQueryParam(roomNum, "roomNum", isValidNumber);

  if (invalidParam) {
    return res.status(invalidParam.statusCode).send(invalidParam.errorMessage);
  }

  try {
    const roomapi = `https://hotelapi.loyalty.dev/api/hotels/${hotelId}/price?destination_id=${destinationId}&checkin=${checkinDate}&checkout=${checkoutDate}&lang=en_US&currency=SGD&partner_id=1&country_code=SG&guests=${guestNum}`;
    // Your code to fetch room details and handle responses
  } catch (error) {
    console.error("Error while fetching room details.");
    res.status(500).json({ error: "An error occurred while fetching hotel's room info." });
  }
});;

app.get('/api/getroomdetails', async (req, res)=>{
  let guests = guestNum;
  if (rooms>1){
    guests = guestNum + ("|" + guestNum).repeat(rooms-1);
  }
  let roomapi = `https://hotelapi.loyalty.dev/api/hotels/${hotelId}/price?destination_id=${destinationId}&checkin=${checkinDate}&checkout=${checkoutDate}&lang=en_US&currency=SGD&partner_id=1&country_code=SG&guests=${guests}`;
  console.log(roomapi);
  try{
    let raw = await fetch(roomapi);
    if (!raw.ok) {
      throw new Error("Error fetching hotel room data");
    }
    let roomResponseData = await raw.json();
    res.json(roomResponseData);

  }catch (error) {
    console.error("Error while fetching room details.");
    res.status(500).json({ error: "An error occurred while fetching hotel's room info." });
  } 
});

const server = app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

process.on('SIGTERM', () => {
  server.close(() => {
    console.log('Server closed.');
    process.exit(0);
  });
});


module.exports = {
  app,
  server,
  connectDB,
  disconnectDB
};