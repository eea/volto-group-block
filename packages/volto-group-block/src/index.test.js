import applyConfig from './index';

describe('applyConfig', () => {
  it('should add group block configuration', () => {
    const config = {
      blocks: {
        blocksConfig: {
          text: { title: 'Text', restricted: false },
          image: { title: 'Image', restricted: true },
        },
      },
    };

    const newConfig = applyConfig(config);

    expect(newConfig.blocks.blocksConfig.group).toBeDefined();
    expect(newConfig.blocks.blocksConfig.group.id).toEqual('group');
    expect(newConfig.blocks.blocksConfig.group.title).toEqual(
      'Section (Group)',
    );
    expect(newConfig.blocks.blocksConfig.group.icon).toBeDefined();
    expect(newConfig.blocks.blocksConfig.group.view).toBeDefined();
    expect(newConfig.blocks.blocksConfig.group.edit).toBeDefined();
    expect(newConfig.blocks.blocksConfig.group.schema).toBeDefined();
    expect(newConfig.blocks.blocksConfig.group.restricted).toEqual(false);
  });

  it('should include allowed blocks in schema', () => {
    const config = {
      blocks: {
        blocksConfig: {
          text: { title: 'Text', restricted: false },
          image: { restricted: false },
          image_test: { title: 'Image', restricted: true },
        },
      },
    };

    const newConfig = applyConfig(config);

    expect(
      newConfig.blocks.blocksConfig.group.schema.properties.allowedBlocks.items
        .choices,
    ).toEqual([
      ['text', 'Text'],
      ['image', 'image'],
      ['group', 'Group'],
    ]);
  });

  it('should generate tocEntries correctly', () => {
    const config = {
      blocks: {
        blocksConfig: {},
      },
    };

    const block = {
      data: {
        blocks: {
          block1: { value: [{ type: 'h1' }], plaintext: 'Heading 1' },
          block2: { value: [{ type: 'h2' }], plaintext: 'Heading 2' },
          block3: { value: [{ type: 'h3' }], plaintext: 'Heading 3' }, // This should be ignored
        },
        blocks_layout: {
          items: ['block1', 'block2', 'block3'],
        },
      },
    };
    const tocData = {
      levels: ['h1', 'h2'],
    };
    const newConfig = applyConfig(config);
    const entries = newConfig.blocks.blocksConfig.group.tocEntries(
      block,
      tocData,
    );
    expect(entries).toEqual([
      [1, 'Heading 1', 'block1'],
      [2, 'Heading 2', 'block2'],
    ]);
  });

  it('should generate no entries', () => {
    const config = {
      blocks: {
        blocksConfig: {},
      },
    };
    const block = undefined;
    const tocData = {
      levels: undefined,
    };
    const newConfig = applyConfig(config);
    const entries = newConfig.blocks.blocksConfig.group.tocEntries(
      block,
      tocData,
    );
    expect(entries).toEqual([]);
  });
});
