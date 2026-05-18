import { Notice } from "../../../../../../../bpl-tools/Components";
import { __ } from "@wordpress/i18n";

const GalleryItemPanel = () => {

  return (
    <Notice status='premium' isIcon={true}>
      {__('Image and video upload, Initial View setup, and Initial Zoom Level controls are available in the Pro version.', 'panorama')}
    </Notice>
  );
};

export default GalleryItemPanel;
