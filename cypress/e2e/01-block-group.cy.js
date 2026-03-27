import { slateBeforeEach, slateAfterEach } from '../support/e2e';

describe('Blocks Tests', () => {
  beforeEach(slateBeforeEach);
  afterEach(slateAfterEach);

  it('Add Block: Empty', () => {
    // Change page title
    cy.clearSlateTitle();
    cy.getSlateTitle().type('My Add-on Page');

    cy.get('.documentFirstHeading').contains('My Add-on Page');

    cy.getSlate().click();

    // Add group block via slash command
    cy.get('.block-editor-slate [contenteditable=true]')
      .last()
      .focus()
      .click()
      .type('/group{enter}');

    cy.get('.block-editor-group [contenteditable=true]')
      .focus()
      .click()
      .type('test{enter}');
    cy.get('.block-editor-group [contenteditable=true]')
      .eq(1)
      .focus()
      .click()
      .type('test2{enter}');
    cy.get('.block-editor-group [contenteditable=true]')
      .eq(2)
      .focus()
      .click()
      .type('test3');

    // Save
    cy.get('#toolbar-save').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/cypress/my-page');

    // then the page view should contain our changes
    cy.contains('My Add-on Page');
    cy.contains('test2');
  });

  it('Add Block: Make Book content type and add group block to layout', () => {
    cy.clearSlateTitle();
    cy.getSlateTitle().type('My Add-on Page');

    cy.get('.documentFirstHeading').contains('My Add-on Page');

    cy.get('#toolbar-save').click();

    // add the content type via API for reliability
    cy.removeContentType('book');
    cy.addContentType('book');

    cy.visit('/controlpanel/dexterity-types');

    // change the layout
    cy.get('.ui.dropdown.actions-book', { timeout: 20000 })
      .should('be.visible')
      .click({ force: true });
    cy.get('.item.layout-book').click({ force: true });
    cy.contains('Enable editable Blocks').click();
    cy.getSlate().click();

    // Add group block via slash command
    cy.get('.block-editor-slate [contenteditable=true]')
      .last()
      .focus()
      .click()
      .type('/group{enter}');

    cy.contains('Section').click();
    cy.getIfExists('.sidebar-container a.item', () => {
      cy.contains('.sidebar-container a.item', 'Settings').click();
    });

    cy.get('.sidebar-container #field-placeholder:visible')
      .first()
      .click()
      .type('Test Helper Text');
    cy.get(
      '.sidebar-container .field-wrapper-instructions div[role="textbox"] p:visible',
    )
      .first()
      .click()
      .type('Description Blocks');
    cy.get(
      '.sidebar-container .field-wrapper-allowedBlocks .react-select__value-container',
    ).click();
    cy.get('.react-select__option')
      .contains('Description')
      .click({ force: true });
    cy.get('.field-wrapper-ignoreSpaces input').click({ force: true });
    cy.get('.field-wrapper-required input').click({ force: true });

    cy.get('#toolbar-save').click();
    cy.get('.ui.button.cancel').click();
    cy.get('a[href="/controlpanel').click();
    cy.contains('Home').click();
    cy.get('#toolbar-add').click();
    cy.get('#toolbar-add-book').click();
    cy.clearSlateTitle();
    cy.getSlateTitle().type('My First Book');
    cy.get('.block-editor-group div[role="textbox"]')
      .click()
      .type('/description{enter}');

    // Save and verify
    cy.get('#toolbar-save').click();
    cy.contains('My First Book');

    // delete the content type
    cy.removeContentType('book');
  });
});
