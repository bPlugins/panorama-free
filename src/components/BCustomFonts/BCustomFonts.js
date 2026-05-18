const { VisuallyHidden, CustomSelectControl } = wp.components;

import FontList from "./FontList";
import "./styles.scss";

const BCustomFonts = ({ value, onChange }) => {
  return (
    <CustomSelectControl
      label={
        <VisuallyHidden>
          <label>Font Family</label>
        </VisuallyHidden>
      }
      options={FontList.map((item) => ({ key: item, name: item, style: { fontFamily: item } }))}
      onChange={({ selectedItem }) => onChange(selectedItem)}
      value={value}
      className="bpm-custom-font-select"
    />
  );
};

export default BCustomFonts;
