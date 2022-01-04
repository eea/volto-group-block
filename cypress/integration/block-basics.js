import { setupBeforeEach, tearDownAfterEach } from '../support';

describe('Blocks Tests', () => {
  beforeEach(setupBeforeEach);
  afterEach(tearDownAfterEach);

  it('Add Block: Empty', () => {
    // without this the clear command below does nothing sometimes
    cy.wait(500);

    // Change page title
    cy.get('[contenteditable=true]').first().clear();

    cy.get('[contenteditable=true]').first().type('My Add-on Page');

    cy.get('.documentFirstHeading').contains('My Add-on Page');

    cy.get('[contenteditable=true]').first().type('{enter}');

    // Add block
    cy.get('.ui.basic.icon.button.block-add-button').first().click();
    cy.get('.blocks-chooser .title').contains('Common').click();
    cy.get('.content.active.common .button.group').contains('Group').click();

    cy.get('[contenteditable=true]').eq(1).focus().click().type('test{enter}');
    cy.get('[contenteditable=true]').eq(2).focus().click().type('test2{enter}');
    cy.get('[contenteditable=true]').eq(3).focus().click().type('test3');

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
});

