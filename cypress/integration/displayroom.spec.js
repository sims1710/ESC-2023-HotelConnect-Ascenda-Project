/* describe('Hotel Room Page', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3001/DisplayRoom.html');
    });
  
    it('should display room information correctly', () => {
      // check if room table is displayed correctly
      cy.get('.room-table').should('be.visible');
  
      // check if room information is displayed correctly
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
      // check if bed preference selection is working for the first room
      cy.get('.room-table tbody tr').eq(0).find('select').select('Double').should('have.value', 'double');
    });
  
    it('should be able to reserve a room', () => {
      // click "Reserve" button for the first room
      cy.get('.room-table tbody tr').eq(0).contains('Reserve').click();  
    });
  
    it('should be able to add a room to the cart', () => {
      // click "Add to Cart" button for the second room
      cy.get('.room-table tbody tr').eq(1).contains('Add to Cart').click();
    });

    it('should redirect to the payment page when "Confirm Purchase" button is clicked', () => {
        // wait for button to be visible before clicking it
        cy.get('button.selectButton', { timeout: 10000 }).contains('Confirm Purchase').click();
    
        // assert that page URL has changed to payment page
        cy.url().should('include', '/Payment.html');
      });  
  });
   */