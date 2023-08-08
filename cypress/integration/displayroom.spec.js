describe('Hotel Room Page', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3001/DisplayRoom.html'); // Change the URL to the correct path of your HTML file
    });
  
    it('should display hotel information correctly', () => {
      cy.get('.hotel-title').should('contain', 'Fake Hotel Name');
      cy.get('.address').should('contain', '123 Example Street, City, Country');
      cy.get('.stars').should('contain', '★★★★★');
      cy.get('.description').should('contain', 'This is a fake hotel description.');
  
      // Check if room amenities are displayed correctly
      cy.get('.amenities').should('contain', 'Room Amenities:');
      cy.get('.amenities').should('contain', 'AC');
      cy.get('.amenities').should('contain', 'Balcony');
      cy.get('.amenities').should('contain', 'Free WiFi');
      cy.get('.amenities').should('contain', 'Shower');
      cy.get('.amenities').should('contain', 'Toiletries');
  
      // Check if hotel description is displayed correctly
      cy.get('.hotel-description').should(
        'contain',
        'Meals are served from 7:00 AM to 10:00 PM in the hotel\'s restaurant.'
      );
      cy.get('.hotel-description').should('contain', 'The hotel has a swimming pool,');
      cy.get('.hotel-description').should('contain', '24-hour front desk service, and a fitness center.');
      cy.get('.hotel-description').should('contain', 'Guests can enjoy free WiFi in all areas of the hotel.');
    });
  
    it('should display room information correctly', () => {
      // Check if room table is displayed correctly
      cy.get('.room-table').should('be.visible');
  
      // Check if room information is displayed correctly
      cy.get('.room-table tbody tr').eq(0).should('contain', 'Standard Room');
      cy.get('.room-table tbody tr').eq(0).should('contain', 'Single');
      cy.get('.room-table tbody tr').eq(0).should('contain', '$100');
  
      cy.get('.room-table tbody tr').eq(1).should('contain', 'Deluxe Room');
      cy.get('.room-table tbody tr').eq(1).should('contain', 'Single');
      cy.get('.room-table tbody tr').eq(1).should('contain', '$200');
  
      cy.get('.room-table tbody tr').eq(2).should('contain', 'Suite');
      cy.get('.room-table tbody tr').eq(2).should('contain', 'Single');
      cy.get('.room-table tbody tr').eq(2).should('contain', '$300');
    });
  
    it('should be able to select bed preference in the room table', () => {
      // Check if bed preference selection is working for the first room
      cy.get('.room-table tbody tr').eq(0).find('select').select('Double').should('have.value', 'double');
    });
  
    it('should be able to reserve a room', () => {
      // Click the "Reserve" button for the first room
      cy.get('.room-table tbody tr').eq(0).contains('Reserve').click();
  
      // Assert that the page URL has changed to the booking confirmation page (replace '/booking-confirmation.html' with the correct URL)
      // cy.url().should('include', '/booking-confirmation.html');
    });
  
    it('should be able to add a room to the cart', () => {
      // Click the "Add to Cart" button for the second room
      cy.get('.room-table tbody tr').eq(1).contains('Add to Cart').click();
  
      // Assert that a success message or toast indicating the room has been added to the cart is displayed
      // Replace '.success-message' with the selector of the success message element
      // cy.get('.success-message').should('be.visible').contains('Room added to cart successfully!');
    });

    it('should redirect to the payment page when "Confirm Purchase" button is clicked', () => {
        // Wait for the button to be visible before clicking it
        cy.get('button.selectButton', { timeout: 10000 }).contains('Confirm Purchase').click();
    
        // Assert that the page URL has changed to the payment page
        cy.url().should('include', '/Payment.html');
      });
  
    // Add more test cases as needed to cover other functionalities of the page
  });
  