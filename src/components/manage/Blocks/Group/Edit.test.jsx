import React from 'react';
import Edit from './Edit';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import thunk from 'redux-thunk';
import renderer from 'react-test-renderer';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

const mockStore = configureStore([thunk]);
const store = mockStore({
  intl: {
    locale: 'en',
    messages: {},
  },
});

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
  };

  it('should render without crashing', () => {
    const component = renderer.create(
      <Provider store={store}>
        <Edit {...props} />
      </Provider>,
    );

    const json = component.toJSON();
    expect(json).toMatchSnapshot();
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
});