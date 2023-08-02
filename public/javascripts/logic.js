const MAX_MATCHES = 10; // Maximum number of matches to display
const language = 'en_US';
const money = 'SGD';
const currentcountry = 'SG';
let guestnum;
const partnerId = 1;

//later add the number of rooms

const search = document.getElementById('destination'); //search input box
const matchls = document.getElementById('scroll-container'); // drop down list

//add new popup message
const checkInDate = document.getElementById('check-in');
const checkOutDate = document.getElementById('check-out');
const numGuests = document.getElementById('guests');
const numRooms = document.getElementById('rooms');

//var to store selected dest uid
let selectedDestinationUid = '';

//search states.json and filter it
const searchDest = async searchText =>{
    const res = await fetch('./destinations.json');
    const dest = await res.json();

    //get matches to current text input
    let matches = dest.filter(dest => {
        const regex = new RegExp(searchText, 'gi'); //`^${searchText}`, 'gi'
        return dest.term && dest.term.match(regex);
    })

    if(searchText.length === 0){
        matches = []; //empty out the search beacuse theres nth in the text box
        //html didnt clear so we have to do this
        matchls.innerHTML = '';
    }

    // Limit the number of matches to display
    matches = matches.slice(0, MAX_MATCHES);

    console.log(matches); 
    outputHtml(matches); 
}


// Add CSS class for cursor pointer on hover
const addCursorPointer = () => {
  const resultCards = document.querySelectorAll('.card');
  resultCards.forEach(card => {
    card.classList.add('cursor-pointer');
  });
}

// Remove CSS class for cursor pointer
const removeCursorPointer = () => {
  const resultCards = document.querySelectorAll('.card');
  resultCards.forEach(card => {
    card.classList.remove('cursor-pointer');
  });
}

//show results in HTML 
const outputHtml = matches => {
    if(matches.length > 0){
        const html = matches.map(match => `
        <div class="card card-body mb-1">
            <h4>
                ${match.term} <span class="text-primary">
            </h4>
        </div>
        `).join(''); //map returns array from arrya
        matchls.innerHTML = html;
        //Added in line 83 this --> ${match.state ? match.state : ''} </span>
        addCursorPointer(); // Add cursor pointer on hover

        // Add click event listener to each result
        const resultCards = document.querySelectorAll('.card');
        resultCards.forEach(card => {
            card.addEventListener('click', () => {
              const selectedText = card.querySelector('h4').innerText;
              search.value = selectedText;
              //store the UID in here to retrieve hotel results
              //selectedDestinationUid = matches.find(dest => dest.term === selectedText)?.uid || '';
              selectedDestinationUid = matches.find(dest => {
                const term = dest.term.trim();
                const state = dest.state ? dest.state.trim() : '';
                return term === selectedText || state === selectedText;
              })?.uid || '';
              console.log('Destination?')
              console.log(selectedDestinationUid);
              matchls.innerHTML = '';
            });
        });

        // Remove cursor pointer when not hovering
        matchls.addEventListener('mouseleave', removeCursorPointer);
    }
}

const submitButton = document.querySelector('.btn');
const handleFormSubmit = event => {
  event.preventDefault(); // Prevent form submission
  // Perform validation
  if (destination.value.trim() === '' || checkInDate.value.trim() === '' || checkOutDate.value.trim() === '' || numGuests.value === '0' || numRooms.value === '0') {
    alert('Please fill in all details!');
  } else {
    console.log(numRooms.value);
    //this is where the api is called to the server
    window.location.href = `/api/disphotels?destination_id=${selectedDestinationUid}&checkin=${checkInDate.value}&checkout=${checkOutDate.value}&lang=${language}&currency=${money}&country_code=${currentcountry}&guests=${numGuests.value}&rooms=${numRooms.value}&partner_id=${partnerId}`;
  }
}

// set the minimum date for the datepicker inputs, greys out the previous dates
function setMinDate() {
  const currentDate = new Date();
  const minDate = currentDate.toISOString().split('T')[0]; // Format to YYYY-MM-DD
  checkInDate.setAttribute('min', minDate);
  checkOutDate.setAttribute('min', minDate);
}
// setMinDate called on page load
setMinDate();

// Function to show/hide the scroll container based on input
const toggleScrollContainer = () => {
  const searchText = search.value.trim();
  if (searchText === '') {
    // If the input is empty, hide the scroll container
    matchls.innerHTML = '';
    matchls.style.display = 'none';
  } else {
    // If there is input, show the scroll container and perform search
    matchls.style.display = 'block';
    searchDest(searchText);
  }
};

//search.addEventListener('input', ()=> searchDest(search.value));
search.addEventListener('input', toggleScrollContainer);

// Function to close the scroll container when clicking outside the input
document.addEventListener('click', (event) => {
  const isInputClicked = search.contains(event.target);
  if (!isInputClicked) {
    matchls.style.display = 'none';
  }
});

submitButton.addEventListener('click', handleFormSubmit);