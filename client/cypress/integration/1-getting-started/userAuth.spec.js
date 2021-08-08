const siteUrl = 'localhost:3000';

describe('Visit the site and ensure it loads properly', () => {
    beforeEach(() => {
      // Cypress starts out with a blank slate for each test
      // so we must tell it to visit our website with the `cy.visit()` command.
      // Since we want to visit the same URL at the start of all our tests,
      // we include it in our beforeEach function so that it runs before each test
      cy.visit(siteUrl);
    })

it('Can login successfully with a pre-populated test account', () => {
    cy.get('a').contains('Login').click();

    cy.get('input.login-input[name*="email"]').type('test@test.com')

    cy.get('input.login-input[name*="password"]').type('password123456')

    cy.get('button.login-input').click();

    cy.get('a').should('have.lengthOf', 6);

    cy.get('a').contains('Logout').click();

    cy.get('a').should('have.lengthOf', 5);
  })

  //Warning: This will create an actual test account
  it('Fails to sign up with an account with the same email', () => {
    cy.get('a').contains('Sign Up').click();

    cy.get('input.signup-input[name*="email"]').type('test@test.com')

    cy.get('input.signup-input[name*="username"]').type('testing')

    cy.get('input.signup-input[name*="password"]').eq(0).type('password123456')

    cy.get('input.signup-input[name*="password2"]').type('password123456')

    cy.get('button').contains('Submit').click()

    cy.get('div.alert').should('have.text', 'An account with that email already exists')

    cy.get('a').should('have.lengthOf', 5);
  })

});