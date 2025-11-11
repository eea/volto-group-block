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
    figureMetadataBlockIds = new Set(),
  ) =>
  ([id, blockData]) => {
    // Track figure-metadata group block IDs and their children
    if (
      blockData?.['@type'] === 'group' &&
      blockData?.className === 'figure-metadata'
    ) {
      // Get all child block IDs from this group and mark them to be skipped
      if (blockData?.data?.blocks) {
        Object.keys(blockData.data.blocks).forEach((childId) => {
          figureMetadataBlockIds.add(childId);
        });
      }
    }

    // Skip counting if this block is inside a figure-metadata group
    if (figureMetadataBlockIds.has(id)) {
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

const countTextInBlocks = (blocksObject, ignoreSpaces, maxChars) => {
  const { countTextIn } = config.blocks?.blocksConfig?.group || [];
  // use obj ref to update value - if you send number it will not be updated
  const groupCharCount = { value: 0 };
  const figureMetadataBlockIds = new Set();

  if (!maxChars || !blocksObject) {
    return groupCharCount.value;
  }

  visitBlocks(
    blocksObject,
    countTextInEachBlock(
      countTextIn,
      ignoreSpaces,
      groupCharCount,
      figureMetadataBlockIds,
    ),
  );

  return groupCharCount.value;
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
