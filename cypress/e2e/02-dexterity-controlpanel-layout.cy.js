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

    cy.navigate('/controlpanel/dexterity-types/book/layout');
    cy.get('#page-controlpanel-layout').contains(
      'Can not edit Layout for book',
    );
    cy.wait(1000);
    cy.get('#page-controlpanel-layout button').click({ force: true });

    // Wait a bit for draftjs to load, without this the title block
    // custom placeholder is missing and cypress gives a timeout error
    cy.wait(1000);
    cy.get('.block.title').first().click();
    cy.getIfExists('.sidebar-container a.item', () => {
      cy.contains('.sidebar-container a.item', 'Settings').click();
    });
    cy.get('input[id="field-placeholder"]:visible').first().type('Book title');
    cy.get('label[for="field-required"]').click();
    cy.get('label[for="field-fixed"]').click();

    cy.getSlate().click();

    cy.get('.ui.basic.icon.button.block-add-button:visible').click();
    cy.get('.blocks-chooser .title').contains('Common').click();
    cy.get('.content.active.common .button.group')
      .contains('Section (Group)')
      .click({ force: true });

    cy.get('legend').contains('Section').click();
    cy.getIfExists('.sidebar-container a.item', () => {
      cy.contains('.sidebar-container a.item', 'Settings').click();
    });
    cy.getIfExists('.sidebar-container .field-wrapper-title input:visible', () => {
      cy.get('.sidebar-container .field-wrapper-title input:visible')
        .first()
        .type('Intro section');
    });
    cy.getIfExists(
      '.sidebar-container .field-wrapper-placeholder input:visible',
      () => {
        cy.get('.sidebar-container .field-wrapper-placeholder input:visible')
          .first()
          .type('Highlighted description');
      },
    );
    cy.getIfExists(
      '.sidebar-container #field-maxChars:visible, .sidebar-container .field-wrapper-maxChars input:visible',
      () => {
        cy.get(
          '.sidebar-container #field-maxChars:visible, .sidebar-container .field-wrapper-maxChars input:visible',
        )
          .first()
          .type('250');
      },
    );
    cy.getIfExists(
      '.sidebar-container .field-wrapper-allowedBlocks:visible',
      () => {
        cy.get('.sidebar-container .field-wrapper-allowedBlocks:visible')
          .scrollIntoView()
          .within(() => {
            cy.get('.react-select__control').click();
          });
        cy.get(
          '.sidebar-container .field-wrapper-allowedBlocks:visible input:visible',
        )
          .first()
          .type('Image');
        cy.contains('.react-select__option', 'Image').click();
      },
    );
    cy.getIfExists(
      '.sidebar-container .field-wrapper-ignoreSpaces:visible .ui.checkbox',
      () => {
        cy.get(
          '.sidebar-container .field-wrapper-ignoreSpaces:visible .ui.checkbox',
        ).click();
      },
    );
    cy.get('.block-editor-group .blocks-form .block-editor-slate').click();

    cy.get('.ui.basic.icon.button.group-block-add-button:visible').click();
    cy.get('.blocks-chooser .title').contains('Media').click();
    cy.get('.content.active.media .button.image')
      .contains('Image')
      .should('be.visible')
      .click();
    cy.wait(1000);
    cy.get('.block.image')
      .last()
      .within(() => {
        cy.get('button[aria-label="Enter a URL to an image"]')
          .should('be.visible')
          .click();
        cy.get('input[type="text"]:visible, .ui.input input:visible')
          .first()
          .should('be.visible')
          .clear()
          .type(
            'https://eea.github.io/volto-eea-design-system/img/eea_icon.png{enter}',
          );
      });

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
