import cx from 'classnames';
import isString from 'lodash/isString';
import isArray from 'lodash/isArray';
import { Icon } from '@plone/volto/components';
import config from '@plone/volto/registry';
import { visitBlocks } from '@plone/volto/helpers/Blocks/Blocks';
import { serializeNodesToText } from '@plone/volto-slate/editor/render';
import delightedSVG from '@plone/volto/icons/delighted.svg';
import dissatisfiedSVG from '@plone/volto/icons/dissatisfied.svg';
import { countCharsWithoutSpaces, countCharsWithSpaces } from './utils';

const countTextInEachBlock =
  (
    countTextIn,
    ignoreSpaces,
    groupCharCount,
    skipBlockIds = new Set(),
    skipBlocksInGroups = [],
  ) =>
  ([id, blockData]) => {
    // Track group blocks matching skip criteria and their children
    if (blockData?.['@type'] === 'group') {
      const shouldSkip = skipBlocksInGroups.some((criteria) => {
        // Check if all criteria match
        return Object.keys(criteria).every((key) => {
          return blockData?.[key] === criteria[key];
        });
      });

      if (shouldSkip) {
        // Get all child block IDs from this group and mark them to be skipped
        if (blockData?.data?.blocks) {
          Object.keys(blockData.data.blocks).forEach((childId) => {
            skipBlockIds.add(childId);
          });
        }
      }
    }

    // Skip counting if this block is inside a skipped group
    if (skipBlockIds.has(id)) {
      return;
    }

    const foundText =
      blockData && countTextIn?.includes(blockData?.['@type'])
        ? isString(blockData?.plaintext)
          ? blockData?.plaintext
          : isArray(blockData?.value) && blockData?.value !== null
          ? serializeNodesToText(blockData?.value)
          : ''
        : '';

    groupCharCount.value += ignoreSpaces
      ? countCharsWithoutSpaces(foundText)
      : countCharsWithSpaces(foundText);
  };

export const countTextInBlocks = (blocksObject, ignoreSpaces, maxChars) => {
  const { countTextIn, skipBlocksInGroups = [] } =
    config.blocks?.blocksConfig?.group || {};
  // use obj ref to update value - if you send number it will not be updated
  const groupCharCount = { value: 0 };
  const skipBlockIds = new Set();

  if (!maxChars || !blocksObject) {
    return groupCharCount.value;
  }

  visitBlocks(
    blocksObject,
    countTextInEachBlock(
      countTextIn,
      ignoreSpaces,
      groupCharCount,
      skipBlockIds,
      skipBlocksInGroups,
    ),
  );

  return groupCharCount.value;
};

const CounterComponent = ({ data, setSidebarTab, setSelectedBlock }) => {
  const maxChars = parseInt(data.maxChars) || 0;
  const maxCharsOverflowPercent = parseInt(data.maxCharsOverflowPercent) || 0;
  const { ignoreSpaces } = data;
  const charCount = countTextInBlocks(data?.data, ignoreSpaces, maxChars);

  const overflowLimit =
    maxCharsOverflowPercent > 0
      ? Math.ceil((maxChars * (100 + maxCharsOverflowPercent)) / 100)
      : maxChars;

  const counterClass =
    charCount < Math.ceil(maxChars / 1.05)
      ? 'info'
      : charCount <= overflowLimit
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
