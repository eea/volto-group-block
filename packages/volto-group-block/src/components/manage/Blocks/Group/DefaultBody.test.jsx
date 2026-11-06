import { vi } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-intl-redux';
import DefaultBody from './DefaultBody';
import configureStore from 'redux-mock-store';
import '@testing-library/jest-dom';

const mockBlocksForm = vi.fn();

vi.mock('react-router-dom', async () => ({
  ...(await vi.importActual('react-router-dom')),
  useLocation: () => ({
    pathname: '/',
    hash: '',
    search: '',
  }),
}));

vi.mock('@plone/volto/components/manage/Blocks/Block/BlocksForm', () => {
  return {
    default: vi.fn((props) => {
      mockBlocksForm(props);
      return <div className="blocks-form">RenderBlocks</div>;
    }),
  };
});

vi.mock('@plone/volto/components/theme/View/RenderBlocks', () => ({
  default: vi.fn(() => <div>RenderBlocks</div>),
}));

const mockStore = configureStore();
const store = mockStore({
  intl: {
    locale: 'en',
    messages: {},
  },
});

describe('DefaultBody', () => {
  beforeEach(() => {
    mockBlocksForm.mockClear();
  });

  it('renders children', () => {
    const props = {
      data: {
        variation: {},
      },
      metadata: {},
      properties: {},
      variation: {},
    };

    const { getByText } = render(
      <Provider store={store}>
        <DefaultBody {...props} />
      </Provider>,
    );
    expect(getByText('RenderBlocks')).toBeInTheDocument();
  });
});

describe('DefaultBody Edit', () => {
  it('renders children', () => {
    const props = {
      isEditMode: true,
      data: {
        variation: {},
        allowedBlocks: ['listing'],
      },
      childBlocksForm: {
        blocks: {
          a: {
            '@type': 'slate',
          },
        },
        blocks_layout: {
          items: ['a'],
        },
      },
      metadata: {},
      properties: {},
      variation: {},
      onSelectBlock: vi.fn(),
      onChangeBlock: vi.fn(),
      onChangeField: vi.fn(),
      selectedBlock: 'a',
      selected: true,
      manage: true,
      pathname: '/',
    };

    const { getByText } = render(
      <Provider store={store}>
        <DefaultBody {...props} />
      </Provider>,
    );
    expect(getByText('RenderBlocks')).toBeInTheDocument();
    expect(mockBlocksForm).toHaveBeenCalledTimes(1);
    expect(mockBlocksForm.mock.calls[0][0].children).toBeUndefined();
  });
});

describe('DefaultBody empty group', () => {
  it('fills a group emptied by the nested form in the same change', () => {
    const onChangeBlock = vi.fn();
    render(
      <Provider store={store}>
        <DefaultBody
          isEditMode
          block="group"
          data={{ variation: {}, data: {} }}
          childBlocksForm={{
            blocks: { a: { '@type': 'slate' } },
            blocks_layout: { items: ['a'] },
          }}
          metadata={{}}
          onChangeBlock={onChangeBlock}
        />
      </Provider>,
    );

    mockBlocksForm.mock.calls.at(-1)[0].onChangeFormData({
      blocks: {},
      blocks_layout: { items: [] },
    });

    const childData = onChangeBlock.mock.calls[0][1].data;
    expect(childData.blocks_layout.items).toHaveLength(1);
    expect(Object.keys(childData.blocks)).toEqual(
      childData.blocks_layout.items,
    );
  });
});
