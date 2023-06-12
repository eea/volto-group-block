import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { Provider } from 'react-intl-redux';
import EditBlockWrapper from './EditBlockWrapper';
import configureStore from 'redux-mock-store';
import '@testing-library/jest-dom/extend-expect';

const mockDragInfo = {
  innerRef: {
    current: {
      childMethod: jest.fn(),
    },
  },
  draggableProps: {},
  dragHandleProps: {},
};

const mockStore = configureStore();
const store = mockStore({
  intl: {
    locale: 'en',
    messages: {},
  },
});

describe('EditBlockWrapper', () => {
  const mockBlockProps = {
    allowedBlocks: [],
    block: 'mockBlock',
    data: {},
    onSelectBlock: jest.fn(),
    onDeleteBlock: jest.fn(),
    onMutateBlock: jest.fn(),
    onInsertBlock: jest.fn(),
    selected: true,
  };

  it('renders children', () => {
    const { getByText } = render(
      <Provider store={store}>
        <EditBlockWrapper blockProps={mockBlockProps} draginfo={mockDragInfo}>
          <div>Test child</div>
        </EditBlockWrapper>
      </Provider>,
    );
    expect(getByText('Test child')).toBeInTheDocument();
  });

  it('calls onDeleteBlock when delete button is clicked', () => {
    const { getByTitle } = render(
      <Provider store={store}>
        <EditBlockWrapper blockProps={mockBlockProps} draginfo={mockDragInfo} />
      </Provider>,
    );
    fireEvent.click(getByTitle('Remove block'));
    expect(mockBlockProps.onDeleteBlock).toHaveBeenCalledWith('mockBlock');
  });
});
