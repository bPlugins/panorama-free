const { useState, Fragment } = wp.element;
const { Dropdown, ColorPicker, Button, __experimentalUnitControl: UnitControl } = wp.components;
const { __ } = wp.i18n;

import BSpacer from "./BSpacer";

const Spacer = (props) => {
  const { icon = "", value, title = "", onChange, disableAlpha, boxPosition = "top left" } = props;
  const [state, setState] = useState(value);

  return (
    <div className="Spacer">
      <Dropdown
        className="Spacer"
        position={boxPosition}
        renderToggle={({ isOpen, onToggle }) => (
          <Button onClick={onToggle} area-expanded={isOpen}>
            {icon}
          </Button>
        )}
        renderContent={({ isOpen, onToggle, onClose }) => (
          <div className="SpacerPopoverContent">
            <BSpacer value={value} onChange={onChange} />
          </div>
        )}
      />
    </div>
  );
};

export default Spacer;
