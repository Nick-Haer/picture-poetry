/// <reference types="cypress" />

const siteUrl = 'localhost:3000';

describe('Visit the site and ensure it loads properly', () => {
    beforeEach(() => {
      cy.visit(siteUrl);
    })

    it('Can navigate to the landing page', () => {
        cy.get('h3').should('have.text', 'Picture Poetry');

        cy.get('a').should('have.lengthOf', 4);

        cy.get('p.about-text').should(($ps) => {
            expect($ps).to.have.length(2);
            expect($ps.eq(0)).to.contain('Picture Poetry is dedicated')
            expect($ps.eq(1)).to.contain('Write to frame')
        })
    });

    it('Can navigate to the Poems page and view pre-populated poems', () => {

      cy.get('a').contains('Poems').click();

      cy.get('div.poem-container').should('have.length.above', 0);

      cy.get('div.poem-container').eq(0).children().should('have.lengthOf', 2);
  });


    it('Can navigate to the login page', () => {
      cy.get('a').contains('Login').click();

      cy.get('div#login-box').should('include.text', 'Login Here')
});

    it('Can navigate to the landing page', () => {
    cy.get('a').first().click();

    cy.get('h3').should('have.text', 'Picture Poetry');
});
  
})  