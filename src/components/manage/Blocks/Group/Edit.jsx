import React, { useState, useCallback } from 'react';
import cx from 'classnames';
import { isEmpty, without } from 'lodash';
import {
  emptyBlocksForm,
  withBlockExtensions,
  getBlocksLayoutFieldname,
} from '@plone/volto/helpers';
import BodyComponent from './Body';

import config from '@plone/volto/registry';
import {
  SidebarPortal,
  BlockDataForm,
  BlocksToolbar,
} from '@plone/volto/components';
import PropTypes from 'prop-types';
import { Segment } from 'semantic-ui-react';
import EditSchema from './EditSchema';

import CounterComponent from './CounterComponent';
import './editor.less';
import { defineMessages, injectIntl } from 'react-intl';
import { compose } from 'redux';

const messages = defineMessages({
  sectionGroupSettings: {
    id: 'SectionGroupSettings',
    defaultMessage: 'Section (Group) settings',
  },
  section: {
    id: 'sectionTitle',
    defaultMessage: 'Section',
  },
});

const Edit = (props) => {
  const { block, data, onChangeBlock, selected, formDescription } = props;
  const [multiSelected, setMultiSelected] = useState([]);
  const data_blocks = data?.data?.blocks;
  const childBlocksForm = isEmpty(data_blocks) ? emptyBlocksForm() : data.data;

  const [selectedBlock, setSelectedBlock] = useState(
    childBlocksForm.blocks_layout.items[0],
  );

  const handleKeyDown = (
    e,
    index,
    block,
    node,
    {
      disableEnter = false,
      disableArrowUp = false,
      disableArrowDown = false,
    } = {},
  ) => {
    const hasblockActive = !!selectedBlock;
    if (e.key === 'ArrowUp' && !disableArrowUp && !hasblockActive) {
      props.onFocusPreviousBlock(block, node);
      e.preventDefault();
    }
    if (e.key === 'ArrowDown' && !disableArrowDown && !hasblockActive) {
      props.onFocusNextBlock(block, node);
      e.preventDefault();
    }
    if (e.key === 'Enter' && !disableEnter && !hasblockActive) {
      props.onAddBlock(config.settings.defaultBlockType, index + 1);
      e.preventDefault();
    }
  };

  const onSelectBlock = useCallback(
    (id, isMultipleSelection, event, activeBlock) => {
      let newMultiSelected = [];
      let selected = id;

      if (isMultipleSelection) {
        selected = null;
        const blocksLayoutFieldname = getBlocksLayoutFieldname(data?.data);
        const blocks_layout = data?.data[blocksLayoutFieldname].items;
        if (event.shiftKey) {
          const anchor =
            multiSelected.length > 0
              ? blocks_layout.indexOf(multiSelected[0])
              : blocks_layout.indexOf(activeBlock);
          const focus = blocks_layout.indexOf(id);
          if (anchor === focus) {
            newMultiSelected = [id];
          } else if (focus > anchor) {
            newMultiSelected = [...blocks_layout.slice(anchor, focus + 1)];
          } else {
            newMultiSelected = [...blocks_layout.slice(focus, anchor + 1)];
          }
        }
        if ((event.ctrlKey || event.metaKey) && !event.shiftKey) {
          if (multiSelected.includes(id)) {
            selected = null;
            newMultiSelected = without(multiSelected, id);
          } else {
            newMultiSelected = [...(multiSelected || []), id];
          }
        }
      }

      setSelectedBlock(selected);
      setMultiSelected(newMultiSelected);
    },
    [data.data, multiSelected],
  );

  const changeBlockData = (newBlockData) => {
    let pastedBlocks = newBlockData.blocks_layout.items.filter((blockID) => {
      return !data?.data?.blocks_layout.items.find((x) => x === blockID);
    });
    const selectedIndex =
      data.data.blocks_layout.items.indexOf(selectedBlock) + 1;
    onChangeBlock(block, {
      ...data,
      data: {
        ...data?.data,
        ...newBlockData,
        blocks_layout: {
          items: [
            ...data.data.blocks_layout.items.slice(0, selectedIndex),
            ...pastedBlocks,
            ...data.data.blocks_layout.items.slice(selectedIndex),
          ],
        },
      },
    });
  };

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

  // Get editing instructions from block settings or props
  let instructions = data?.instructions?.data || data?.instructions;
  if (!instructions || instructions === '<p><br/></p>') {
    instructions = formDescription;
  }

  return (
    <fieldset
      role="presentation"
      id={props.data.id}
      className={cx('section-block', props.data.className)}
      onKeyDown={(e) => {
        handleKeyDown(e, props.index, props.block, props.blockNode.current);
      }}
      // The tabIndex is required for the keyboard navigation
      /* eslint-disable jsx-a11y/no-noninteractive-tabindex */
      tabIndex={-1}
    >
      <legend
        onClick={() => {
          setSelectedBlock();
          props.setSidebarTab(1);
        }}
        aria-hidden="true"
      >
        {data.title || props.intl.formatMessage(messages.section)}
      </legend>
      <BodyComponent
        {...props}
        isEditMode={true}
        selectedBlock={selectedBlock}
        setSelectedBlock={setSelectedBlock}
        multiSelected={multiSelected}
        setMultiSelected={setMultiSelected}
        onSelectBlock={onSelectBlock}
        childBlocksForm={childBlocksForm}
      />
      {selected ? (
        <BlocksToolbar
          selectedBlock={Object.keys(selectedBlock || {})[0]}
          selectedBlocks={multiSelected}
          onSetSelectedBlocks={(blockIds) => {
            setMultiSelected(blockIds);
          }}
          formData={data.data}
          onSelectBlock={(id, l, e) => {
            const isMultipleSelection = e
              ? e.shiftKey || e.ctrlKey || e.metaKey
              : false;

            onSelectBlock(id, isMultipleSelection, e, selectedBlock);
          }}
          onChangeBlocks={(newBlockData) => {
            changeBlockData(newBlockData);
          }}
        />
      ) : (
        ''
      )}
      {props.data.maxChars && (
        <CounterComponent {...props} setSelectedBlock={setSelectedBlock} />
      )}
      <SidebarPortal selected={selected && !selectedBlock}>
        {instructions && (
          <Segment attached>
            <div dangerouslySetInnerHTML={{ __html: instructions }} />
          </Segment>
        )}
        {!data?.readOnlySettings && (
          <BlockDataForm
            schema={EditSchema(props.intl)}
            title={props.intl.formatMessage(messages.sectionGroupSettings)}
            formData={data}
            onChangeField={(id, value) => {
              props.onChangeBlock(props.block, {
                ...props.data,
                [id]: value,
              });
            }}
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

export default compose(injectIntl, withBlockExtensions)(Edit);
