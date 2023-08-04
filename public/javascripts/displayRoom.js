document.addEventListener("DOMContentLoaded", async function () {
    let previousScrollPosition = 0;
    let noMoreRoomsAvailable = false; //flag to check 
    let roomLength;
    let count = 0;
    let hotelName;
    let roomType;
    let total;
    //getting actual parameters from the url
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let hotelId = urlParams.get('hotel_id');
    let destId = urlParams.get('destination_id');
    let checkInDate = urlParams.get('checkin');
    let checkOutDate = urlParams.get('checkout');
    let guestNum = urlParams.get('guests');
    let roomNum = urlParams.get('rooms');
    //get hotel data for the selected hotel
    const hotel = await getHotelById(hotelId);
    async function getHotelById(id){
        let response;
        let hotelData;
        try{
            response = await fetch('../hotels_data.json');
            hotelData = await response.json();
            const hotel = hotelData.find((hotel) => hotel.id === id);
            if(hotel){
                //if hotel found, return hotel object
                return hotel;
            } else{
                return "hotel not found";
            }
        } catch (error) {
            console.error('Error fetching hotel data:', error);
            return "Error fetching hotels_data.json data.";
        }
    }
    // Function to display stars based on the rating
    function displayStars(rating) {
        const fullStar = '★';
        const emptyStar = '☆';
        const maxRating = 5;
        const filledStars = fullStar.repeat(Math.floor(rating));
        const emptyStars = emptyStar.repeat(maxRating - Math.floor(rating));
        return filledStars + emptyStars;
    }

    //room stuff
    async function getHotelRoomData() {
        try {
            const response = await fetch('/api/getroomdetails'); // Request to server's endpoint
            const roomResponseData = await response.json();
            console.log(roomResponseData);
            return roomResponseData;
        } catch (error) {
            console.error('Error fetching hotel room data:', error);
            return null;
        }
        
    }

    const loadMoreButton = document.querySelector('.selectButton');

    // Listen for "Load more rooms" button click
    loadMoreButton.addEventListener('click', async () => {
        if (noMoreRoomsAvailable) {
            return; // If no more rooms are available, don't proceed
        }
        // Store the current scroll position
        previousScrollPosition = window.scrollY;

        //clear table data
        const roomTableBody = document.getElementById('roomTableBody');
        roomTableBody.innerHTML = '';

        // Load more room data
        const additionalRoomData = await getHotelRoomData();
        console.log(roomLength);
        // If no more new rooms are available, disable the button and set the flag
        if (additionalRoomData.rooms.length === roomLength && count === 0) {
            noMoreRoomsAvailable = true;
            loadMoreButton.classList.add('no-more-rooms');
            loadMoreButton.title = 'No more rooms available. Check again later!';
        } else if (additionalRoomData.rooms.length === roomLength && count > 0) {
            noMoreRoomsAvailable = true;
            //count = count+1;
            //roomLength = additionalRoomData.rooms.length;
            loadMoreButton.classList.add('no-more-rooms');
            loadMoreButton.title = 'No more rooms available. Check again later!';
        }
        roomLength = additionalRoomData.rooms.length;
        count = count+1;

        // Populate the table with additional room data
        populateRoomTable(additionalRoomData.rooms);

        // Restore the previous scroll position
        window.scrollTo(0, previousScrollPosition);
    });

    // Function to display images in the room-image section
    function displayImages(imageDetails) {
        const roomImageSection = document.querySelector('.room-image');

        // Create image slider elements
        const sliderContainer = document.createElement('div');
        sliderContainer.classList.add('slider-container');
        const prevArrow = document.createElement('div');
        prevArrow.classList.add('prev-arrow');
        prevArrow.innerHTML = '&#10094;';
        const nextArrow = document.createElement('div');
        nextArrow.classList.add('next-arrow');
        nextArrow.innerHTML = '&#10095;';

        // Add event listeners to arrows
        let currentImageIndex = 0;
        prevArrow.addEventListener('click', () => {
            currentImageIndex = (currentImageIndex - 1 + imageDetails.count) % imageDetails.count;
            updateSlider();
        });
        nextArrow.addEventListener('click', () => {
            currentImageIndex = (currentImageIndex + 1) % imageDetails.count;
            updateSlider();
        });

        // Function to update the image slider
        function updateSlider() {
            const imgElements = sliderContainer.querySelectorAll('img');
            imgElements.forEach((imgElement, index) => {
                imgElement.style.display = index === currentImageIndex ? 'block' : 'none';
            });
        }

        // Create image elements and append to the slider container
        for (let i = 0; i < imageDetails.count; i++) {
            const imgElement = document.createElement('img');
            imgElement.src = `${imageDetails.prefix}${i}${imageDetails.suffix}`;
            imgElement.alt = `Room Image ${i}`;
            sliderContainer.appendChild(imgElement);
        }

        // Append the slider elements to the roomImageSection
        roomImageSection.appendChild(prevArrow);
        roomImageSection.appendChild(sliderContainer);
        roomImageSection.appendChild(nextArrow);

        // Display the first image
        updateSlider();
    }
    //calculate price per night
    function calculatePricePerNight(totalPrice, checkInDate, checkOutDate) {
        const startDate = new Date(checkInDate);
        const endDate = new Date(checkOutDate);
        const timeDiff = endDate.getTime() - startDate.getTime();
        const nightCount = Math.ceil(timeDiff / (1000 * 3600 * 24)); // Calculate number of nights
        return totalPrice / nightCount;
    }
    //room
    async function populateRoomTable(roomData) {
        const roomTableBody = document.getElementById('roomTableBody');
    
        roomData.forEach((room) => {
            const newRow = document.createElement('tr');
    
            const roomTypeCell = document.createElement('td');
            roomTypeCell.textContent = room.description;
            roomType = roomTypeCell.textContent;
            newRow.appendChild(roomTypeCell);
    
            const roomImageCell = document.createElement('td');
            roomImageCell.classList.add('slider-container');

            // Create image slider elements for room images
            const prevArrow = document.createElement('div');
            prevArrow.classList.add('prev-arrow');
            prevArrow.innerHTML = '&#10094;';
            const nextArrow = document.createElement('div');
            nextArrow.classList.add('next-arrow');
            nextArrow.innerHTML = '&#10095;';

            // Add event listeners to arrows for the room image slider
            let currentImageIndex = 0;
            prevArrow.addEventListener('click', () => {
                currentImageIndex = (currentImageIndex - 1 + room.images.length) % room.images.length;
                updateSlider();
            });
            nextArrow.addEventListener('click', () => {
                currentImageIndex = (currentImageIndex + 1) % room.images.length;
                updateSlider();
            });

            // Function to update the room image slider
            function updateSlider() {
                const imgElements = roomImageCell.querySelectorAll('img');
                imgElements.forEach((imgElement, index) => {
                    imgElement.style.display = index === currentImageIndex ? 'block' : 'none';
                });
            }

            room.images.forEach((image) => {
                const imgElement = document.createElement('img');
                imgElement.src = image.url;
                imgElement.alt = `Room Image`;
                imgElement.style.display = 'none';
                roomImageCell.appendChild(imgElement);
            });
            // Append the slider elements to the roomImageCell
            roomImageCell.appendChild(prevArrow);
            roomImageCell.appendChild(nextArrow);
            updateSlider();

            newRow.appendChild(roomImageCell);
    
            const bedTypeCell = document.createElement('td');
            const bedTypeRegex = /<strong>(.*?)<\/strong>/; // Regular expression to extract the bed type
            const bedTypeMatch = room.long_description ? room.long_description.match(bedTypeRegex) : null;
            //const bedTypeMatch = room.long_description.match(bedTypeRegex);
            bedTypeCell.textContent = bedTypeMatch ? bedTypeMatch[1] : '';
            newRow.appendChild(bedTypeCell);
    
            const pricePerNight = calculatePricePerNight(room.price, checkInDate, checkOutDate);
            const priceCell = document.createElement('td');
            priceCell.textContent = `$${pricePerNight.toFixed(2)} per night`;
            total = room.price.toFixed(2); //get total price
            //priceCell.textContent = `$${room.price.toFixed(2)}`;
            newRow.appendChild(priceCell);
    
            const reserveButtonCell = document.createElement('td');
            const reserveButton = document.createElement('button');
            reserveButton.textContent = 'Reserve';
            reserveButtonCell.appendChild(reserveButton);
            newRow.appendChild(reserveButtonCell);

            //add event listener
            reserveButton.addEventListener('click', () => {
                // Replace 'your-reservation-page.html' with the URL of your reservation page
                window.location.href = `/payment?hotel=${hotelName}&checkin=${checkInDate}&checkout=${checkOutDate}&guests=${guestNum}&room=${roomType}&price=${total}`;
            });
    
            roomTableBody.appendChild(newRow);
        });
    }
    
    // Function to display hotel details
    async function displayHotelDetails(hotel) {
        const apikey = 'AIzaSyByyX0tdd-efstrhuPqx1ySt5qKPB5hs9Y';
        // Update room images
        displayImages(hotel.image_details);

        // Update hotel name
        const hotelTitle = document.querySelector('.hotel-title');
        hotelTitle.textContent = hotel.name;
        hotelName = hotelTitle.textContent;

        // Update rating stars
        const starsElement = document.querySelector('.stars');
        starsElement.textContent = displayStars(hotel.rating);

        // Update hotel address
        const addressElement = document.querySelector('.address');
        addressElement.textContent = hotel.address;
        
        // Update hotel description
        const hotelDescription = document.querySelector('.hotel-description p');
        hotelDescription.innerHTML = hotel.description;

        // Update Google Map location with the actual latitude and longitude
        const mapLocation = document.querySelector('.map-location iframe');
        mapLocation.src = `https://www.google.com/maps/embed/v1/view?key=${apikey}&center=${hotel.latitude},${hotel.longitude}&zoom=20`;

        //update amenities
        const amenitiesContainer = document.querySelector('.amenity-box-container');
        amenitiesContainer.innerHTML = ''; // Clear existing amenities (the placeholders)

        // Loop through amenities and add them as amenity boxes
        for (const amenity in hotel.amenities) {
            if (hotel.amenities.hasOwnProperty(amenity) && hotel.amenities[amenity]) {
                const amenityBox = document.createElement('div');
                amenityBox.classList.add('amenity-box');
                amenityBox.textContent = amenity;
                amenitiesContainer.appendChild(amenityBox);
            }
        }
        const roomData = await getHotelRoomData();
        roomLength = roomData.rooms.length;
        populateRoomTable(roomData.rooms);
    }

    function removePlaceholderRow() {
        const placeholderRow = document.querySelector('#roomTableBody tr');
        if (placeholderRow) {
            placeholderRow.remove();
        }
    }

    // Call the function to display hotel details
    displayHotelDetails(hotel);

    // After the table is populated, remove the initial placeholder row
    removePlaceholderRow();
});