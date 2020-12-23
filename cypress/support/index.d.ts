/// <reference types="cypress" />
declare namespace Cypress {
  interface Chainable {
    // From commands.js
    clickCell(index: number, options: unknown): Chainable<Element>;
    cellContains(index: number, letter: string): Chainable<Element>;
    hasHighlighted(index: number): Chainable<Element>;
    clickAndTypeInCell(index: number, letter: string): Chainable<Element>;
    typeInCurrentCell(letter: string): Chainable<Element>;
    cellIsSelected(index: number): Chainable<Element>;
    cellIsNotSelected(index: number): Chainable<Element>;
    cellIsHighlighted(index: number): Chainable<Element>;
    cellIsNotHighlighted(index: number): Chainable<Element>;
  }
}
