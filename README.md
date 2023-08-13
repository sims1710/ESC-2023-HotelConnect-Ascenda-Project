# HotelConnect (ESC 2023 Ascenda Project)
###### *Hotel Booking Website* 

### Description
HotelConnect is a hotel booking website that offers a seamless and convenient way to find and book accommodation worldwide. With a user-friendly interface and a vast slection of hotels, HotelConnect aims to provide a stress-free experience for travellers seeking the perfect stay. Users can search by the destination they want to go to, the planned check-in and check-out dates, the number of rooms and number of guests estimated and book the accommodation online after paying for it through our secure payment portal.


### Elaboration on the different pages
1. Home Page: This is the first page that a user views upon entering the website. The user gets to enter information to start the search query, view popular destinations and view prior customer feedback.
   
2. Display Hotel Page: This page displays all the hotels fitting the search cirteria entered by the user and the user can choose which hotel they want to check into.

3. Hotel Room Page: This room displays all the details about the hotel that the user can browse so to know more about the hotel, the different amenities available, its location and the different types of rooms.

4. Booking Detail Page: This lists all the check-in and check-out details as inoutted by the user, their personal information, the hotel and type of hotel room they have reserved.
   
5. Booking Confirmation Page: The user gets to decide whether they want to move forward with the booking or not.
  
6. Payment Stripe Page: The user makes the payment required to confirm the booking of the accommodation.
   
7. Payment Successful Page: The payment process is succesful.
   
8. Payment Failure Page: The payment process failed.

### Installation
For the HotelConnect hotel booking website, the environment and technologies used for code execution are HTML, CSS, Jest, Supertest, Cypress, JavaScript, MongoDB, Express.js, and Node.js. Python is not required for this setup. For the required libraries and dependencies that the HotelConnect application uses, follow the following instructions:

1. **HTML and CSS:**
   - No installation required. HTML and CSS are fundamental web technologies and are supported by browsers.

2. **Jest:**
   - Install Jest using npm (Node Package Manager):
     ```
     npm install --save-dev jest
     ```
3. **Supertest:**
   - Install Supertest using npm:
     ```
     npm install --save-dev supertest
     ```
4. **Cypress:**
   - Install Cypress using npm:
     ```
     npm install cypress --save-dev
     ```
   - Set up Cypress:
     ```
     npx cypress open
     ```
5. **JavaScript:**
   - JavaScript is already supported by browsers and Node.js. No separate installation is needed.

6. **MongoDB:**
   - Install MongoDB according to your operating system. You can follow the instructions on the official MongoDB website: [MongoDB Installation](https://docs.mongodb.com/manual/administration/install-community/)

7. **Express.js and Node.js:**
   - Both Express.js and Node.js are installed using npm, which is bundled with Node.js.
   - Create a new directory for your project and navigate to it in the terminal.
   - Initialize a new Node.js project and install Express.js:
     ```
     npm init -y
     npm install express
     ```
   - Install any other required dependencies for your project.

Remember that for MongoDB, Express.js, and Node.js, you'll need to set up your application logic, routes, and database connections as well.
   
Additionally, make sure to refer to the official documentation of each technology for more detailed installation instructions and guidance on setting up and configuring your specific project needs. The setup and installation of dependencies for the HotelConnect application are managed using npm, making it straightforward to set up and run the project.
   
Feel free to refer to the official documentation and resources for each technology and library as you build and test the HotelConnect hotel booking website.

### Usage
To start the web application, you have to type npm start in the terminal. Then go to your browser and type 127.0.1.1:3001 to access webpage. Ensure that the files are all in the same directory before running the file.  
   
To edit any parts of the game regarding the design, the codes are mainly located in public directory.
   
You can use a JavaScript runtime environment like Node.js to run the `app.js` file, or any text editor and terminal of your choice that supports JavaScript.

### Support
You could just call 999 should you run into errors because the developers are busy with school.  

Just kidding, please contact Singapore University of Technology and Design (SUTD) if you have any queries.

### Roadmap
- Most pages are already implemented.
- Stripe has been integrated with the code.
- Need to update testing. Need to generate fuzzer.
- Not much of bugs so far, but need to wait till testing is done.

Even though the website is developed, there is room for improvement. The website's design can be optimised, user profiles can be developed to personalise user experience and display homepages customised to their test and preferences, cookies can be used to keep track of user preferences to suggest accommodation suited for the user on their homepage, thus reducing the need to search the page.

### Authors and Acknowledgement
HotelConnect is developed by Team C3I5 from Cohort Class 03.  
The authors are: 
- Florence Elizabeth Nguyen Shi Ky
- Aditya Sudarshan Rajesh Krishnan
- Tan Guan Hong Timothy
- Simriti Bundhoo
- Advaitaa Kathavarayan
- Vidhi Mahajan
- Kum Yu Rong

Special thanks to:
- SUTD ISTD's coding lessons
- [Web Design Mastery](https://youtu.be/SVLR5XVTGj0) as reference for the Frontend.

### Project Status
Currently, the project is completed, but definitely can be improved to add more features.
