import cx from 'classnames';
import isString from 'lodash/isString';
import isArray from 'lodash/isArray';
import { Icon } from '@plone/volto/components';
import config from '@plone/volto/registry';
import { visitBlocks } from '@plone/volto/helpers/Blocks/Blocks';
import { serializeNodesToText } from '@plone/volto-slate/editor/render';
import delightedSVG from '@plone/volto/icons/delighted.svg';
import dissatisfiedSVG from '@plone/volto/icons/dissatisfied.svg';

const countCharsWithoutSpaces = (paragraph) => {
  const regex = /[^\s\\]/g;
  return (paragraph.match(regex) || []).length;
};

const countCharsWithSpaces = (paragraph) => {
  return paragraph?.length || 0;
};

const countTextInBlocks = (blocksObject, ignoreSpaces, maxChars) => {
  const { countTextIn } = config.blocks?.blocksConfig?.group;
  let groupCharCount = 0;
  if (!maxChars || !blocksObject) {
    return groupCharCount;
  }

  visitBlocks(blocksObject, ([id, blockData]) => {
    const foundText =
      blockData && countTextIn?.includes(blockData?.['@type'])
        ? isString(blockData?.plaintext)
          ? blockData?.plaintext
          : isArray(blockData?.value) && blockData?.value !== null
          ? serializeNodesToText(blockData?.value)
          : ''
        : '';

    groupCharCount += ignoreSpaces
      ? countCharsWithoutSpaces(foundText)
      : countCharsWithSpaces(foundText);
  });

  return groupCharCount;
};

const CounterComponent = ({ data, setSidebarTab, setSelectedBlock }) => {
  const { maxChars, ignoreSpaces } = data;
  const charCount = countTextInBlocks(data?.data, ignoreSpaces, maxChars);
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
