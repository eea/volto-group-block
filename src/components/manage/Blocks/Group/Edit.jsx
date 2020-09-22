import React from 'react';
import { useState } from 'react';
import { isEmpty } from 'lodash';
import { BlocksForm } from '@eeacms/volto-blocks-form/components';
import { emptyBlocksForm } from '@eeacms/volto-blocks-form/helpers';
import './editor.less';

const Edit = (props) => {
  const { block, data, onChangeBlock, pathname, selected, manage } = props;

  const properties = isEmpty(data?.data?.blocks)
    ? emptyBlocksForm()
    : data.data;
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

export default Edit;
