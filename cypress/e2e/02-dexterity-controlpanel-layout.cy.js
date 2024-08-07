import { slateLayoutBeforeEach, slateLayoutAfterEach } from '../support/e2e';

describe('ControlPanel: Dexterity Content-Types Layout', () => {
  beforeEach(slateLayoutBeforeEach);
  afterEach(slateLayoutAfterEach);

  it('Edit Blocks Layout for Book', () => {
    cy.visit('/controlpanel/dexterity-types');

    cy.get('a[href="/controlpanel/dexterity-types/book"]').should(
      'have.text',
      'book',
    );

    cy.visit('/controlpanel/dexterity-types/book/layout');
    cy.get('#page-controlpanel-layout').contains(
      'Can not edit Layout for book',
    );
    cy.get('#page-controlpanel-layout button').click({ force: true });

    // Wait a bit for draftjs to load, without this the title block
    // custom placeholder is missing and cypress gives a timeout error
    cy.wait(1000);
    cy.get('input[id="field-placeholder"]').type('Book title');
    cy.get('label[for="field-required"]').click();
    cy.get('label[for="field-fixed"]').click();

    cy.getSlate().click();

    cy.get('.ui.basic.icon.button.block-add-button:visible').click();
    cy.get('.blocks-chooser .title').contains('Common').click();
    cy.get('.content.active.common .button.group')
      .contains('Section (Group)')
      .click({ force: true });

    cy.get('legend').contains('Section').click();
    cy.get('#sidebar-settings .field-wrapper-title input').type(
      'Intro section',
    );
    cy.get('#sidebar-settings .field-wrapper-placeholder input').type(
      'Highlighted description',
    );
    cy.get('#sidebar-settings .field-wrapper-maxChars').type('250');
    cy.get(
      '#sidebar-settings .field-wrapper-allowedBlocks .react-select__value-container',
    )
      .click()
      .type('Image{enter}');
    cy.get(
      '#sidebar-settings .field-wrapper-ignoreSpaces .ui.checkbox',
    ).click();
    cy.get('.block-editor-group .blocks-form .block-editor-slate').click();

    cy.get('.ui.basic.icon.button.group-block-add-button:visible').click();
    cy.get('.blocks-chooser .title').contains('Media').click({ force: true });
    cy.get('.content.active.media .button.image')
      .contains('Image')
      .click({ force: true });
    cy.get('.block.image .input input')
      .click()
      .type(
        'https://eea.github.io/volto-eea-design-system/img/eea_icon.png{enter}',
      );

    cy.get('#toolbar-save').click();

    cy.visit('/cypress');

    cy.get('button[class="add"]').click();
    cy.get('#toolbar-add-book').click();
    cy.get('.block.title').contains('Book title');

    // Change book title
    cy.clearSlateTitle();
    cy.getSlateTitle().type('My First Book');
    cy.get('.documentFirstHeading').contains('My First Book');

    cy.get('.section-block .text-slate-editor-inner')
      .click()
      .type('My description');

    cy.get('#toolbar-save').click();
    cy.get('.documentFirstHeading').contains('My First Book');
    cy.get('.block.image img').should(
      'have.attr',
      'src',
      'https://eea.github.io/volto-eea-design-system/img/eea_icon.png',
    );
    cy.get('#page-document').contains('My description');
  });
});
