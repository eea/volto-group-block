import React from 'react';
import { render } from '@testing-library/react';
import CounterComponent from './CounterComponent';
import '@testing-library/jest-dom/extend-expect';

jest.mock('@plone/volto/registry', () => ({
  blocks: {
    blocksConfig: {
      group: {
        countTextIn: ['text'],
      },
    },
  },
}));

jest.mock('@plone/volto-slate/editor/render', () => ({
  serializeNodesToText: jest.fn((nodes) =>
    nodes.map((node) => node.text).join(' '),
  ),
}));

describe('CounterComponent', () => {
  const setSidebarTab = jest.fn();
  const setSelectedBlock = jest.fn();

  it('should render info class when character count is less than 95% of maxChars', () => {
    const { container, getByText } = render(
      <CounterComponent
        data={{
          maxChars: 100,
          data: {
            blocks: {
              block1: { '@type': 'text', plaintext: 'test' },
            },
            blocks_layout: {
              items: ['block1'],
            },
          },
        }}
        setSidebarTab={setSidebarTab}
        setSelectedBlock={setSelectedBlock}
      />,
    );
    expect(getByText('96 characters remaining out of 100')).toBeInTheDocument();
    expect(container.querySelector('.counter.info')).toBeInTheDocument();
  });

  it('should render warning class when character count is between 95% and 100% of maxChars', () => {
    const { container, getByText } = render(
      <CounterComponent
        data={{
          maxChars: 100,
          data: {
            blocks: {
              block1: { '@type': 'text', plaintext: 'test'.repeat(24) },
            },
            blocks_layout: {
              items: ['block1'],
            },
          },
        }}
        setSidebarTab={setSidebarTab}
        setSelectedBlock={setSelectedBlock}
      />,
    );
    expect(getByText('4 characters remaining out of 100')).toBeInTheDocument();
    expect(container.querySelector('.counter.warning')).toBeInTheDocument();
  });

  it('should render warning class when character count is over the maxChars', () => {
    const { container, getByText } = render(
      <CounterComponent
        data={{
          maxChars: 100,
          data: {
            blocks: {
              block1: { '@type': 'text', plaintext: 'test'.repeat(26) },
            },
            blocks_layout: {
              items: ['block1'],
            },
          },
        }}
        setSidebarTab={setSidebarTab}
        setSelectedBlock={setSelectedBlock}
      />,
    );
    expect(getByText('4 characters over the limit')).toBeInTheDocument();
    expect(container.querySelector('.counter.danger')).toBeInTheDocument();
  });

  it('should handle click event', () => {
    const { container } = render(
      <CounterComponent
        data={{
          maxChars: 100,
          data: {
            blocks: {
              block1: {
                '@type': 'text',
                plaintext: 'test'.repeat(24),
                ignoreSpaces: true,
              },
            },
            blocks_layout: {
              items: ['block1'],
            },
          },
        }}
        setSidebarTab={setSidebarTab}
        setSelectedBlock={setSelectedBlock}
      />,
    );
    container.querySelector('.counter').click();
    expect(setSidebarTab).toHaveBeenCalledWith(1);
    expect(setSelectedBlock).toHaveBeenCalled();
  });

  it('should handle click event with maxChar undefined', () => {
    const { container } = render(
      <CounterComponent
        data={{
          maxChars: undefined,
          data: undefined,
        }}
        setSidebarTab={setSidebarTab}
        setSelectedBlock={setSelectedBlock}
      />,
    );
    container.querySelector('.counter').click();
    expect(setSidebarTab).toHaveBeenCalledWith(1);
    expect(setSelectedBlock).toHaveBeenCalled();
  });

  it('should handle click event with data undefined', () => {
    const { container } = render(
      <CounterComponent
        data={{
          maxChars: 100,
          data: undefined,
        }}
        setSidebarTab={setSidebarTab}
        setSelectedBlock={setSelectedBlock}
      />,
    );
    container.querySelector('.counter').click();
    expect(setSidebarTab).toHaveBeenCalledWith(1);
    expect(setSelectedBlock).toHaveBeenCalled();
  });

  it('should handle click event with plaintext undefined, but values present', () => {
    const { container } = render(
      <CounterComponent
        data={{
          maxChars: 100,
          data: {
            blocks: {
              block1: {
                '@type': 'text',
                plaintext: undefined,
                value: [
                  { text: 'test' },
                  { children: [{ text: 'more text' }] },
                ],
              },
            },
            blocks_layout: {
              items: ['block1'],
            },
          },
        }}
        setSidebarTab={setSidebarTab}
        setSelectedBlock={setSelectedBlock}
      />,
    );
    container.querySelector('.counter').click();
    expect(setSidebarTab).toHaveBeenCalledWith(1);
    expect(setSelectedBlock).toHaveBeenCalled();
  });

  it('should handle click event with plaintext undefined and values is not an array and the type is in countTextIn', () => {
    const { container } = render(
      <CounterComponent
        data={{
          maxChars: 100,
          data: {
            blocks: {
              block1: {
                '@type': 'text',
                plaintext: undefined,
                value: {},
              },
            },
            blocks_layout: {
              items: ['block1'],
            },
          },
        }}
        setSidebarTab={setSidebarTab}
        setSelectedBlock={setSelectedBlock}
      />,
    );
    container.querySelector('.counter').click();
    expect(setSidebarTab).toHaveBeenCalledWith(1);
    expect(setSelectedBlock).toHaveBeenCalled();
  });

  it('should handle click event with plaintext undefined and values is not an array and the type is not in countTextIn', () => {
    const { container } = render(
      <CounterComponent
        data={{
          maxChars: 100,
          data: {
            blocks: {
              block1: {
                '@type': 'test',
                plaintext: undefined,
                value: {},
              },
            },
            blocks_layout: {
              items: ['block1'],
            },
          },
        }}
        setSidebarTab={setSidebarTab}
        setSelectedBlock={setSelectedBlock}
      />,
    );
    container.querySelector('.counter').click();
    expect(setSidebarTab).toHaveBeenCalledWith(1);
    expect(setSelectedBlock).toHaveBeenCalled();
  });

  it('should render warning class when chars are within overflow zone (maxCharsOverflowPercent=10)', () => {
    const { container, getByText } = render(
      <CounterComponent
        data={{
          maxChars: 100,
          maxCharsOverflowPercent: 10,
          data: {
            blocks: {
              block1: { '@type': 'text', plaintext: 'a'.repeat(105) },
            },
            blocks_layout: {
              items: ['block1'],
            },
          },
        }}
        setSidebarTab={setSidebarTab}
        setSelectedBlock={setSelectedBlock}
      />,
    );
    expect(getByText('5 characters over the limit')).toBeInTheDocument();
    expect(container.querySelector('.counter.warning')).toBeInTheDocument();
  });

  it('should render danger class when chars exceed overflow zone (maxCharsOverflowPercent=10)', () => {
    const { container, getByText } = render(
      <CounterComponent
        data={{
          maxChars: 100,
          maxCharsOverflowPercent: 10,
          data: {
            blocks: {
              block1: { '@type': 'text', plaintext: 'a'.repeat(111) },
            },
            blocks_layout: {
              items: ['block1'],
            },
          },
        }}
        setSidebarTab={setSidebarTab}
        setSelectedBlock={setSelectedBlock}
      />,
    );
    expect(getByText('11 characters over the limit')).toBeInTheDocument();
    expect(container.querySelector('.counter.danger')).toBeInTheDocument();
  });

  it('should render warning class when chars equal maxChars with no overflow percent', () => {
    const { container, getByText } = render(
      <CounterComponent
        data={{
          maxChars: 100,
          data: {
            blocks: {
              block1: { '@type': 'text', plaintext: 'a'.repeat(100) },
            },
            blocks_layout: {
              items: ['block1'],
            },
          },
        }}
        setSidebarTab={setSidebarTab}
        setSelectedBlock={setSelectedBlock}
      />,
    );
    expect(getByText('0 characters remaining out of 100')).toBeInTheDocument();
    expect(container.querySelector('.counter.warning')).toBeInTheDocument();
  });

  it('should render danger class when negative overflow percent falls back to maxChars', () => {
    const { container, getByText } = render(
      <CounterComponent
        data={{
          maxChars: 100,
          maxCharsOverflowPercent: -5,
          data: {
            blocks: {
              block1: { '@type': 'text', plaintext: 'a'.repeat(104) },
            },
            blocks_layout: {
              items: ['block1'],
            },
          },
        }}
        setSidebarTab={setSidebarTab}
        setSelectedBlock={setSelectedBlock}
      />,
    );
    expect(getByText('4 characters over the limit')).toBeInTheDocument();
    expect(container.querySelector('.counter.danger')).toBeInTheDocument();
  });

  it('should use persisted charCount from data instead of recomputing', () => {
    const { container, getByText } = render(
      <CounterComponent
        data={{
          maxChars: 100,
          charCount: 42,
          data: {
            blocks: {
              block1: { '@type': 'text', plaintext: 'a'.repeat(90) },
            },
            blocks_layout: {
              items: ['block1'],
            },
          },
        }}
        setSidebarTab={setSidebarTab}
        setSelectedBlock={setSelectedBlock}
      />,
    );
    // Should use charCount=42 from data, not 90 from blocks
    expect(getByText('58 characters remaining out of 100')).toBeInTheDocument();
    expect(container.querySelector('.counter.info')).toBeInTheDocument();
  });
});
