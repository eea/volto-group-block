import { BlocksForm } from '@eeacms/volto-blocks-form/components';
import { emptyBlocksForm } from '@eeacms/volto-blocks-form/helpers';
import { Icon } from '@plone/volto/components';
import delightedSVG from '@plone/volto/icons/delighted.svg';
import dissatisfiedSVG from '@plone/volto/icons/dissatisfied.svg';
import { isEmpty } from 'lodash';
import React, { useState } from 'react';
import './editor.less';

const Edit = (props) => {
  const { block, data, onChangeBlock, pathname, selected, manage } = props;

  const metadata = props.metadata || props.properties;
  const properties = isEmpty(data?.data?.blocks)
    ? emptyBlocksForm()
    : data.data;

  const [selectedBlock, setSelectedBlock] = useState(
    properties.blocks_layout.items[0],
  );

  React.useEffect(() => {
    if (
      isEmpty(data?.data?.blocks) &&
      properties.blocks_layout.items[0] !== selectedBlock
    ) {
      setSelectedBlock(properties.blocks_layout.items[0]);
      onChangeBlock(block, {
        ...data,
        data: properties,
      });
    }
  }, [
    onChangeBlock,
    properties,
    selectedBlock,
    block,
    data,
    data?.data?.blocks,
  ]);

  const blockState = {};
  let charCount = 0;

  const showCharCounter = () => {
    if (props.data?.data?.blocks) {
      Object.keys(props.data?.data?.blocks).forEach((blockId) => {
        charCount =
          charCount + props.data.data.blocks[blockId]?.plaintext?.length || 0;
      });
    }
  };
  showCharCounter();

  const colors = { ok: '#CCC', warning: 'darkorange', danger: 'crimson' };
  const counterStyle = {
    color:
      charCount < Math.ceil(props.data.maxChars / 1.05)
        ? colors.ok
        : charCount < props.data.maxChars
        ? colors.warning
        : colors.danger,
    textAlign: 'end',
  };
  const counterComponent = props.data.maxChars ? (
    <p style={counterStyle} className="counter">
      {props.data.maxChars ? (
        props.data.maxChars - charCount < 0 ? (
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
        )
      ) : (
        charCount
      )}
    </p>
  ) : null;

  return (
    <section className="section-block">
      <BlocksForm
        metadata={metadata}
        properties={properties}
        manage={manage}
        selectedBlock={selected ? selectedBlock : null}
        allowedBlocks={data.allowedBlocks}
        title={data.placeholder}
        description={data?.instructions?.data}
        onSelectBlock={(id) => setSelectedBlock(id)}
        onChangeFormData={(newFormData) => {
          onChangeBlock(block, {
            ...data,
            data: newFormData,
          });
        }}
        onChangeField={(id, value) => {
          if (['blocks', 'blocks_layout'].indexOf(id) > -1) {
            blockState[id] = value;
            onChangeBlock(block, {
              ...data,
              data: {
                ...data.data,
                ...blockState,
              },
            });
          }
        }}
        pathname={pathname}
      />

      {counterComponent}
    </section>
  );
};

export default Edit;
