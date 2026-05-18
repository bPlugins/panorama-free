import { PanelBody, TextControl } from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import { updateData } from "../../../../../../../../bpl-tools/utils/functions";
import { useState } from "@wordpress/element";
import { Notice } from '../../../../../../../../bpl-tools/Components';

const General = ({ attributes, setAttributes }) => {
  const { panoId } = attributes;
  const [showHelp, setShowHelp] = useState(false);

  return (<>
    <PanelBody
      className="bPlPanelBody"
      title={__("View Adjustment Controls", "panorama")}
    >
      <TextControl
        label={__("Panorama ID", "panorama")}
        placeholder={__("Enter Panorama ID", "panorama")}
        help={
          <span
            style={{
              color: "#2271b1",
              cursor: "pointer",
              fontSize: "12px",
              textDecoration: "underline",
            }}
            onClick={() => setShowHelp(true)}
          >
            How to find Panorama ID?
          </span>
        }
        value={panoId}
        onChange={(v) =>
          setAttributes({ panoId: updateData(panoId, v.trim()) })
        }
      />

      <Notice status='premium' isIcon={true}>
        {__('Set Initial View, Hide Default Control, Auto Rotate, Auto Rotate Speed & Inactivity Delay are available in the Pro version.', 'panorama')}
      </Notice>

    </PanelBody>

    {showHelp && (
      <div className="panorama-help-modal">
        <div className="content">
          <h3>How to Find Google Street View Panorama ID</h3>

          <ol>
            <li>Open <b>Google Maps</b></li>
            <li>Search your desired location</li>
            <li>Drag the yellow Street View icon onto a road</li>
            <li>When Street View opens, copy the browser URL</li>
            <li>Find <b>panoid=</b> in the URL</li>
            <li>Copy the text after <b>panoid=</b></li>
          </ol>

          <p><b>Example URL:</b></p>
          <code>
            https://www.google.com/maps/...panoid=JmSoPsBPhqWvaBmOqfFzgA
          </code>

          <p><b>Panorama ID:</b></p>
          <code>JmSoPsBPhqWvaBmOqfFzgA</code>

          <button
            className="close"
            onClick={() => setShowHelp(false)}
          >
            Close
          </button>
        </div>
      </div>
    )}

  </>
  );
};

export default General;
