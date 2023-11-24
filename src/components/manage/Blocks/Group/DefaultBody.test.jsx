import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-intl-redux';
import DefaultBody from './DefaultBody';
import configureStore from 'redux-mock-store';
import '@testing-library/jest-dom/extend-expect';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    pathname: '/',
    hash: '',
    search: '',
  }),
}));

jest.mock('@plone/volto/components', () => ({
  BlocksForm: jest.fn(() => <div className="blocks-form">RenderBlocks</div>),
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
      metadata: {},
      properties: {},
      variation: {},
      onSelectBlock: jest.fn(),
      onDeleteBlock: jest.fn(),
      onMutateBlock: jest.fn(),
      onInsertBlock: jest.fn(),
      selected: true,
    };

    const { getByText } = render(
      <Provider store={store}>
        <DefaultBody {...props} />
      </Provider>,
    );
    expect(getByText('RenderBlocks')).toBeInTheDocument();
  });
});
