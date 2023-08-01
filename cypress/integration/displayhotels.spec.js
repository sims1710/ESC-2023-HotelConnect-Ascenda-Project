// cypress/integration/displayhotels.spec.js

describe('Hotel Search Results Page', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3001/DisplayHotels.html'); // Change the URL according to your project
    });
  
    it('should display the search bar with correct fields', () => {
      // Assert that the required input fields and labels are present
      cy.get('input[type="text"][placeholder="e.g. Singapore"]').should('exist');
      cy.contains('label', 'Location').should('exist');
  
      cy.get('input[type="date"][id="check-in"]').should('exist');
      cy.contains('label', 'Check In').should('exist');
  
      cy.get('input[type="date"][id="check-out"]').should('exist');
      cy.contains('label', 'Check Out').should('exist');
  
      cy.get('input[type="text"][placeholder="e.g. 2"]').should('exist');
      cy.contains('label', 'Guests').should('exist');
  
      cy.get('input[type="text"][placeholder="e.g. 2"]').should('exist');
      cy.contains('label', 'Rooms').should('exist');
  
      cy.get('button.btn').should('exist');
    });
  
    it('should display the top bar with correct information', () => {
      // Sample data
      const checkInDate = '2023-07-28';
      const checkOutDate = '2023-07-30';
      const guestNum = '2';
      const roomNum = '1';
      const destination = 'New York, USA';
  
      // Assert that the top bar displays the correct information
      cy.get('#checkInDate').should('contain', checkInDate);
      cy.get('#checkOutDate').should('contain', checkOutDate);
      cy.get('#guestNum').should('contain', guestNum);
      cy.get('#roomNum').should('contain', roomNum);
      cy.get('#destination').should('contain', destination);
    });

    // cypress/integration/displayhotels.spec.js

    function selectPrice(price) {
        // Implement the logic to select the price
        // For example, you can update the top bar with the selected price
        cy.get('#selectedPrice').invoke('text', price);
    }
    
    describe('Hotel Search Results Page', () => {
        // Test cases and beforeEach block as before
    });  
  
    it('should filter hotels by price and rating', () => {
        // Custom command to make the dropdown visible before interacting with it
        cy.get('#priceDropdown')
          .invoke('show')
          .click();
    
        // Click on the desired option in the price dropdown
        cy.contains('#priceDropdown ul li', '$100 - $250').click();
    
        // Custom command to make the dropdown visible before interacting with it
        cy.get('#ratingDropdown')
          .invoke('show')
          .click();
    
        // Click on the desired option in the rating dropdown
        cy.contains('#ratingDropdown ul li', '4 stars').click();
    
        // Assert that the selected price and rating are displayed in the top bar
        cy.contains('#priceDropdown ul li', '$100 - $250').invoke('text').then((price) => {selectPrice(price)});
        cy.get('#selectedPrice').should('contain', '$100 - $250');
        cy.get('#selectedRating').should('contain', '4 stars');
    
        // Add more assertions here to verify the filtering behavior
        // For example, verify that only hotels with the selected price and rating are displayed in the search results.
    });
  
    // Add more test cases to cover other functionalities of the page
  
  });
  