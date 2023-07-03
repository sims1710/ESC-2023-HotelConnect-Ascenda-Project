const MAX_MATCHES = 10; // Maximum number of matches to display
const search = document.getElementById('destination'); //search input box
const matchls = document.getElementById('scroll-container'); // drop down list

//Selectors
let header = document.querySelector('.header');
let hamburgerMenu = document.querySelector('.hamburger-menu');

window.addEventListener('scroll', function(){
    let windowPosition = window.scrollY > 0;
    header.classList.toggle('active', windowPosition)
});

hamburgerMenu.addEventListener('click', function (){
    header.classList.toggle('menu-open');
})

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
                ${match.state ? match.state : ''} </span>
            </h4>
        </div>
        `).join(''); //map returns array from arrya
        matchls.innerHTML = html;

        addCursorPointer(); // Add cursor pointer on hover

        // Add click event listener to each result
        const resultCards = document.querySelectorAll('.card');
        resultCards.forEach(card => {
            card.addEventListener('click', () => {
              const selectedText = card.querySelector('h4').innerText;
              search.value = selectedText;
              matchls.innerHTML = '';
            });
        });

        // Remove cursor pointer when not hovering
        matchls.addEventListener('mouseleave', removeCursorPointer);
    }
}

const positionMatchList = () => {
    const searchRect = search.getBoundingClientRect();
    const searchTop = searchRect.top + window.scrollY;
    const searchLeft = searchRect.left + window.scrollX;
  
    matchls.style.position = 'absolute';
    matchls.style.top = searchTop + search.offsetHeight + 'px';
    matchls.style.left = searchLeft + 'px';
  };

search.addEventListener('input', ()=> searchDest(search.value));

// Call the positionMatchList function whenever the window is resized
window.addEventListener('resize', positionMatchList);

// Call the positionMatchList function when the page finishes loading
window.addEventListener('load', positionMatchList);