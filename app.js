const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs').promises;
//const fetch = require('node-fetch');
const cors = require('cors');

const port = 3001;
const pollingInterval = 3000; // 10 seconds (increase if needed)

const corsOptions = {
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'HomePage.html'));
});

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

const server = app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});


module.exports = {app,server};