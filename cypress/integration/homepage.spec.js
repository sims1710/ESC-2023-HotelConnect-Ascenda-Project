describe('Hotel Connect Home Page', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3001/HomePage.html'); // Change the URL to the correct path of your HTML file
    });
  
    it('should display the header correctly', () => {
      cy.get('.logo').should('be.visible');
      cy.get('.nav-list').should('be.visible');
      cy.get('.nav-item').should('have.length', 4);
    });
  
    it('should allow users to search for hotels', () => {
      cy.get('.input__group input').eq(0).type('Singapore');
      cy.get('.input__group input').eq(1).type('2023-08-01');
      cy.get('.input__group input').eq(2).type('2023-08-10');
      cy.get('.input__group input').eq(3).type('2');
      cy.get('.input__group input').eq(4).type('1');
      cy.get('form').submit();
    });
  
    it('should display popular hotels section correctly', () => {
      cy.get('.popular__container').should('be.visible');
      cy.get('.popular__card').should('have.length', 6);
    });
  
    it('should display client feedback section correctly', () => {
      cy.get('.client__container').should('be.visible');
      cy.get('.client__card').should('have.length', 3);
    });
  
    it('should display the footer correctly', () => {
      cy.get('.footer__container').should('be.visible');
      cy.get('.footer__col').should('have.length', 4);
    });
  
    // Add more test cases as needed to cover other functionalities of the page
  });
  