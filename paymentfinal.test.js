const { JSDOM } = require('jsdom');
require('@testing-library/jest-dom/extend-expect');

describe('Payment Page', () => {
    let dom;
  
    beforeEach(() => {
      dom = new JSDOM(`
      <!DOCTYPE html>
        <html lang="en"> 

        <head> 
            <meta charset="UTF-8"> 
            <meta name="viewport" content="width=device-width, initial-scale=1.0"> 
            <link href="/stylesheets/payment.css" type="text/css" rel="stylesheet"> 
            <link href="https://cdn.jsdelivr.net/npm/remixicon@3.4.0/fonts/remixicon.css" rel="stylesheet"> 
            <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css" crossorigin="anonymous" 
                rel="stylesheet"> 
            <title>Payment form</title> 
            <link rel="icon" href="/images/Icon.png" type="image/png"> 
        </head> 

        <body> 
            <!--Header Section--> 
            <nav> 
                <a href="/HomePage.html" class="logo"> <img src="/images/logo.png" alt="Website Logo" /></a> 
                <ul class="nav-list"> 
                    <li class="nav-item"><a href="/HomePage.html">Home</a></li> 
                    <li class="nav-item"><a href="/DisplayHotels.html">Book</a></li> 
                    <li class="nav-item"><a href="#">Profile</a></li> 
                    <li class="nav-item"><a href="#">Help</a></li> 
                </ul> 
            </nav> 
            <div class="payment_wrapper"> 
                <h2>Booking Details</h2> 
                <form action="/submit" method="POST"> 

                    <!-- booking summary start --> 
                    <h4>Confirm Your Booking Details</h4> 
                    <div class="hotelcontainer"> 
                        <div class="input_grp"> 
                            <div class="input_box"> 
                                <span class="hotelrm"></span> 
                                <p class="rmtype"></p> 
                            </div> 
                            <div class="input_box" id="guest"> 
                                <span> </span> 
                            </div> 
                        </div> 
                        <div class="input_grp"> 
                            <div class="input_box" id="Cdate"> 
                                <span>Check-In Date</span> 
                            </div> 
                            <div class="input_box" id="inDate"> 
                                <span> </span> 
                            </div> 
                        </div> 
                        <div class="input_grp"> 
                            <div class="input_box" id="Cdate"> 
                                <span>Check-In Date</span> 
                            </div> 
                            <div class="input_box" id="outDate"> 
                                <span> </span> 
                            </div> 
                        </div> 
                        <div class="input_grp" id="total"> 
                            <div class="input_box"> 
                                <span>Total amount</span> 
                            </div> 
                            <div class="input_box"id="price"> 
                                <span> </span> 
                            </div> 
                        </div> 
                    </div> 

                    <!-- booking summary end --> 





                    <!-- account information start --> 
                    <h4>Account</h4> 
                    <div class="input_grp"> 
                        <div class="input_box"> 
                            <input type="text" placeholder="Full Name" required class="name" id="fullname"> 
                            <i class="fa fa-user icon"></i> 
                        </div> 
                    </div> 
                    <div class="input_grp"> 
                        <div class="input_box"> 
                            <input type="email" placeholder="Email Address" required class="name" id="email"> 
                            <i class="fa fa-envelope icon"></i> 
                        </div> 
                    </div> 
                    <div class="input_grp"> 
                        <div class="input_box"> 
                            <input type="text" placeholder="Billing Address" required class="name" id="billaddress"> 
                            <i class="fa fa-map-marker icon" aria-hidden="true"></i> 
                        </div> 
                    </div> 
                    <div class="input_grp"> 
                        <div class="input_box"> 
                            <input type="tel" placeholder="Phone Number" required class="name" id="telphone" pattern="^\d{8}$"> 
                            <i class="fas fa-phone-volume icon" aria-hidden="true"></i> 
                        </div> 
                    </div> 
                    <!-- account information ends --> 

                    <!-- DOB and gender start -->
                    <div class="input_grp"> 
                        <div class="input_box"> 
                            <h4>Date Of Birth</h4> 
                            <div class="dob-container"> 
                                <select name="day" required class="dob select-box" id="dayDropdown"> 
                                    <option value="" disabled selected>DD</option> 
                                    <!-- Add day options here --> 
                                </select> 
                                <select name="month" required class="dob select-box" id="monthDropdown"> 
                                    <option value="" disabled selected>MM</option> 
                                    <!-- Add month options here --> 
                                </select> 
                                <select name="year" required class="dob select-box" id="yearDropdown"> 
                                    <option value="" disabled selected>YYYY</option> 
                                    <!-- Add year options here --> 
                                </select> 
                            </div> 
                        </div> 
                        <div class="input_box"> 
                            <h4>Gender</h4> 
                            <input type="radio" name="gender" class="radio" id="b1" checked> 
                            <label for="b1">Male</label> 
                            <input type="radio" name="gender" class="radio" id="b2" checked> 
                            <label for="b2">Female</label> 
                        </div> 
                    </div> 
                    <div class="input_grp regular"> 
                        <div class="input_box "> 
                            <i class="fas fa-concierge-bell icon"></i> 
                            <textarea placeholder="Special Requests" id="specialreq" class="name"></textarea> 
                        </div> 
                    </div> 
                    <!-- DOB and gender end --> 

                    <!-- button start--> 
                    <div class="input_grp"> 
                        <div class="input_box"> 
                            <button type="submit">Next</button>   
                        </div> 
                    </div> 
                    <!-- button end--> 

                </form> 
                <script src="/javascripts/paymentlogic.js"></script> 
            </div> 
        </body> 
        <footer class="footer"> 
            <nav> 
                <a href="/HomePage.html" class="logo_bottom"> <img src="/images/logo.png" alt="Website Logo" /></a> 
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


test('Account information inputs are displayed correctly', () => {
    const fullNameInput = dom.window.document.querySelector('input[placeholder="Full Name"]');
    const emailInput = dom.window.document.querySelector('input[placeholder="Email Address"]');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const addressInput = dom.window.document.querySelector('input[placeholder="Billing Address"]');
    const phoneNumberInput = dom.window.document.querySelector('input[placeholder="Phone Number"]');

    phoneNumberInput.value = '12345678'; // set input value
    emailInput.value = 'test@example.com'; // set input value

    expect(fullNameInput).not.toBeNull();
    expect(emailInput.value).toMatch(emailRegex);
    expect(addressInput).not.toBeNull();
    expect(phoneNumberInput.value.length).toBe(8);
  });

test('Submit button is displayed correctly', () => {
    const submitButton = dom.window.document.querySelector('button[type="submit"]');
    expect(submitButton).not.toBeNull();
});
})
