import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-intl-redux';
import DefaultBody from './DefaultBody';
import configureStore from 'redux-mock-store';
import '@testing-library/jest-dom';

const mockBlocksForm = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    pathname: '/',
    hash: '',
    search: '',
  }),
}));

jest.mock('@plone/volto/components', () => ({
  BlocksForm: jest.fn((props) => {
    mockBlocksForm(props);
    return <div className="blocks-form">RenderBlocks</div>;
  }),
  RenderBlocks: jest.fn(() => <div>RenderBlocks</div>),
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
      onSelectBlock: jest.fn(),
      onChangeBlock: jest.fn(),
      onChangeField: jest.fn(),
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
