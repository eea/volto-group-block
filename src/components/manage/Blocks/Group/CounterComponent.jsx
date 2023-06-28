import cx from 'classnames';
import isString from 'lodash/isString';
import isArray from 'lodash/isArray';
import { Icon } from '@plone/volto/components';
import config from '@plone/volto/registry';
import { visitBlocks } from '@plone/volto/helpers/Blocks/Blocks';
import { serializeNodesToText } from '@plone/volto-slate/editor/render';
import delightedSVG from '@plone/volto/icons/delighted.svg';
import dissatisfiedSVG from '@plone/volto/icons/dissatisfied.svg';

const CounterComponent = ({ data, setSidebarTab, setSelectedBlock }) => {
  const { maxChars } = data;
  let charCount = 0;

  const countCharsWithoutSpaces = (paragraph) => {
    const regex = /[^\s\\]/g;

    return (paragraph.match(regex) || []).length;
  };

  const countCharsWithSpaces = (paragraph) => {
    return paragraph?.length || 0;
  };

  const countTextInBlocks = (blocksObject) => {
    const { countTextIn } = config.blocks?.blocksConfig?.group;
    let groupCharCount = 0;
    if (!maxChars) {
      return groupCharCount;
    }
    if (!blocksObject) return groupCharCount;

    visitBlocks(blocksObject, ([id, data]) => {
      let foundText;
      if (data && countTextIn?.includes(data?.['@type'])) {
        if (isString(data?.plaintext)) foundText = data?.plaintext;
        else if (isArray(data?.value) && data?.value !== null)
          foundText = serializeNodesToText(data?.value);
      } else foundText = '';

      groupCharCount += data?.ignoreSpaces
        ? countCharsWithoutSpaces(foundText)
        : countCharsWithSpaces(foundText);
    });

    return groupCharCount;
  };

  charCount = countTextInBlocks(data?.data);

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
