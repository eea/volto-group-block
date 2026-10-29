import BlocksForm from '@plone/volto/components/manage/Blocks/Block/BlocksForm';
import RenderBlocks from '@plone/volto/components/theme/View/RenderBlocks';
import { countTextInBlocks } from './CounterComponent';
import { useLocation } from 'react-router-dom';

const GroupBlockDefaultBody = (props) => {
  const location = useLocation();
  const {
    block,
    data,
    onChangeBlock,
    onChangeField,
    pathname,
    selected,
    selectedBlock,
    onSelectBlock,
    manage,
    childBlocksForm,
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
      {...props}
      metadata={metadata}
      properties={childBlocksForm}
      manage={manage}
      selectedBlock={selected ? selectedBlock : null}
      allowedBlocks={data.allowedBlocks}
      title={data.placeholder}
      description={instructions}
      isMainForm={false}
      stopPropagation={selectedBlock}
      onSelectBlock={(id, l, e) => {
        const isMultipleSelection = e
          ? e.shiftKey || e.ctrlKey || e.metaKey
          : false;
        onSelectBlock(id, isMultipleSelection, e, selectedBlock);
      }}
      onChangeFormData={(newFormData) => {
        const newData = {
          ...data,
          data: newFormData,
        };
        if (data.maxChars) {
          newData.charCount = countTextInBlocks(
            newFormData,
            data.ignoreSpaces,
            data.maxChars,
          );
        }
        onChangeBlock(block, newData);
      }}
      onChangeField={(id, value) => {
        if (['blocks', 'blocks_layout'].indexOf(id) > -1) {
          blockState[id] = value;
          const newChildData = {
            ...data.data,
            ...blockState,
          };
          const newData = {
            ...data,
            data: newChildData,
          };
          if (data.maxChars) {
            newData.charCount = countTextInBlocks(
              newChildData,
              data.ignoreSpaces,
              data.maxChars,
            );
          }
          onChangeBlock(block, newData);
        } else {
          onChangeField(id, value);
        }
      }}
      pathname={pathname}
    />
  ) : (
    <RenderBlocks
      location={location}
      metadata={metadata}
      content={data?.data || {}}
    />
  );
};

export default GroupBlockDefaultBody;
