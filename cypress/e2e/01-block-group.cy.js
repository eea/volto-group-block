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

    // Add block
    cy.get('.ui.basic.icon.button.block-add-button').first().click();
    cy.get('.blocks-chooser .title').contains('Common').click();
    cy.get('.content.active.common .button.group')
      .contains('Section (Group)')
      .click({ force: true });

    cy.contains('Block').click();

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

    cy.get('.block-toolbar svg')
      .first()
      .trigger('mousedown', { button: 0 })
      .trigger('mousemove', 10, -40, { force: true })
      .trigger('mouseup', 10, -40, { force: true });

    // Save
    cy.get('#toolbar-save').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/cypress/my-page');

    // then the page view should contain our changes
    cy.contains('My Add-on Page');
    cy.contains('test2');
  });

  it('Add Block: Make content type and add group block to layout', () => {
    cy.clearSlateTitle();
    cy.getSlateTitle().type('My Add-on Page');

    cy.get('.documentFirstHeading').contains('My Add-on Page');

    cy.get('#toolbar-save').click();
    cy.get('.user').click();
    cy.get('a[href="/controlpanel"]').click();
    cy.get('a[href="/controlpanel/dexterity-types"]').click();

    // add the content type
    cy.get('#toolbar-add').click();
    cy.get('#field-title').click().type('Test Content Type');
    cy.get('.actions button[aria-label="Save"]').click();

    // change the layout
    cy.get('.ui.dropdown.actions-test_content_type').click();
    cy.get('.item.layout-test_content_type').click();
    cy.contains('Enable editable Blocks').click();
    cy.getSlate().click();

    // Add block
    cy.get('.ui.basic.icon.button.block-add-button').first().click();
    cy.get('.blocks-chooser .title').contains('Common').click();
    cy.get('.content.active.common .button.group')
      .contains('Section (Group)')
      .click({ force: true });
    cy.contains('Section').click();

    cy.get('.sidebar-container #field-placeholder')
      .click()
      .type('Test Helper Text');
    cy.get(
      '.sidebar-container .field-wrapper-instructions div[role="textbox"] p',
    )
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
    cy.get('#toolbar-add-test_content_type').click();
    cy.get('#field-title').click().type('Test Content Type');
    cy.get('.block-editor-group div[role="textbox"]')
      .click()
      .type('/description{enter}');
    cy.get('.block-editor-group .block-editor-slate').click();
    cy.get(
      '.block-editor-slate .block-toolbar button[title="Add block"]',
    ).click();
    cy.get('.blocks-chooser .field.searchbox div.ui.input input')
      .click()
      .focus()
      .type('Description{enter}');
    cy.get(
      '.blocks-chooser .accordion div[aria-label="Unfold Text blocks"]',
    ).click();
    cy.get('.ui.basic.icon.button.description').click();
    cy.get('button[title="Remove block"]').click();

    // delete the content type
    cy.get('#toolbar-save').click();
    cy.get('.user').click();
    cy.get('a[href="/controlpanel"]').click();
    cy.get('a[href="/controlpanel/dexterity-types"]').click();

    cy.get('.ui.dropdown.actions-test_content_type').click();
    cy.get('.item.delete-test_content_type').click();
    cy.get('button.ui.primary.button').should('contain', 'Yes').click();
  });
});
