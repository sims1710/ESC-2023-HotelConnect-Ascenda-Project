const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs').promises; // Import the fs module
const cors = require('cors'); // Import the cors package
const port = 8000;
const pollingInterval = 200 //in ms

const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
   port:`${port}`,
}

app.use(cors(corsOptions)) // Use this after the variable declaration

// Configure Express to serve static files
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'HomePage.html'));//'./HomePage.html'));
});

//get hotels for that destination
app.get('/api/disphotels', async (req, res) => {
  const destinationId = req.query.destination_id; 
  const language = req.query.lang;
  const money = req.query.currency;
  const checkinDate = req.query.checkin;
  const checkoutDate = req.query.checkout;
  const country = req.query.country_code;
  const guestNum = req.query.guests;
  const partnerid = req.query.partner_id;

  //get api for hotels info (first api call)
  const hotelsapi = `https://hotelapi.loyalty.dev/api/hotels?destination_id=${destinationId}`;
  const hotelResponse = await fetch(hotelsapi);
  const hotelResponseData = await hotelResponse.json();

  let hotelPriceResponseData;

  //second api call
  const hotelpriceapi = `https://hotelapi.loyalty.dev/api/hotels/prices?destination_id=${destinationId}&checkin=${checkinDate}&checkout=${checkoutDate}&lang=en_US&currency=SGD&country_code=SG&guests=${guestNum}&partner_id=1`
  const pollingId = setInterval(async () => {
      const hotelPriceResponse = await fetch(hotelpriceapi);
      hotelPriceResponseData = await hotelPriceResponse.json();
      if(hotelPriceResponseData.completed){
        clearInterval(pollingId);
        // Save the data to a JSON file
        const filePath = './public/hotels_data.json';
        const secfilePath = './public/hotelPrices_data.json';
        await fs.writeFile(filePath, JSON.stringify(hotelResponseData));
        await fs.writeFile(secfilePath, JSON.stringify(hotelPriceResponseData));
        res.sendFile(path.resolve(__dirname, 'public', 'DisplayHotels.html'));
      }
  }, pollingInterval);
  //res.sendFile(path.resolve(__dirname, 'public', 'DisplayHotels.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});