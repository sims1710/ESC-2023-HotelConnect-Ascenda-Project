document.addEventListener("DOMContentLoaded", async function () {
    //const fs = require('fs').promises;
    const hotelsContainer = document.getElementById("hotelsContainer");
    const topBarInfo = document.querySelector(".topBarInfo");
    const hotelsPerPage = 10;
    let currentPage = 1;
    let hotelsData = [];

    //getting actual parameters from the url
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let checkInDate = urlParams.get('checkin');
    let checkOutDate = urlParams.get('checkout');
    let guestNum = urlParams.get('guests');
    let roomNum = urlParams.get('rooms');
    let destinationUID = urlParams.get('destination_id');
    const destination = await getDestinationByUid(destinationUID);

    async function getDestinationByUid(uid){
        let response;
        let destinationData;
        try{
            response = await fetch('../destinations.json');
            destinationData = await response.json();
            const destination = destinationData.find((dest) => dest.uid === uid);
            if(destination){
                //if dest found, return combined term+state
                return destination.state ? `${destination.term}, ${destination.state}` : destination.term;
            } else{
                return "dest not found";
            }
        } catch (error) {
            console.error('Error fetching destinations data:', error);
            return "Error fetching destinations.json data.";
        }
    }

    //read hotel and pricing data from JSON files
    async function readHotelAndPricingData() {
        try {
            // read hotel data from file
            const hotelsDataResponse = await fetch('../hotels_data.json');
            hotelsData = await hotelsDataResponse.json();

            // render the hotel results nicely
            createTopBar();
            renderHotels(currentPage);
        } catch (error) {
            console.error('Error reading hotel and pricing data:', error);
        }
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

        const selectButton = document.createElement("button");
        selectButton.textContent = "Select";
        selectButton.classList.add("selectButton");
        selectButton.addEventListener("click", function () {
            // Redirect to a page with more details about the hotel
            console.log("Selected Hotel ID:", hotel.id);
            window.location.href = `/api/disprooms?hotel_id=${hotel.id}&destination_id=${destinationUID}&checkin=${checkInDate}&checkout=${checkOutDate}&lang=en_US&currency=SGD&partner_id=1&country_code=SG&guests=${guestNum}&rooms=${roomNum}`;
        });
        hotelSquare.appendChild(selectButton);

        return hotelSquare;
    }

    // render hotels on the current page
    function renderHotels(pageNumber, filteredHotels) {
        // clear the existing hotels in the container
        hotelsContainer.innerHTML = '';

        // calculate the starting and ending index for the hotels to display on the current page
        const startIndex = (pageNumber - 1) * hotelsPerPage;
        const endIndex = startIndex + hotelsPerPage;

        let hotelsForPage;

        if (filteredHotels) {
            // If filteredHotels is provided (slider used), use the filtered hotels
            hotelsForPage = filteredHotels.slice(startIndex, endIndex);
        } else {
            // If filteredHotels is not provided (initial load), use all hotels
            hotelsForPage = hotelsData.slice(startIndex, endIndex);
        }

        // create and append hotel squares to the container
        hotelsForPage.forEach((hotel) => {
            const hotelSquare = createHotelSquare(hotel);
            hotelsContainer.appendChild(hotelSquare);
        });

        //calls to create pagination buttons
        createPaginationButtons(hotelsData.length, pageNumber);
    }

    //create pagination buttons
    function createPaginationButtons(totalHotels, currentPage) {
        const totalPages = Math.ceil(totalHotels / hotelsPerPage);
        const maxVisibleButtons = 5;
        const paginationContainer = document.createElement("div");
        paginationContainer.classList.add("paginationContainer");

       // Helper function to add a pagination button
    function addPaginationButton(text, page) {
        const paginationButton = document.createElement("button");
        paginationButton.textContent = text;
        paginationButton.classList.add("paginationButton");
        
        if (page === currentPage) {
            paginationButton.classList.add("active");
        }

        paginationButton.addEventListener("click", function () {
            currentPage = page;
            renderHotels(currentPage);
        });

        paginationContainer.appendChild(paginationButton);
    }

    if (totalPages <= maxVisibleButtons) {
        // If there are fewer pages than the maximum visible buttons, show all buttons without ellipsis
        for (let i = 1; i <= totalPages; i++) {
            addPaginationButton(i, i);
        }
    } else {
        const halfVisibleButtons = Math.floor((maxVisibleButtons - 1) / 2);
        if (currentPage <= halfVisibleButtons) {
            // Show first few buttons without ellipsis
            for (let i = 1; i <= maxVisibleButtons - 1; i++) {
                addPaginationButton(i, i);
            }
            // Add ellipsis
            const ellipsisButton = document.createElement("span");
            ellipsisButton.textContent = "...";
            paginationContainer.appendChild(ellipsisButton);
            // Show last button
            addPaginationButton(totalPages, totalPages);
        } else if (currentPage >= totalPages - halfVisibleButtons) {
            // Show first button
            addPaginationButton(1, 1);
            // Add ellipsis
            const ellipsisButton = document.createElement("span");
            ellipsisButton.textContent = "...";
            paginationContainer.appendChild(ellipsisButton);
            // Show last few buttons without ellipsis
            for (let i = totalPages - maxVisibleButtons + 2; i <= totalPages; i++) {
                addPaginationButton(i, i);
            }
        } else {
            // Show first button
            addPaginationButton(1, 1);
            // Add ellipsis
            const ellipsisButton1 = document.createElement("span");
            ellipsisButton1.textContent = "...";
            paginationContainer.appendChild(ellipsisButton1);
            // Show current page and its neighbors
            for (let i = currentPage - halfVisibleButtons; i <= currentPage + halfVisibleButtons; i++) {
                addPaginationButton(i, i);
            }
            // Add ellipsis
            const ellipsisButton2 = document.createElement("span");
            ellipsisButton2.textContent = "...";
            paginationContainer.appendChild(ellipsisButton2);
            // Show last button
            addPaginationButton(totalPages, totalPages);
        }
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

    //update selected rating range and filter hotels accordingly
    function updateRatingRange() {
        const ratingRangeInput = document.getElementById("ratingRange");
        const selectedRatingRangeDisplay = document.getElementById("selectedRatingRange");

        const ratingRangeValue = ratingRangeInput.value;
        selectedRatingRangeDisplay.textContent = `0 - ${ratingRangeValue}`;

        // Get the maximum rating value (5 in this case)
        const maxRatingValue = 5;

        // Filter the hotels based on the selected rating range
        const filteredHotels = hotelsData.filter(
            (hotel) => hotel.rating >= 0 && hotel.rating <= ratingRangeValue
            //(hotel) => hotel.rating >= ratingRangeValue && hotel.rating <= maxRatingValue
        );

        // Sort the filtered hotels based on the rating in descending order (highest to lowest)
        filteredHotels.sort((a, b) => b.rating - a.rating);

        // Update the current page if it exceeds the new filtered hotels' page count
        currentPage = Math.min(currentPage, Math.ceil(filteredHotels.length / hotelsPerPage));

        // Render the hotels with the updated filter
        renderHotels(currentPage, filteredHotels);
    }
    //call function
    readHotelAndPricingData();

    document.getElementById("ratingRange").addEventListener("input", updateRatingRange);
});