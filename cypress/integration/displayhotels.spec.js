describe('Display Hotels Page', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3001/DisplayHotels.html');
    });
  
    // assert that required input fields and labels are present
    it('should display the search bar with correct fields', () => {
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
  });
  