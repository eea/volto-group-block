import React, { useState } from 'react';
import { isEmpty } from 'lodash';
import { BlocksForm } from '@plone/volto/components';
import { emptyBlocksForm } from '@plone/volto/helpers';
import './editor.less';

const Edit = (props) => {
  const {
    block,
    data,
    onChangeBlock,
    onSelectBlock,
    pathname,
    selected,
    manage,
  } = props;

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

  return (
    <section className="section-block">
      <BlocksForm
        properties={properties}
        manage={manage}
        selectedBlock={selected ? selectedBlock : null}
        allowedBlocks={data.allowedBlocks}
        title={data.placeholder}
        description={data?.instructions?.data}
        onSelectBlock={(id) => {
          setSelectedBlock(id);
        }}
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
    </section>
  );
};

export default Edit;
