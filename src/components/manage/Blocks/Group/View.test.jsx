import React from 'react';
import View from './View';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

const mockGroupBlockDefaultBody = jest.fn(() => (
  <div>GroupBlockDefaultBody</div>
));

jest.mock('@eeacms/volto-group-block/components', () => ({
  GroupBlockDefaultBody: (props) => mockGroupBlockDefaultBody(props),
}));

jest.mock('@plone/volto/helpers/Extensions', () => ({
  withBlockExtensions: jest.fn((Component) => Component),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    pathname: '/',
    hash: '',
    search: '',
  }),
}));

describe('View', () => {
  beforeEach(() => {
    mockGroupBlockDefaultBody.mockClear();
  });

  it('should render without crashing', () => {
    const props = {
      data: {},
      metadata: {},
      properties: {},
      variation: {},
    };
    render(<View {...props} />);
    expect(screen.getByText('GroupBlockDefaultBody')).toBeInTheDocument();
  });

  it('renders with default tag and without crashing', () => {
    const props = {
      data: {
        variation: {},
      },
      metadata: {},
      properties: {},
      variation: {},
    };
    const { container } = render(<View {...props} />);
    expect(container.querySelector('div')).toBeInTheDocument();
  });

  it('renders with a custom tag and custom id', () => {
    const props = {
      data: {
        as: 'section',
        title: 'Test Title',
        data: { key: 'value' },
      },
      properties: {},
      variation: {},
    };
    const { container } = render(<View {...props} />);
    expect(container.querySelector('section')).toBeInTheDocument();
    expect(container.querySelector('#test-title')).toBeInTheDocument();
  });

  it('renders GroupBlockDefaultBody with correct props', () => {
    const props = {
      data: {
        as: 'section',
        title: 'Test Title',
        data: { key: 'value' },
      },
      metadata: { meta: 'data' },
      properties: { prop: 'erty' },
      variation: {},
      location: {
        pathname: '/',
        search: '',
        hash: '',
      },
    };
    render(<View {...props} />);
    expect(mockGroupBlockDefaultBody).toHaveBeenCalled();
    const bodyProps = mockGroupBlockDefaultBody.mock.calls.at(-1)[0];
    expect(bodyProps).toEqual(
      expect.objectContaining({
        metadata: props.metadata,
        data: props.data,
        location: props.location,
      }),
    );
  });
});
