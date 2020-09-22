import React from 'react';
import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { BlocksForm } from '@eeacms/volto-blocks-form/components';
import './editor.less';
import { settings } from '~/config';

const emptyBlocksForm = () => {
  const id = uuid();
  return {
    blocks: {
      [id]: {
        '@type': settings.defaultBlockType,
        required: true,
      },
    },
    blocks_layout: { items: [id] },
  };
};

export const MetaBlockEdit = (props) => {
  const { block, data, onChangeBlock, pathname, selected, manage } = props;

  const properties = data.data || emptyBlocksForm();
  const [selectedBlock, setSelectedBlock] = useState();
  const blockState = {};

  return (
    <section className="section-block">
      <BlocksForm
        properties={properties}
        manage={manage}
        selectedBlock={selected ? selectedBlock : null}
        allowedBlocks={data.allowedBlocks}
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
    </section>
  );
};
