import { useState } from "react";
import { useBlockProps } from "@wordpress/block-editor";
import { withSelect } from "@wordpress/data";
import Style from "../Common/Style";
import Settings from "./Settings/Settings";
import GoogleStreetViewer from "../Common/GoogleStreetViewer";

const Edit = (props) => {
  const { attributes, setAttributes, clientId, device, isSelected } = props;
  const { panoId } = attributes;
  const [inputValue, setInputValue] = useState("");

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

        <div className="bBlocksGoogleStreetViewer">
          {panoId ? (
            <GoogleStreetViewer attributes={attributes} setAttributes={setAttributes} />
          ) : (
            <div className="container">
              <div className="content">
                <div className="icon">🗺️</div>
                <p className="description"> Enter a panorama ID to get started.</p>
                <div className="input-group">
                  <input
                    type="text"
                    placeholder="Enter Google Street View Panorama ID"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value.trim())}
                  />
                  <button
                    onClick={() => setAttributes({ panoId: inputValue.trim() })}
                    className={!inputValue ? "disabled-btn" : "active-btn"}
                  >
                    Apply
                  </button>

                </div>
                <small className="exampleId">Example Panorama ID : JmSoPsBPhqWvaBmOqfFzgA </small>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default withSelect((select) => {
  return {
    device: select("core/edit-post")
      .__experimentalGetPreviewDeviceType()
      ?.toLowerCase(),
  };
})(Edit);
