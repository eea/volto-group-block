import { useMemo, useEffect } from 'React';
import cx from 'classnames';
import { Icon } from '@plone/volto/components';
import delightedSVG from '@plone/volto/icons/delighted.svg';
import dissatisfiedSVG from '@plone/volto/icons/dissatisfied.svg';

const CounterComponent = ({ data, setSidebarTab, setSelectedBlock }) => {
  const { maxChars } = data;
  let charCount = 0;
  const data_blocks = data?.data?.blocks;

  const countCharsWithoutSpaces = (paragraph) => {
    const regex = /[^\s\\]/g;

    return (paragraph.match(regex) || []).length;
  };

  const countCharsWithSpaces = (paragraph) => {
    return paragraph?.length || 0;
  };

  const countTextInBlocks = (blocksObject) => {
    let groupCharCount = 0;
    if (!maxChars) {
      return groupCharCount;
    }

    Object.keys(blocksObject).forEach((blockId) => {
      const foundText = blocksObject[blockId]?.plaintext
        ? blocksObject[blockId]?.plaintext
        : blocksObject[blockId]?.text?.blocks[0]?.text
        ? blocksObject[blockId].text.blocks[0].text
        : blocksObject[blockId]?.data?.blocks
        ? countTextInBlocks(blocksObject[blockId]?.data?.blocks)
        : blocksObject[blockId]?.blocks
        ? countTextInBlocks(blocksObject[blockId]?.blocks)
        : '';
      const resultText =
        typeof foundText === 'string' || foundText instanceof String
          ? foundText
          : '';

      groupCharCount += data.ignoreSpaces
        ? countCharsWithoutSpaces(resultText)
        : countCharsWithSpaces(resultText);
    });

    return groupCharCount;
  };

  const showCharCounter = () => {
    if (data_blocks) {
      charCount = countTextInBlocks(data_blocks);
    }
  };
  showCharCounter();

  const counterClass =
    charCount < Math.ceil(maxChars / 1.05)
      ? 'info'
      : charCount < maxChars
      ? 'warning'
      : 'danger';

  return (
    <p
      className={cx('counter', counterClass)}
      onClick={() => {
        setSelectedBlock();
        setSidebarTab(1);
      }}
      aria-hidden="true"
    >
      {maxChars - charCount < 0 ? (
        <>
          <span>{`${charCount - maxChars} characters over the limit`}</span>
          <Icon name={dissatisfiedSVG} size="24px" />
        </>
      ) : (
        <>
          <span>{`${
            maxChars - charCount
          } characters remaining out of ${maxChars}`}</span>
          <Icon name={delightedSVG} size="24px" />
        </>
      )}
    </p>
  );
};

export default CounterComponent;
