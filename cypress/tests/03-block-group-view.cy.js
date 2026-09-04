import { slateBeforeEach, slateAfterEach } from '../support/e2e';

const setPageTitle = (title) => {
  cy.clearSlateTitle();
  cy.getSlateTitle().type(title);
  cy.get('.documentFirstHeading').contains(title);
};

const addGroupBlock = () => {
  cy.getSlate().click();
  cy.get('.block-editor-slate [contenteditable=true]')
    .last()
    .focus()
    .click()
    .type('/group{enter}');
  cy.get('.block-editor-group').should('exist');
};

const openGroupSettings = () => {
  cy.get('.block-editor-group .section-block legend')
    .first()
    .click({ force: true });
  cy.get('body').then(($body) => {
    const settingsTab = $body
      .find('.sidebar-container a.item')
      .filter((_, el) => el.textContent?.includes('Settings'));

    if (settingsTab.length) {
      cy.wrap(settingsTab[0]).click({ force: true });
    }
  });
};

const setGroupTitle = (title) => {
  cy.get(
    '.sidebar-container .field-wrapper-title input:visible, .sidebar-container #field-title:visible',
  )
    .first()
    .clear()
    .type(title);
};

const setGroupHtmlElement = (element) => {
  cy.get('body').then(($body) => {
    if ($body.find('.sidebar-container .field-wrapper-as select:visible').length) {
      cy.get('.sidebar-container .field-wrapper-as select:visible')
        .first()
        .select(element, { force: true });
      return;
    }

    if ($body.find('.sidebar-container select#field-as:visible').length) {
      cy.get('.sidebar-container select#field-as:visible')
        .first()
        .select(element, { force: true });
      return;
    }

    cy.get(
      '.sidebar-container .field-wrapper-as .react-select__control:visible, .sidebar-container #field-as .react-select__control:visible',
    )
      .first()
      .click();
    cy.contains('.react-select__option', new RegExp(`^${element}$`, 'i')).click({
      force: true,
    });
  });
};

const saveAndAssertViewUrl = () => {
  cy.get('#toolbar-save').click();
  cy.url().should('eq', `${Cypress.config().baseUrl}/cypress/my-page`);
};

describe('Group Block: View Mode Tests', () => {
  beforeEach(slateBeforeEach);
  afterEach(slateAfterEach);

  it('persists nested content after edit-view-edit cycles', () => {
    setPageTitle('Group View Persistence');
    addGroupBlock();

    cy.get('.block-editor-group .blocks-form [contenteditable=true]')
      .first()
      .focus()
      .click()
      .type('Group content');

    openGroupSettings();
    setGroupTitle('Intro Section 2026!');

    saveAndAssertViewUrl();

    cy.get('#page-document #intro-section').should('contain', 'Group content');

    cy.visit('/cypress/my-page/edit');
    openGroupSettings();
    setGroupTitle('Updated Intro');

    saveAndAssertViewUrl();

    cy.get('#page-document #updated-intro')
      .should('exist')
      .and('contain', 'Group content');
    cy.get('#page-document #intro-section').should('not.exist');
  });

  it('applies HTML5 element setting in view mode', () => {
    setPageTitle('Group HTML5 Element');
    addGroupBlock();

    cy.get('.block-editor-group .blocks-form [contenteditable=true]')
      .first()
      .focus()
      .click()
      .type('Section semantic content');

    openGroupSettings();
    setGroupTitle('Highlights Area');
    setGroupHtmlElement('section');

    saveAndAssertViewUrl();

    cy.get('#page-document section#highlights-area')
      .should('exist')
      .and('contain', 'Section semantic content');
  });
});
