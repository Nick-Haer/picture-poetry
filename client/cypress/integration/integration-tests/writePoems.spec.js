const siteUrl = 'localhost:3000';

describe('Visit the site and ensure it loads properly', () => {
    beforeEach(() => {
      // Cypress starts out with a blank slate for each test
      // so we must tell it to visit our website with the `cy.visit()` command.
      // Since we want to visit the same URL at the start of all our tests,
      // we include it in our beforeEach function so that it runs before each test
      cy.visit(siteUrl);

      cy.get('a').contains('Login').click();

      cy.get('input.login-input[name*="email"]').type('test@test.com');
  
      cy.get('input.login-input[name*="password"]').type('password123456');
  
      cy.get('button.login-input').click();
  
    })

it('Can Navigate to the poems page and write a poem, which can be foud listed with all poems', () => {
    cy.get('a').contains('Write').click();

    cy.get('img.met-painting').should('be.visible');

    cy.wait(1000);

    cy.get('input.poem-title-input').type('Testing', 'delay');

    cy.get('textarea').type(`a testing poems' text \n can't measure up to the rest \n but it helps devs rest`);

    cy.get('button.poem-write-button').click();

    cy.wait(1000);

    cy.get('a').contains('Poems').click();

    cy.get('h1.poem-title').contains('Testing');

    cy.get('a').contains('My Poems').click();

    cy.get('div.poem-container').should('have.length.above', 0);

    cy.get('button').contains('Delete Poem').click();

    cy.get('div.no-poems-found').should('have.text', 'No poems here yet. Go ahead and write some!')
  })

});