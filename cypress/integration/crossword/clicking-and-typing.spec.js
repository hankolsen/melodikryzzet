describe('Dashboard test', () => {
  it('loads the dashboard', () => {
    cy.visit('/');
    cy.contains('Choose crossword');
    cy.get('.list-item__button').should('have.length', 6);
  });

  it('loads a crossword', () => {
    cy.visit('/');
    cy.get('.list-item__button').first().click();
    cy.url().should('include', 'crossword');
    cy.contains('Tema Covers');
  });

  it('should handle mouse clicks', () => {
    // The "input cell" should not be available on first render
    cy.get('.crossword__hidden-input-wrapper').should('not.exist');
    cy.clickCell(0, { force: true });
    // When a cell is selected, the "input cell" should appear
    cy.get('.crossword__hidden-input-wrapper').should('be.visible');
    // A selected cell should highlight the entire row
    cy.hasHighlighted(11);
    cy.cellIsHighlighted(0);
    cy.cellIsHighlighted(10);
    cy.cellIsNotHighlighted(11);
    cy.cellIsNotHighlighted(75);

    // Clicking a new cell, should change the highlights
    cy.clickCell(11);
    cy.hasHighlighted(8);
    cy.cellIsHighlighted(0);
    cy.cellIsHighlighted(11);
    cy.cellIsHighlighted(53);
    cy.cellIsNotHighlighted(1);
    cy.cellIsNotHighlighted(54);

    // Clicking yet another cell twice should change the direction
    cy.clickCell(16, { force: true });
    cy.clickCell(16, { force: true });
    cy.cellIsSelected(16);
    cy.cellIsHighlighted(17);
    cy.cellIsHighlighted(20);
    cy.cellIsNotHighlighted(25);

    // While in "across", clicking a cell that has only a "down" word should change the direction
    cy.clickCell(14);
    cy.cellIsHighlighted(7);
    cy.cellIsHighlighted(50);
    cy.cellIsHighlighted(60);
    cy.cellIsNotHighlighted(17);
    cy.cellIsNotHighlighted(20);

    // It should keep the direction while selecting cells with both "across" and "down" words
    cy.clickCell(51);
    cy.cellIsHighlighted(52);
    cy.clickCell(56);
    cy.cellIsHighlighted(55);
    cy.cellIsHighlighted(57);

    cy.clickCell(7);
    cy.cellIsNotHighlighted(8);
    cy.cellIsHighlighted(14);

    cy.clickCell(56);
    cy.cellIsNotHighlighted(55);
    cy.cellIsNotHighlighted(57);
    cy.cellIsHighlighted(49);
    cy.cellIsHighlighted(62);
  });

  it('should handle keyboard navigation', () => {
    cy.clickCell(0, { force: true });
    cy.typeInCurrentCell('{rightarrow}');
    cy.cellIsSelected(1);
    cy.cellIsNotSelected(0);
    cy.typeInCurrentCell('{rightarrow}');
    cy.typeInCurrentCell('{rightarrow}');
    cy.typeInCurrentCell('{rightarrow}');
    cy.typeInCurrentCell('{downarrow}');
    cy.cellIsSelected(13);
    cy.cellIsHighlighted(4);
    cy.cellIsNotHighlighted(3);
    cy.cellIsHighlighted(20);
  });

  it('should handle typing in the cells', () => {
    // Typing a letter should highlight the entire row
    cy.clickAndTypeInCell(16, 'a');
    cy.hasHighlighted(5);
    cy.cellIsNotHighlighted(0);
    cy.cellIsHighlighted(20);
    cy.cellIsNotHighlighted(21);
    cy.cellIsNotHighlighted(75);

    // It should change continue typing in during a turn
    cy.clickAndTypeInCell(37, 'c');
    cy.cellIsSelected(38);

    cy.typeInCurrentCell('d');
    cy.cellContains(38, 'd');

    cy.typeInCurrentCell('e');
    cy.cellContains(47, 'e');
    cy.cellIsSelected(52);

    // It should not continue moving the input cell when it gets to the end of a word
    cy.typeInCurrentCell('f');
    cy.cellIsSelected(52);
    cy.cellContains(52, 'f');
  });
});
