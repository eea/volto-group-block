import React, { useState } from 'react';
import { isEmpty } from 'lodash';
import { SidebarPortal, Icon, BlockDataForm } from '@plone/volto/components';

import { emptyBlocksForm, withBlockExtensions } from '@plone/volto/helpers';
import BodyComponent from './Body';
import delightedSVG from '@plone/volto/icons/delighted.svg';
import dissatisfiedSVG from '@plone/volto/icons/dissatisfied.svg';
import PropTypes from 'prop-types';
import { Segment } from 'semantic-ui-react';
import EditSchema from './EditSchema';

import cx from 'classnames';
import './editor.less';

const Edit = (props) => {
  const { block, data, onChangeBlock, selected, formDescription } = props;
  const data_blocks = data?.data?.blocks;
  const childBlocksForm = isEmpty(data_blocks) ? emptyBlocksForm() : data.data;

  const [selectedBlock, setSelectedBlock] = useState(
    childBlocksForm.blocks_layout.items[0],
  );

  React.useEffect(() => {
    if (
      isEmpty(data_blocks) &&
      childBlocksForm.blocks_layout.items[0] !== selectedBlock
    ) {
      setSelectedBlock(childBlocksForm.blocks_layout.items[0]);
      onChangeBlock(block, {
        ...data,
        data: childBlocksForm,
      });
    }
  }, [onChangeBlock, childBlocksForm, selectedBlock, block, data, data_blocks]);

  let charCount = 0;

  /**
   * Count the number of characters that are anything except using Regex
   * @param {string} paragraph
   * @returns
   */
  const countCharsWithoutSpaces = (paragraph) => {
    const regex = /[^\s\\]/g;

    return (paragraph.match(regex) || []).length;
  };

  /**
   * Count the number of characters
   * @param {string} paragraph
   * @returns
   */
  const countCharsWithSpaces = (paragraph) => {
    return paragraph?.length || 0;
  };

  /**
   * Recursively look for any block that contains text or plaintext
   * @param {Object} blocksObject
   * @returns
   */
  const countTextInBlocks = (blocksObject) => {
    let groupCharCount = 0;
    if (!props.data.maxChars) {
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

      groupCharCount += props.data.ignoreSpaces
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
    charCount < Math.ceil(props.data.maxChars / 1.05)
      ? 'info'
      : charCount < props.data.maxChars
      ? 'warning'
      : 'danger';

  const counterComponent = props.data.maxChars ? (
    <p
      className={cx('counter', counterClass)}
      onClick={() => {
        setSelectedBlock();
        props.setSidebarTab(1);
      }}
      aria-hidden="true"
    >
      {props.data.maxChars - charCount < 0 ? (
        <>
          <span>{`${
            charCount - props.data.maxChars
          } characters over the limit`}</span>
          <Icon name={dissatisfiedSVG} size="24px" />
        </>
      ) : (
        <>
          <span>{`${
            props.data.maxChars - charCount
          } characters remaining out of ${props.data.maxChars}`}</span>
          <Icon name={delightedSVG} size="24px" />
        </>
      )}
    </p>
  ) : null;

  // Get editing instructions from block settings or props
  let instructions = data?.instructions?.data || data?.instructions;
  if (!instructions || instructions === '<p><br/></p>') {
    instructions = formDescription;
  }

  return (
    <fieldset className="section-block">
      <legend
        onClick={() => {
          setSelectedBlock();
          props.setSidebarTab(1);
        }}
        aria-hidden="true"
      >
        {data.title || 'Section'}
      </legend>
      <BodyComponent
        {...props}
        isEditMode={true}
        selectedBlock={selectedBlock}
        setSelectedBlock={setSelectedBlock}
        childBlocksForm={childBlocksForm}
      />
      {counterComponent}
      <SidebarPortal selected={selected && !selectedBlock}>
        {instructions && (
          <Segment attached>
            <div dangerouslySetInnerHTML={{ __html: instructions }} />
          </Segment>
        )}
        {!data?.readOnlySettings && (
          <BlockDataForm
            schema={EditSchema}
            title="Section (Group) settings"
            formData={data}
            onChangeField={(id, value) => {
              props.onChangeBlock(props.block, {
                ...props.data,
                [id]: value,
              });
            }}
            onChangeBlock={onChangeBlock}
            block={block}
          />
        )}
      </SidebarPortal>
    </fieldset>
  );
};

Edit.propTypes = {
  block: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  onChangeBlock: PropTypes.func.isRequired,
  pathname: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  manage: PropTypes.bool.isRequired,
};

export default withBlockExtensions(Edit);
