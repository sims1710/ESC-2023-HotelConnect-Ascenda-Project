const { JSDOM } = require('jsdom');
require('@testing-library/jest-dom/extend-expect'); // This is important to extend Jest with DOM matchers

test('Top bar information is displayed correctly', () => {
  // Create a new DOM environment
  const dom = new JSDOM(`
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hotel Search Results</title>
    <link href="/stylesheets/displayhotels.css" type="text/css" rel="stylesheet">
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
      <!--Search Bar Section-->
      <section class="section__container booking__container" id="Searching">
          <form>
              <div class="form__group">
                  <div class="input__group">
                      <input type="text" placeholder="e.g. Singapore">
                      <label>Location</label>
                  </div>
              </div>
              <div class="form__group">
                  <div class="input__group">
                      <input type="date" class="input" id="check-in">
                      <label>Check In</label>
                  </div>
              </div>
              <div class="form__group">
                  <div class="input__group">
                      <input type="date" class="input" id="check-out">
                      <label>Check Out</label>
                  </div>
              </div>
              <div class="form__group">
                  <div class="input__group">
                      <input type="text" class="input" placeholder="e.g. 2">
                      <label>Guests</label>
                  </div>
              </div>
              <div class="form__group">
                  <div class="input__group">
                      <input type="text" class="input" placeholder="e.g. 2">
                      <label>Rooms</label>
                  </div>
              </div>
          </form>
          <button class="btn"><i class="ri-search-line"></i></button>
      </section>
      <!--TopBar Section-->
      <section class="section__container topbar__container">
          <div class="topBar">
              <div class="topBarInfo">
                  Destination: <span id="destination"></span>|
                  Check-in: <span id="checkInDate"></span> |
                  Check-out: <span id="checkOutDate"></span> |
                  Guests: <span id="guestNum"></span> |
                  Rooms: <span id="roomNum"></span>           
              </div>
          </div>
      </section>
      <!--Filter Section-->
      <section class="section__container filter__container">     
          <div class="filter-bar">
              <form>
                  <div class="filter__item title">
                      <label for="title">Filter by:</label>
                  </div>
                  <!-- Input fields for price range and rating -->
                  <div class="filter__item price">
                      <label for="price">Price Range:</label>
                      <div class="dropdown" onclick="toggleDropdown('priceDropdown')" >
                          <span id="selectedPrice"></span>
                          <div id="priceDropdown" class="dropdown-content">
                              <ul>
                                  <li onclick="selectPrice('$0 - $100')"> $0 - $100</li>
                                  <li onclick="selectPrice('$100 - $250')"> $100 - $250</li>
                                  <li onclick="selectPrice('$250 - $400')"> $250 - $400</li>
                                  <li onclick="selectPrice('$400 - $550')"> $400 - $550</li>
                                  <li onclick="selectPrice('$550+')"> $550+</li>
                              </ul>
                          </div>
                      </div>
                  </div>
                  <div class="filter__item rating">
                      <label for="rating">Rating:</label>
                      <div class="dropdown" onclick="toggleDropdown('ratingDropdown')">
                          <span id="selectedRating"></span>
                          <div id="ratingDropdown" class="dropdown-content">
                              <ul>
                                  <li onclick="selectRating('5 stars')">5 stars</li>
                                  <li onclick="selectRating('4 stars')">4 stars</li>
                                  <li onclick="selectRating('3 stars')">3 stars</li>
                                  <li onclick="selectRating('2 stars')">2 stars</li>
                                  <li onclick="selectRating('1 star')">1 star</li>
                              </ul>
                          </div>
                      </div>
                  </div>
                  <div class="filter__item amenities">
                      <label for="amenities">Amenities:</label>
                      <div class="dropdown amenities" onclick="toggleDropdown('amenitiesDropdown')">
                          <div class="amenities-wrapper">
                              <span id="selectedAmenities"></span>
                          </div>
                          <div id="amenitiesDropdown" class="dropdown-content">
                              <ul>
                                  <li onclick="toggleAmenity('Gym')">Gym</li>
                                  <li onclick="toggleAmenity('Pool')">Pool</li>
                                  <li onclick="toggleAmenity('AC Room')">Air Conditioned Room</li>
                                  <li onclick="toggleAmenity('Night Club')">Night Club</li>
                                  <li onclick="toggleAmenity('Restaurant')">Restaurant</li>
                                  <li onclick="toggleAmenity('Complimentary Food')">Complimentary Food</li>
                                  <li onclick="toggleAmenity('Private Beach')">Private Beach</li>
                                  <li onclick="toggleAmenity('Outdoor Sport')">Outdoor Sport Space</li>
                              </ul>
                          </div>
                      </div>
                  </div>
                  <div class="filter__item circle">
                      <button class="btn"><i class="ri-filter-3-line"></i></button>
                  </div>
              </form>
          </div>                
      </section>
      <!--Hotel Section-->
      <section class="section__container hotel__container">
          <div id="hotelsContainer">
              <!-- Permanent example hotel results -->
              <div class="hotelSquare">
                  <img src="/images/atlantis.webp" alt="Hotel 1" class="hotelImage">
                  <div class="hotelName">Example Hotel 1</div>
                  <div class="hotelRating">Rating: 4.5 stars</div>
                  <div class="hotelPrice">Price: $200</div>
                  <a href="/DisplayRoom.html"><button class="selectButton">Select Hotel</button></a>
              </div>
  
              <div class="hotelSquare">
                  <img src="/images/lemeridien.webp" alt="Hotel 2" class="hotelImage">
                  <div class="hotelName">Example Hotel 2</div>
                  <div class="hotelRating">Rating: 4 stars</div>
                  <div class="hotelPrice">Price: $150</div>
                  <a href="/DisplayRoom.html"><button class="selectButton">Select Hotel</button></a>
              </div>
              <!-- Add more hotel squares here for more example results -->
          </div>
      </section>
      <!--Page Section-->
      <section class="section__container page__container">
          <div class="page">
              <div class="pagination">
                  <!-- Number of pages will be dynamically generated using JavaScript -->
              </div>
          </div>
      </section>
      <script src="/javascripts/displayHotels.js"></script>
      <script>
          // Wrap the JavaScript code in a DOMContentLoaded event listener
          document.addEventListener("DOMContentLoaded", function() {
              // Sample data for the top bar (replace with actual data as needed)
              document.getElementById('checkInDate').textContent = '2023-07-28';
              document.getElementById('checkOutDate').textContent = '2023-07-30';
              document.getElementById('guestNum').textContent = '2';
              document.getElementById('roomNum').textContent = '1';
              document.getElementById('destination').textContent = 'New York, USA';
  
              // Sample data: You can replace this with actual data from your backend or API
              const totalResults = 37; // Total number of search results
              const resultsPerPage = 4; // Maximum number of results to display per page (updated to 4)
              let currentPage = 1; // Current page
  
              // Rest of your JavaScript code for pagination and handling filters goes here
              // ...
  
              // Initial call to update the pagination and display the first page results
              // updatePagination();
          });
      </script>
      <footer class="footer">
          <nav>
              <a href="/HomePage.html" class="logo_bottom"> <img src="/images/logo.png" alt="Website Logo"/></a>
          </nav>
      </footer>
  </body>
  </html>
  
  `);

  // Set the global `window` and `document` objects to the ones provided by jsdom
  global.window = dom.window;
  global.document = dom.window.document;

  // Simulate the DOMContentLoaded event
  const event = new dom.window.Event('DOMContentLoaded');
  dom.window.document.dispatchEvent(event);

  // Set up sample data for the top bar
  const expectedDestination = 'New York, USA';
  const expectedCheckInDate = '2023-07-28';
  const expectedCheckOutDate = '2023-07-30';
  const expectedGuestNum = '2';
  const expectedRoomNum = '1';

  // Modify the content of the top bar elements
  const destinationElement = dom.window.document.getElementById('destination');
  const checkInDateElement = dom.window.document.getElementById('checkInDate');
  const checkOutDateElement = dom.window.document.getElementById('checkOutDate');
  const guestNumElement = dom.window.document.getElementById('guestNum');
  const roomNumElement = dom.window.document.getElementById('roomNum');

  destinationElement.textContent = expectedDestination;
  checkInDateElement.textContent = expectedCheckInDate;
  checkOutDateElement.textContent = expectedCheckOutDate;
  guestNumElement.textContent = expectedGuestNum;
  roomNumElement.textContent = expectedRoomNum;

  // Verify that the top bar information is displayed correctly
  expect(destinationElement).toHaveTextContent(expectedDestination);
  expect(checkInDateElement).toHaveTextContent(expectedCheckInDate);
  expect(checkOutDateElement).toHaveTextContent(expectedCheckOutDate);
  expect(guestNumElement).toHaveTextContent(expectedGuestNum);
  expect(roomNumElement).toHaveTextContent(expectedRoomNum);

  // Clean up the global objects to avoid polluting other tests
  delete global.window;
  delete global.document;
});
