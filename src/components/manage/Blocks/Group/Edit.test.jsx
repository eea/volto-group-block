import React from 'react';
import { default as Edit } from './Edit';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import thunk from 'redux-thunk';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

const mockStore = configureStore([thunk]);
const store = mockStore({
  intl: {
    locale: 'en',
    messages: {},
  },
});

jest.mock('@plone/volto/components', () => ({
  BlocksForm: jest.fn(() => <div className="blocks-form">RenderBlocks</div>),
  Icon: () => <div>Icon</div>,
  SidebarPortal: () => <div>SidebarPortal</div>,
  BlocksToolbar: () => <div>BlocksToolbar</div>,
  BlockDataForm: () => <div>BlockDataForm</div>,
  RenderBlocks: jest.fn(() => <div>RenderBlocks</div>),
}));

jest.mock('@plone/volto/helpers', () => ({
  withBlockExtensions: jest.fn((Component) => Component),
  emptyBlocksForm: jest.fn(),
  getBlocksLayoutFieldname: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    pathname: '/',
    hash: '',
    search: '',
  }),
}));

describe('Edit', () => {
  const onChangeBlock = jest.fn();
  const onChangeField = jest.fn();
  const mockBlockNode = { current: {} };
  const props = {
    block: 'testBlock',
    data: {
      data: {
        blocks: {
          block1: {
            type: 'test',
            data: {
              value: 'Test',
            },
          },
        },
        blocks_layout: {
          items: ['block1'],
        },
      },
    },
    onChangeBlock,
    onChangeField,
    pathname: '/',
    selected: true,
    manage: true,
    variation: {},
  };

  it('should render without crashing', () => {
    const { container, getByRole } = render(
      <Provider store={store}>
        <Edit {...props} />
      </Provider>,
    );

    expect(getByRole('presentation')).toBeInTheDocument();
    expect(container.querySelector('legend')).toBeInTheDocument();
    expect(container.querySelector('div.blocks-form')).toBeInTheDocument();
    expect(screen.getByText('BlocksToolbar')).toBeInTheDocument();
    expect(screen.getByText('SidebarPortal')).toBeInTheDocument();
  });

  it('renders without crashing', () => {
    const { getByRole } = render(
      <Provider store={store}>
        <Edit {...props} />
      </Provider>,
    );
    expect(getByRole('presentation')).toBeInTheDocument();
  });

  it('should call ArrowUp keydown', () => {
    const mockOnFocusPreviousBlock = jest.fn();
    const { getByRole } = render(
      <Provider store={store}>
        <Edit
          {...props}
          onFocusPreviousBlock={mockOnFocusPreviousBlock}
          blockNode={mockBlockNode}
        />
      </Provider>,
    );
    fireEvent.keyDown(getByRole('presentation'), { key: 'ArrowUp', code: 38 });
  });

  it('should call ArrowUp keydown', () => {
    const props = {
      block: 'testBlock',
      data: {
        instructions: 'test',
        data: {
          blocks: {
            block1: {
              type: 'test',
              data: {
                value: 'Test',
              },
            },
          },
          blocks_layout: {
            items: [undefined],
          },
        },
      },
      onChangeBlock,
      onChangeField,
      pathname: '/',
      selected: true,
      manage: true,
      variation: {},
    };
    const mockOnFocusPreviousBlock = jest.fn();
    const mockOnFocusNextBlock = jest.fn();
    const mockOnAddBlock = jest.fn();
    const mockSidebarTab = jest.fn();

    const { container } = render(
      <Provider store={store}>
        <Edit
          {...props}
          onFocusPreviousBlock={mockOnFocusPreviousBlock}
          onFocusNextBlock={mockOnFocusNextBlock}
          onAddBlock={mockOnAddBlock}
          blockNode={mockBlockNode}
          setSidebarTab={mockSidebarTab}
        />
      </Provider>,
    );

    fireEvent.keyDown(container.querySelector('.section-block'), {
      key: 'ArrowUp',
      code: 38,
    });
    fireEvent.keyDown(container.querySelector('.section-block'), {
      key: 'ArrowDown',
      code: 40,
    });
    fireEvent.keyDown(container.querySelector('.section-block'), {
      key: 'Enter',
      code: 13,
    });

    fireEvent.click(container.querySelector('.blocks-form'), {
      shiftKey: true,
    });
    fireEvent.click(container.querySelector('.section-block legend'));
  });

  it('should call ArrowUp keydown', () => {
    const props = {
      block: 'testBlock',
      data: {
        instructions: 'test',
        data: {
          blocks: {
            block1: {
              type: 'test',
              data: {
                value: 'Test',
              },
            },
          },
          blocks_layout: {
            items: [undefined],
          },
        },
      },
      onChangeBlock,
      onChangeField,
      pathname: '/',
      selected: true,
      manage: true,
      variation: {},
    };
    const mockOnFocusPreviousBlock = jest.fn();
    const mockOnFocusNextBlock = jest.fn();
    const mockOnAddBlock = jest.fn();
    const mockSidebarTab = jest.fn();
    const { container } = render(
      <Provider store={store}>
        <Edit
          {...props}
          onFocusPreviousBlock={mockOnFocusPreviousBlock}
          onFocusNextBlock={mockOnFocusNextBlock}
          onAddBlock={mockOnAddBlock}
          setSidebarTab={mockSidebarTab}
          blockNode={mockBlockNode}
        />
      </Provider>,
    );

    fireEvent.click(container.querySelector('.section-block legend'));
  });
});
