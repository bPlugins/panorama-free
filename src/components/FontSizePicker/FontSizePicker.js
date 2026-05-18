const { useState, Fragment } = wp.element;
const { Dropdown, ColorPicker, Button, __experimentalUnitControl: UnitControl } = wp.components;
const { __ } = wp.i18n;

import "./styles.scss";
import FontSize from "../Icons/fontSize";
import BUnitControl from "../BUnitControl/BUnitControl";

/**
 *
 * @props
 * value: (String) --required
 * defaultColor: (String)
 * onChange: (Function) required
 * className: (String)
 * disableAlpha: (Boolean)
 * @boxPosition: 'top left' (String)
 *
 * return rgba color code
 */
const FontSizePicker = (props) => {
  const { value, title = "", picker = true, onChange, disableAlpha, boxPosition = "top left" } = props;
  const [state, setState] = useState(value);

  const units = [
    { value: "px", label: "px", default: 14 },
    { value: "rem", label: "rem", default: 1 },
    { value: "em", label: "em", default: 1 },
  ];
  return (
    <div className="FontSizePicker">
      {picker ? (
        <Dropdown
          className="FontSizePicker"
          position={boxPosition}
          renderToggle={({ isOpen, onToggle }) => (
            <Button onClick={onToggle} area-expanded={isOpen}>
              <FontSize height={25} width={25} />
            </Button>
          )}
          renderContent={({ isOpen, onToggle, onClose }) => (
            <div className="FontSizePickerPopoverContent">
              <BUnitControl onChange={onChange} value={value || 14} units={units} />
            </div>
          )}
        />
      ) : (
        <div className="FontSizePickerPopoverContent">
          <BUnitControl onChange={onChange} value={value || 14} units={units} />
        </div>
      )}
    </div>
  );
};

export default FontSizePicker;
