const { JSDOM } = require('jsdom');
require('@testing-library/jest-dom/extend-expect');

describe('Home Page', () => {
  let dom;

  beforeEach(() => {
    dom = new JSDOM(`
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Hotel Connect : Home Page</title>
            <link href="/stylesheets/homepage.css" type="text/css" rel="stylesheet">
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
            <header class="section__container header__container">
                <!--Booking Section-->
                <div class="header__image__container">
                    <div class="header__content">
                        <h1>Enjoy Your Dream Vacation</h1>
                        <p>Book the hotel of your dreams at the best price!</p>
                    </div>
                    <div class="booking__container" id="Searching">
                        <form>
                            <div class="form__group">
                                <div class="input__group">
                                    <input type="text" placeholder="e.g. Singapore">
                                    <label>Location</label>
                                </div>
                                <p>Where are you going?</p>
                            </div>
                            <div class="form__group">
                                <div class="input__group">
                                    <input type="date" class="input" id="check-in">
                                    <label>Check In</label>
                                </div>
                                <p>Add date</p>
                            </div>
                            <div class="form__group">
                                <div class="input__group">
                                    <input type="date" class="input" id="check-out">
                                    <label>Check Out</label>
                                </div>
                                <p>Add date</p>
                            </div>
                            <div class="form__group">
                                <div class="input__group">
                                    <input type="text" class="input" placeholder="e.g. 2">
                                    <label>Guests</label>
                                </div>
                                <p>Add guests</p>
                            </div>
                            <div class="form__group">
                                <div class="input__group">
                                    <input type="text" class="input" placeholder="e.g. 2">
                                    <label>Rooms</label>
                                </div>
                                <p>Add rooms</p>
                            </div>
                        </form>
                        <button class="btn"><i class="ri-search-line"></i></button>
                    </div>
                </div>
            </header>
            <!--Popular Section-->
            <section class="section__container popular__container">
                <h2 class="section__header">Popular Hotels</h2>
                <div class="popular__grid">
                    <div class="popular__card">
                        <img src="/images/soori.jpeg" alt="Soori Bali">
                        <div class="popular__content">
                            <div class="popular__card__header">
                                <h4>Soori Bali</h4>
                                <h4>$300</h4>
                            </div>
                            <p>Bali</p>
                        </div>
                    </div>
                    <div class="popular__card">
                        <img src="/images/Fairmont.jpeg" alt="Fairmont Chateau">
                        <div class="popular__content">
                            <div class="popular__card__header">
                                <h4>Fairmont Chateau</h4>
                                <h4>$400</h4>
                            </div>
                            <p>Canada</p>
                        </div>
                    </div>
                    <div class="popular__card">
                        <img src="/images/atlantis.webp" alt="Atlantis">
                        <div class="popular__content">
                            <div class="popular__card__header">
                                <h4>Atlantis The Palm</h4>
                                <h4>$350</h4>
                            </div>
                            <p>Dubai</p>
                        </div>
                    </div>
                    <div class="popular__card">
                        <img src="/images/mbs.jpeg" alt="Marina Bay Sands">
                        <div class="popular__content">
                            <div class="popular__card__header">
                                <h4>Marina Bay Sands</h4>
                                <h4>$500</h4>
                            </div>
                            <p>Singapore</p>
                        </div>
                    </div>
                    <div class="popular__card">
                        <img src="/images/lemeridien.webp" alt="Le Meridien">
                        <div class="popular__content">
                            <div class="popular__card__header">
                                <h4>Le Meridien</h4>
                                <h4>$240</h4>
                            </div>
                            <p>Mauritius</p>
                        </div>
                    </div>
                    <div class="popular__card">
                        <img src="/images/joali.jpeg" alt="Joali">
                        <div class="popular__content">
                            <div class="popular__card__header">
                                <h4>Joali</h4>
                                <h4>$280</h4>
                            </div>
                            <p>Maldives</p>
                        </div>
                    </div>
                </div>
            </section>
            <section class="client">
                <div class="section__container client__container">
                    <h2 class="section__header">Feedback from our clients</h2>
                    <div class="client__grid">
                        <div class="client__card">
                            <img src="/images/client1.jpeg" alt="Client 1">
                            <p>
                                You should totally use this website, it is amazing.
                            </p>
                        </div>
                        <div class="client__card">
                            <img src="/images/client2.webp" alt="Client 2">
                            <p>
                                The booking process was seamless and the confirmation was instant.
                            </p>
                        </div>
                        <div class="client__card">
                            <img src="/images/client3.jpeg" alt="Client 3">
                            <p>
                                I highly recommend HotelConnect for hassle-free hotel bookings.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <!--Script Section-->
            <script>
            // JavaScript to handle form submission and reposition labels
            const form = document.querySelector("form");
            const inputGroups = document.querySelectorAll(".input__group");
    
            form.addEventListener("submit", (event) => {
                event.preventDefault();
    
                // Check if any of the input fields have a value
                const hasInput = Array.from(inputGroups).some(
                    (inputGroup) => inputGroup.querySelector("input").value.trim() !== ""
                );
    
                if (hasInput) {
                    // Move labels to the top
                    inputGroups.forEach((inputGroup) => {
                        const label = inputGroup.querySelector("label");
                        const input = inputGroup.querySelector("input");
                        if (input.value.trim() !== "") {
                            label.style.transform = "translateY(-100%)";
                        }
                    });
                }
    
                // Submit the form or handle the search logic here
                // For demonstration purposes, we'll just log the values to the console
                const formData = new FormData(form);
                for (const pair of formData.entries()) {
                    console.log(pair[0] + ": " + pair[1]);
                }
            });
        </script>
        <!--Footer Section-->
        <footer class="footer">
            <div class="section__container footer__container">
                <div class="footer__col">
                    <h3>HotelConnect</h3>
                    <p>
                       HotelConnect is a premier hotel booking website that offers a seamless and convenient way to find and book accommodation worldwide. 
                    </p>
                    <p>
                        With a user-friendly interface and a vast slection of hotels, HotelConnect aims to provide a stress-free experience for travellers seeking the perfect stay.
                    </p>
                </div>
                <div class="footer__col">
                    <h4>Company</h4>
                    <p>About Us</p>
                    <p>Our Team</p>
                    <p>Blog</p>
                    <p>Book</p>
                    <p>Contact Us</p>
                </div>
                <div class="footer__col">
                    <h4>Legal</h4>
                    <p>FAQs</p>
                    <p>Terms & Conditions</p>
                    <p>Privacy Policy</p>
                </div>
                <div class="footer__col">
                    <h4>Resources</h4>
                    <p>Social Media</p>
                    <p>Help Center</p>
                    <p>Partnerships</p>
                </div>
            </div>
        </footer>
        </body>
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

  test('Header content is displayed correctly', () => {
    const expectedTitle = 'Enjoy Your Dream Vacation';
    const expectedSubtitle = 'Book the hotel of your dreams at the best price!';

    const headerContainer = dom.window.document.querySelector('.header__container');
    const titleElement = headerContainer.querySelector('h1');
    const subtitleElement = headerContainer.querySelector('p');

    expect(titleElement.textContent).toBe(expectedTitle);
    expect(subtitleElement.textContent).toBe(expectedSubtitle);
  });

  test('Booking form labels reposition correctly', () => {
    const form = dom.window.document.querySelector('form');
    const locationInput = dom.window.document.querySelector('input[placeholder="e.g. Singapore"]');
    const checkInInput = dom.window.document.querySelector('input#check-in');
    const checkOutInput = dom.window.document.querySelector('input#check-out');
    const guestsInput = dom.window.document.querySelector('input[placeholder="e.g. 2"]');
    const roomsInput = dom.window.document.querySelector('input[placeholder="e.g. 2"]');

    // simulate user input
    locationInput.value = 'Singapore';
    checkInInput.value = '2023-08-01';
    checkOutInput.value = '2023-08-05';
    guestsInput.value = '2';
    roomsInput.value = '1';

    // dispatch the submit event
    form.dispatchEvent(new dom.window.Event('submit'));

    const locationLabel = locationInput.closest('.input__group label[for="location"]');
    const checkInLabel = checkInInput.closest('.input__group label[for="check-in"]');
    const checkOutLabel = checkOutInput.closest('.input__group label[for="check-out"]');
    const guestsLabel = guestsInput.closest('.input__group label[for="guests"]');
    const roomsLabel = roomsInput.closest('.input__group label[for="guests"]');

    // ensure input elements are selected correctly
    expect(locationInput).not.toBeNull();
    expect(checkInInput).not.toBeNull();
    expect(checkOutInput).not.toBeNull();
    expect(guestsInput).not.toBeNull();
    expect(roomsInput).not.toBeNull();
  });
});
