document.addEventListener("DOMContentLoaded", function () {
    //const fs = require('fs').promises;
    const hotelsContainer = document.getElementById("hotelsContainer");
    const topBarInfo = document.querySelector(".topBarInfo");
    const hotelsPerPage = 10;
    let currentPage = 1;
    let hotelsData = [];
    let hotelpriceData = [];
    let hotelsMap = {};

    // fake data for testing
    const checkInDate = "25-07-2023";
    const checkOutDate = "30-07-2023";
    const guestNum = 2;
    const roomNum = 1;
    const destination = "Tokyo, Japan";

    //read hotel and pricing data from JSON files
    async function readHotelAndPricingData() {
        try {
            //const hotelsDataFilePath = './hotels_data.json';
            //const pricesDataFilePath = './public/hotelPrices_data.json';

            // read hotel data from file
            const hotelsDataResponse = await fetch('../hotels_data.json');
            hotelsData = await hotelsDataResponse.json();

            // read pricing data from file
            //const pricesDataResponse = await fetch(pricesDataFilePath);
            //const pricesData = await pricesDataResponse.json();
            //hotelpriceData = pricesData.hotels;

            // mapping of hotels with their corresponding price information
            //hotelsMap = createHotelsMap(hotelpriceData);

            // render the hotel results nicely
            createTopBar();
            renderHotels(currentPage);
        } catch (error) {
            console.error('Error reading hotel and pricing data:', error);
        }
    }

    // map of hotels with their corresponding price information
    function createHotelsMap(pricesData) {
        const map = {};
        pricesData.forEach((price) => {
            map[price.id] = price;
        });
        return map;
    }

    //create HTML elements for each hotel
    function createHotelSquare(hotel) {
        const hotelSquare = document.createElement("div");
        hotelSquare.classList.add("hotelSquare");

        const hotelImage = document.createElement("img");
        if (hotel.hires_image_index && typeof hotel.hires_image_index === "string") {
            const imageIndices = hotel.hires_image_index.split(",");
            const imageIndex = imageIndices[0].trim(); // Get the first image index
            hotelImage.src = hotel.image_details.prefix + imageIndex + hotel.image_details.suffix;
        } else {
            hotelImage.src = "../images/default_image.jpg"; // Use a default image if hires_image_index is missing or not a string
        }
        hotelImage.classList.add("hotelImage");
        hotelSquare.appendChild(hotelImage);

        const hotelName = document.createElement("div");
        hotelName.textContent = hotel.name;
        hotelName.classList.add("hotelName");
        hotelSquare.appendChild(hotelName);

        const hotelRating = document.createElement("div");
        hotelRating.textContent = `Rating: ${hotel.rating}`;
        hotelRating.classList.add("hotelRating");
        hotelSquare.appendChild(hotelRating);

        const price = hotelsMap[hotel.id]; // Get the corresponding price for the hotel
        if (price) {
            const hotelPrice = document.createElement("div");
            hotelPrice.textContent = `Price: $${price.converted_price}`;
            hotelPrice.classList.add("hotelPrice");
            hotelSquare.appendChild(hotelPrice);
        }

        const selectButton = document.createElement("button");
        selectButton.textContent = "Select";
        selectButton.classList.add("selectButton");
        selectButton.addEventListener("click", function () {
            // Redirect to a page with more details about the hotel
            // You can use window.location.href = "/hotel-details?id=" + hotel.id; or any other way you want to handle the navigation
            console.log("Selected Hotel ID:", hotel.id);
        });
        hotelSquare.appendChild(selectButton);

        return hotelSquare;
    }

    // render hotels on the current page
    function renderHotels(pageNumber) {
        // clear the existing hotels in the container
        hotelsContainer.innerHTML = '';

        // calculate the starting and ending index for the hotels to display on the current page
        const startIndex = (pageNumber - 1) * hotelsPerPage;
        const endIndex = startIndex + hotelsPerPage;

        // sort the hotels based on their searchRank in descending order (higher rank first)
        const sortedHotels = hotelsData.sort((a, b) => b.searchRank - a.searchRank);

        // slice the sorted hotels array to get the hotels for the current page
        const hotelsForPage = sortedHotels.slice(startIndex, endIndex);

        // create and append hotel squares to the container
        hotelsForPage.forEach((hotel) => {
            const hotelSquare = createHotelSquare(hotel);
            hotelsContainer.appendChild(hotelSquare);
        });

        //calls to create pagination buttons
        createPaginationButtons(sortedHotels.length, pageNumber);
    }

    //create pagination buttons
    function createPaginationButtons(totalHotels, currentPage) {
        const totalPages = Math.ceil(totalHotels / hotelsPerPage);
        const paginationContainer = document.createElement("div");
        paginationContainer.classList.add("paginationContainer");

        for (let i = 1; i <= totalPages; i++) {
            const paginationButton = document.createElement("button");
            paginationButton.textContent = i;
            paginationButton.classList.add("paginationButton");

            // highlight the current page button
            if (i === currentPage) {
                paginationButton.classList.add("active");
            }

            paginationButton.addEventListener("click", function () {
                currentPage = i;
                renderHotels(currentPage);
            });

            paginationContainer.appendChild(paginationButton);
        }

        hotelsContainer.appendChild(paginationContainer);
    }

    // create the top bar displaying booking information
    function createTopBar() {
        document.getElementById("checkInDate").textContent = checkInDate;
        document.getElementById("checkOutDate").textContent = checkOutDate;
        document.getElementById("guestNum").textContent = guestNum;
        document.getElementById("roomNum").textContent = roomNum;
        document.getElementById("destination").textContent = destination;
    }
    //call function
    readHotelAndPricingData();
});