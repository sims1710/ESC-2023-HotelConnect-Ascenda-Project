const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs').promises;

const port = 3001;
const pollingInterval = 3000; // 10 seconds (increase if needed)

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'HomePage.html'));
});

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
      console.log('Data Inserted Successfully');
      res.redirect('/'); // Redirect after successful submission
    })
    .catch((err) => {
      console.error('Error saving data to the database:', err);
      res.status(500).send('An error occurred while saving the data.');
    });
});

const Payment = mongoose.model('Payment', paymentSchema); //creates Mongoose model named "Payment" based on the paymentSchema
//model = class of collection, all this is stored in payment collection in mongodb


app.get('/api/disphotels', async (req, res) => {
  try {
    const destinationId = req.query.destination_id;
    const language = req.query.lang;
    const money = req.query.currency;
    const checkinDate = req.query.checkin;
    const checkoutDate = req.query.checkout;
    const country = req.query.country_code;
    const guestNum = req.query.guests;
    const partnerid = req.query.partner_id;
    const roomNum = req.query.rooms;

    console.log(destinationId);

    const hotelsapi = `https://hotelapi.loyalty.dev/api/hotels?destination_id=${destinationId}`;
    const hotelResponse = await fetch(hotelsapi);
    if (!hotelResponse.ok) {
      throw new Error("Error fetching hotel data");
    }
    const hotelResponseData = await hotelResponse.json();
    console.log("hotel data ok");

    const filePath = './public/hotels_data.json';
    await fs.writeFile(filePath, JSON.stringify(hotelResponseData));
    res.sendFile(path.resolve(__dirname, 'public', 'DisplayHotels.html'));

    const hotelpriceapi = `https://hotelapi.loyalty.dev/api/hotels/prices?destination_id=${destinationId}&checkin=${checkinDate}&checkout=${checkoutDate}&lang=en_US&currency=SGD&country_code=SG&guests=${guestNum}&partner_id=1`;

    /*const pollingId = setInterval(async () => {
      try {
        console.log("fetching!")
        const hotelPriceResponse = await fetch(hotelpriceapi);
        if (!hotelPriceResponse.ok) {
          throw new Error("API returned an error status");
        }
        const hotelPriceResponseData = await hotelPriceResponse.json();

        console.log("Is api check completed?:", hotelPriceResponseData.completed);

        if (hotelPriceResponseData.completed === true) {
          clearInterval(pollingId);
          console.log("hotel pricing ok");
          const filePath = './public/hotels_data.json';
          const secFilePath = './public/hotelPrices_data.json';
          await fs.writeFile(filePath, JSON.stringify(hotelResponseData));
          await fs.writeFile(secFilePath, JSON.stringify(hotelPriceResponseData));
          res.sendFile(path.resolve(__dirname, 'public', 'DisplayHotels.html'));
        }
      } catch (error) {
        clearInterval(pollingId);
        console.error("Error while fetching hotel prices", error);
        res.status(500).json({ error: "An error occurred while fetching hotel prices." });
      }
    }, pollingInterval);*/

  } catch (error) {
    console.error("Error while fetching hotels info:", error);
    res.status(500).json({ error: "An error occurred while fetching hotels info." });
  }
});

//gets room details for selected hotel
app.get('/api/disprooms', async (req, res)=>{
  try{
    //get query params
    const hotelId = req.query.hotel_id;
    const destinationId = req.query.destination_id;
    const checkinDate = req.query.checkin;
    const checkoutDate = req.query.checkout;
    const guestNum = req.query.guests;
    const roomNum = req.query.rooms; 
    //need to do polling again to get data from api FML
    const roomapi = `https://hotelapi.loyalty.dev/api/hotels/${hotelId}/price?destination_id=${destinationId}&checkin=${checkinDate}&checkout=${checkoutDate}&lang=en_US&currency=SGD&partner_id=1&country_code=SG&guests=${guestNum}`;
    //response sends room details page, which redirects user (need to add this line)
  }catch (error) {
    console.error("Error while fetching room details.");
    res.status(500).json({ error: "An error occurred while fetching hotel's room info." });
  }
})

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});