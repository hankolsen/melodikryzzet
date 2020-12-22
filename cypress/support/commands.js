// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('clickCell', (index, options) => {
  cy.get('.crossword__cell').eq(index).click(options);
});

Cypress.Commands.add('cellContains', (index, letter) => {
  cy.get('.crossword__cell')
    .eq(index)
    .siblings('.crossword__cell-text')
    .contains(letter.toUpperCase());
});

Cypress.Commands.add('hasHighlighted', (number) => {
  cy.get('.crossword__cell--highlighted').should('have.length', number);
});

Cypress.Commands.add('clickAndTypeInCell', (index, letter) => {
  cy.clickCell(index);
  cy.get('.crossword__hidden-input').type(letter);
  cy.cellContains(index, letter);
});

Cypress.Commands.add('typeInCurrentCell', (letter) => {
  cy.get('.crossword__hidden-input').type(letter);
});

Cypress.Commands.add('cellIsSelected', (index) => {
  cy.get('.crossword__cell')
    .eq(index)
    .should('have.class', 'crossword__cell--selected');
});

Cypress.Commands.add('cellIsNotSelected', (index) => {
  cy.get('.crossword__cell')
    .eq(index)
    .should('not.have.class', 'crossword__cell--selected');
});

Cypress.Commands.add('cellIsHighlighted', (index) => {
  cy.get('.crossword__cell')
    .eq(index)
    .should('have.class', 'crossword__cell--highlighted');
});

Cypress.Commands.add('cellIsNotHighlighted', (index) => {
  cy.get('.crossword__cell')
    .eq(index)
    .should('not.have.class', 'crossword__cell--highlighted');
});
