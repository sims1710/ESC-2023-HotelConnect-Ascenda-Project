describe('Home Page', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3001/HomePage.html');
    });
  
    it('should display the header correctly', () => {
      cy.get('.logo').should('be.visible');
      cy.get('.nav-list').should('be.visible');
      cy.get('.nav-item').should('have.length', 4);
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
  });
  