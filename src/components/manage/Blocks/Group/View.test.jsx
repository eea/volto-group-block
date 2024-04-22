import React from 'react';
import View from './View';
import { render, screen } from '@testing-library/react';
import { RenderBlocks } from '@plone/volto/components';
import '@testing-library/jest-dom/extend-expect';

jest.mock('@plone/volto/components', () => ({
  RenderBlocks: jest.fn(() => <div>RenderBlocks</div>),
  BodyComponent: () => <div>BodyComponent</div>,
}));

jest.mock('@plone/volto/helpers', () => ({
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
  it('should render without crashing', () => {
    const props = {
      data: {},
      metadata: {},
      properties: {},
      variation: {},
    };
    render(<View {...props} />);
    expect(screen.getByText('RenderBlocks')).toBeInTheDocument();
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

  it('renders RenderBlocks with correct props', () => {
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
    expect(RenderBlocks).toHaveBeenCalledWith(
      expect.objectContaining({
        metadata: props.metadata,
        content: props.data.data,
        location: props.location,
      }),
      {},
    );
  });
});
