import { __ } from "@wordpress/i18n";
import { Notice } from "../../../../../../../../bpl-tools/Components";
const Item = () => {
  return (
    <>
      <Notice status='premium' isIcon={true}>
        {__('Tour ID, Scene Image, Cubemap (6 Faces) Format (NEW), Title & Author, "by" Prefix, HotSpot Settings, and Starting Scene options are available in the Pro version.', 'panorama')}
      </Notice>
    </>
  );
};

export default Item;
