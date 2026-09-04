import { vi } from 'vitest';
import React from 'react';
import { default as Edit } from './Edit';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import thunk from 'redux-thunk';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

const mockStore = configureStore([thunk]);
const store = mockStore({
  intl: {
    locale: 'en',
    messages: {},
  },
});
const mockBlocksForm = vi.fn();

vi.mock('@plone/volto/components/manage/Form/BlocksToolbar', () => {
  return { default: () => <div>BlocksToolbar</div> };
});

vi.mock('@plone/volto/components/manage/Form/BlockDataForm', () => {
  return { default: () => <div>BlockDataForm</div> };
});

vi.mock('@plone/volto/components/manage/Blocks/Block/BlocksForm', () => {
  return {
    default: vi.fn((props) => {
      mockBlocksForm(props);
      return <div className="blocks-form">RenderBlocks</div>;
    }),
  };
});

vi.mock('@plone/volto/components/manage/Sidebar/SidebarPortal', () => ({
  default: () => <div>SidebarPortal</div>,
}));

vi.mock('@plone/volto/helpers/Blocks/Blocks', () => ({
  emptyBlocksForm: vi.fn(() => ({
    blocks: {},
    blocks_layout: { items: [] },
  })),
  getBlocksLayoutFieldname: vi.fn(() => 'blocks_layout'),
}));

vi.mock('@plone/volto/helpers/Extensions', () => ({
  withBlockExtensions: vi.fn((Component) => Component),
}));

vi.mock('react-router-dom', async () => ({
  ...(await vi.importActual('react-router-dom')),
  useLocation: () => ({
    pathname: '/',
    hash: '',
    search: '',
  }),
}));

describe('Edit', () => {
  const onChangeBlock = vi.fn();
  const onChangeField = vi.fn();
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

  it('adds a root modifier when inner buttons are disabled', () => {
    const { getByRole } = render(
      <Provider store={store}>
        <Edit
          {...props}
          data={{
            ...props.data,
            disableInnerButtons: true,
          }}
        />
      </Provider>,
    );

    expect(getByRole('presentation')).toHaveClass('disable-inner-buttons');
  });

  it('should call ArrowUp keydown', () => {
    const mockOnFocusPreviousBlock = vi.fn();
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
    const mockOnFocusPreviousBlock = vi.fn();
    const mockOnFocusNextBlock = vi.fn();
    const mockOnAddBlock = vi.fn();
    const mockSidebarTab = vi.fn();

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
    const mockOnFocusPreviousBlock = vi.fn();
    const mockOnFocusNextBlock = vi.fn();
    const mockOnAddBlock = vi.fn();
    const mockSidebarTab = vi.fn();
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
