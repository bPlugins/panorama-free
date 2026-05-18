import { useBlockProps } from "@wordpress/block-editor";
import { withSelect } from "@wordpress/data";
import Style from "../Common/Style";
import Settings from "./Settings/Settings";
import TourViewer from "../Common/TourViewer";

const Edit = (props) => {
  const { attributes, setAttributes, clientId, device, isSelected } = props;

  return (
    <>
      <Settings {...{ attributes, setAttributes, device }} />

      <div {...useBlockProps()}>
        <Style
          attributes={attributes}
          id={`block-${clientId}`}
          device={device}
        />

        {!isSelected && <div className="bPlBlockBeforeSelect"></div>}

        <div className="bBlocksTourViewer">
          <TourViewer {...{ attributes, setAttributes }} device={device} />
        </div>
      </div>
    </>
  );
};

export default withSelect((select) => {
  const { getDeviceType } = select('core/editor');
  return {
    device: getDeviceType()?.toLowerCase() || 'desktop',
  };
})(Edit);
