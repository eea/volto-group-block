import { Button } from 'semantic-ui-react';
import { BlocksForm, Icon, RenderBlocks } from '@plone/volto/components';
import EditBlockWrapper from './EditBlockWrapper';

import helpSVG from '@plone/volto/icons/help.svg';

const GroupBlockDefaultBody = (props) => {
  const {
    block,
    data,
    onChangeBlock,
    onChangeField,
    pathname,
    selected,
    selectedBlock,
    onSelectBlock,
    setSelectedBlock,
    manage,
    childBlocksForm,
    multiSelected,
    formDescription,
    isEditMode,
  } = props;
  const metadata = props.metadata || props.properties;
  const blockState = {};

  // Get editing instructions from block settings or props
  let instructions = data?.instructions?.data || data?.instructions;
  if (!instructions || instructions === '<p><br/></p>') {
    instructions = formDescription;
  }
  return isEditMode ? (
    <BlocksForm
      metadata={metadata}
      properties={childBlocksForm}
      manage={manage}
      selectedBlock={selected ? selectedBlock : null}
      allowedBlocks={data.allowedBlocks}
      title={data.placeholder}
      description={instructions}
      onSelectBlock={(id, l, e) => {
        const isMultipleSelection = e
          ? e.shiftKey || e.ctrlKey || e.metaKey
          : false;
        onSelectBlock(id, isMultipleSelection, e, selectedBlock);
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
        } else {
          onChangeField(id, value);
        }
      }}
      pathname={pathname}
    >
      {({ draginfo }, editBlock, blockProps) => (
        <EditBlockWrapper
          draginfo={draginfo}
          blockProps={blockProps}
          disabled={data.disableInnerButtons}
          extraControls={
            <>
              {instructions && (
                <>
                  <Button
                    icon
                    basic
                    title="Section help"
                    onClick={() => {
                      setSelectedBlock();
                      const tab = manage ? 0 : 1;
                      props.setSidebarTab(tab);
                    }}
                  >
                    <Icon name={helpSVG} className="" size="19px" />
                  </Button>
                </>
              )}
            </>
          }
          multiSelected={multiSelected.includes(blockProps.block)}
        >
          {editBlock}
        </EditBlockWrapper>
      )}
    </BlocksForm>
  ) : (
    <RenderBlocks {...props} metadata={metadata} content={data?.data || {}} />
  );
};

export default GroupBlockDefaultBody;
