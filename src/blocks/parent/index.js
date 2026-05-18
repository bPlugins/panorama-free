
const { registerBlockType } = wp.blocks;
const { InnerBlocks, useBlockProps } = wp.blockEditor;
import metadata from './block.json';
import Edit from './Edit';
import './parent.scss';

registerBlockType(metadata, {
  icon: "images-alt2",
  edit: Edit,
  save: () => {
    const blockProps = useBlockProps.save();
    return (
      <div {...blockProps}>
        <InnerBlocks.Content />
      </div>
    );
  },
});

