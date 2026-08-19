import { __ } from "@wordpress/i18n";
import { InlineMediaUpload } from "../../../../bpl-tools/Components";

const CUBE_FACES = [
  { key: "front", label: __("Front Face (f)", "panorama"), placeholder: __("Front image URL", "panorama") },
  { key: "right", label: __("Right Face (r)", "panorama"), placeholder: __("Right image URL", "panorama") },
  { key: "back",  label: __("Back Face (b)", "panorama"),  placeholder: __("Back image URL", "panorama") },
  { key: "left",  label: __("Left Face (l)", "panorama"),  placeholder: __("Left image URL", "panorama") },
  { key: "up",    label: __("Top / Up Face (u)", "panorama"), placeholder: __("Top image URL", "panorama") },
  { key: "down",  label: __("Bottom / Down Face (d)", "panorama"), placeholder: __("Bottom image URL", "panorama") },
];

const CubeMapUpload = ({ value = {}, onChange, className = "" }) => {
  const cubeValues = value || {};

  const handleFaceChange = (faceKey, url) => {
    const updated = {
      ...cubeValues,
      [faceKey]: url || "",
    };
    onChange(updated);
  };

  const uploadedCount = CUBE_FACES.filter(({ key }) => Boolean(cubeValues[key])).length;

  return (
    <div className={`bppiv-cubemap-upload-wrapper ${className}`} style={{ marginTop: "14px" }}>
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "4px"
      }}>
        <label style={{
          fontSize: "12px",
          fontWeight: "600",
          color: "#1e293b",
          margin: 0
        }}>
          {__("6 Cube Faces", "panorama")}
        </label>
        <span style={{
          fontSize: "10px",
          fontWeight: "600",
          color: uploadedCount === 6 ? "#16a34a" : "#64748b",
          background: uploadedCount === 6 ? "#f0fdf4" : "#f1f5f9",
          padding: "2px 7px",
          borderRadius: "10px",
          border: uploadedCount === 6 ? "1px solid #bbf7d0" : "1px solid #e2e8f0"
        }}>
          {uploadedCount} / 6 {__("Uploaded", "panorama")}
        </span>
      </div>

      <p style={{
        fontSize: "11px",
        color: "#64748b",
        margin: "0 0 12px 0",
        lineHeight: "1.4"
      }}>
        {__("Upload 6 square images (1:1 aspect ratio, e.g. 1024×1024) of identical dimensions.", "panorama")}
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {CUBE_FACES.map(({ key, label, placeholder }) => (
          <InlineMediaUpload
            key={key}
            label={label}
            placeholder={placeholder}
            value={cubeValues[key] || ""}
            onChange={(url) => handleFaceChange(key, url)}
          />
        ))}
      </div>
    </div>
  );
};

export default CubeMapUpload;
