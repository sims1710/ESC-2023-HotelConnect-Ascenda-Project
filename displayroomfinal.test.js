const { JSDOM } = require('jsdom');
require('@testing-library/jest-dom/extend-expect');

describe('Hotel Room Page', () => {
  let dom;

  beforeEach(() => {
    dom = new JSDOM(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Hotel Room</title>
        <link href="/stylesheets/displayroom.css" type="text/css" rel="stylesheet">
        <link href="https://cdn.jsdelivr.net/npm/remixicon@3.4.0/fonts/remixicon.css" rel="stylesheet">
    </head>
    <body>
        <!--Header Section-->
        <nav>
            <a href="/HomePage.html" class="logo"> <img src="/images/logo.png" alt="Website Logo"/></a>
            <ul class="nav-list">
                <li class="nav-item"><a href="/HomePage.html">Home</a></li>
                <li class="nav-item"><a href="/DisplayHotels.html">Book</a></li>
                <li class="nav-item"><a href="#">Profile</a></li>
                <li class="nav-item"><a href="#">Help</a></li>
            </ul>      
        </nav>
        <div class="hotel">
            <div class="room-image">
                <!-- Placeholder image, replace with actual room image -->
                <img src="/images/marinabay.jpg" alt="Room Image">
                <div class="caption">Fake Hotel Name</div>
            </div>
            <div class="header">
                <div class="title-info">
                    <h1 class="hotel-title">Fake Hotel Name</h1>
                    <h2 class="address">123 Example Street, City, Country</h2>
                    <div class="rating">
                        <span class="stars">★★★★★</span>
                    </div>
                    <p class="description">This is a fake hotel description. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis neque et massa congue dignissim a nec nunc. Integer venenatis ipsum id dui mattis aliquam.</p>
                    <div class="amenities">
                        <h3>Room Amenities:</h3>
                        <div class="amenity-box">AC</div>
                        <div class="amenity-box">Balcony</div>
                        <div class="amenity-box">Free WiFi</div>
                        <div class="amenity-box">Shower</div>
                        <div class="amenity-box">Toiletries</div>
                    </div>
                </div>
            </div>
            <div class="hotel-description">
                <h3>Hotel Description:</h3>
                <p>Meals are served from 7:00 AM to 10:00 PM in the hotel's restaurant. The hotel has a swimming pool, 24-hour front desk service, and a fitness center. Guests can enjoy free WiFi in all areas of the hotel.</p>
            </div>
    
            <div class="map-location">
                <!-- Embedded Google Map with the location of Marina Bay Sands -->
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.725227137848!2d103.96113292525771!3d1.3412186486460784!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da3cd899f260cb%3A0x99becabc6d025518!2sSingapore%20University%20of%20Technology%20and%20Design%20(SUTD)!5e0!3m2!1sen!2suk!4v1690626907786!5m2!1sen!2suk" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>               
            <div class="room-table">
                <table>
                    <thead>
                        <tr>
                            <th>Type of Room</th>
                            <th>Image of Room</th>
                            <th>Bed Preference</th>
                            <th>Price per Night</th>
                            <th>Reserve</th>
                            <th>Add to Cart</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="left-align">Standard Room</td>
                            <td><img src="/images/room1.webp" alt="Standard Room" class="table-image"></td>
                            <td>
                                <select>
                                    <option value="single">Single</option>
                                    <option value="double">Double</option>
                                </select>
                            </td>
                            <td>$100</td>
                            <td><button>Reserve</button></td>
                            <td><button>Add to Cart</button></td>
                        </tr>
                        <tr>
                            <td class="left-align">Deluxe Room</td>
                            <td><img src="/images/room4.jpg" alt="Deluxe Room" class="table-image"></td>
                            <td>
                                <select>
                                    <option value="single">Single</option>
                                    <option value="double">Double</option>
                                </select>
                            </td>
                            <td>$200</td>
                            <td><button>Reserve</button></td>
                            <td><button>Add to Cart</button></td>
                        </tr>
                        <tr>
                            <td class="left-align">Suite</td>
                            <td><img src="/images/room3.png" alt="Suite" class="table-image"></td>
                            <td>
                                <select>
                                    <option value="single">Single</option>
                                    <option value="double">Double</option>
                                </select>
                            </td>
                            <td>$300</td>
                            <td><button>Reserve</button></td>
                            <td><button>Add to Cart</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <a href="/Payment.html"><button class="selectButton">Confirm Purchase</button></a>
    </body>
    <footer class="footer">
        <nav>
            <a href="/HomePage.html" class="logo_bottom"> <img src="/images/logo.png" alt="Website Logo"/></a>
        </nav>
    </footer>
    </html>
    `);

    global.window = dom.window;
    global.document = dom.window.document;

    const event = new dom.window.Event('DOMContentLoaded');
    dom.window.document.dispatchEvent(event);
  });

  afterEach(() => {
    delete global.window;
    delete global.document;
  });

  test('Hotel title is displayed correctly', () => {
    const expectedTitle = 'Fake Hotel Name';

    const titleElement = dom.window.document.querySelector('.hotel-title');
    expect(titleElement).toHaveTextContent(expectedTitle);
  });

  test('Hotel address is displayed correctly', () => {
    const expectedAddress = '123 Example Street, City, Country';

    const addressElement = dom.window.document.querySelector('.address');
    expect(addressElement).toHaveTextContent(expectedAddress);
  });

  test('Room amenities are displayed correctly', () => {
    const expectedAmenities = ['AC', 'Balcony', 'Free WiFi', 'Shower', 'Toiletries'];

    const amenitiesElements = dom.window.document.querySelectorAll('.amenity-box');
    amenitiesElements.forEach((element, index) => {
      expect(element).toHaveTextContent(expectedAmenities[index]);
    });
  });

  test('Hotel description is displayed correctly', () => {
    const expectedDescription = "Meals are served from 7:00 AM to 10:00 PM in the hotel's restaurant. The hotel has a swimming pool, 24-hour front desk service, and a fitness center. Guests can enjoy free WiFi in all areas of the hotel.";

    const descriptionElement = dom.window.document.querySelector('.hotel-description p');
    expect(descriptionElement).toHaveTextContent(expectedDescription);
  });
});
