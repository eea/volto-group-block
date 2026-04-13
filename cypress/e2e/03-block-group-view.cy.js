import { slateBeforeEach, slateAfterEach } from '../support/e2e';

describe('Group Block: View Mode Tests', () => {
  beforeEach(slateBeforeEach);
  afterEach(slateAfterEach);

  it('Group Block: Add and save', () => {
    cy.clearSlateTitle();
    cy.getSlateTitle().type('Group View Test');
    cy.get('.documentFirstHeading').contains('Group View Test');

    cy.getSlate().click();

    // Add group block via slash command
    cy.get('.block-editor-slate [contenteditable=true]')
      .last()
      .focus()
      .click()
      .type('/group{enter}');

    // Type in group block
    cy.get('.block-editor-group [contenteditable=true]')
      .first()
      .focus()
      .click()
      .type('Group content');

    // Save
    cy.get('#toolbar-save').click();
    cy.contains('Group View Test');
  });

  it('Group Block: Multiple sections', () => {
    cy.clearSlateTitle();
    cy.getSlateTitle().type('Group Multiple');

    cy.getSlate().click();

    // Add group block via slash command
    cy.get('.block-editor-slate [contenteditable=true]')
      .last()
      .focus()
      .click()
      .type('/group{enter}');

    // Type in first section
    cy.get('.block-editor-group [contenteditable=true]')
      .first()
      .focus()
      .click()
      .type('Section one');

    // Save
    cy.get('#toolbar-save').click();
    cy.contains('Group Multiple');
  });
});