const { Component, Fragment, useState } = wp.element;
const { PanelRow, __experimentalNumberControl } = wp.components;
const NumberControl = __experimentalNumberControl;
const { __ } = wp.i18n;

/**
 *
 * @props {Object} label: {top: "Top", right: "Right", bottom: "Bottom", left: "Left"}
 * @props {Object} value: { top: 0, right: 0, bottom: 0, left: 0 },
 * @props {Object} enable: { top = true, right = true, bottom = true, left = true },
 * @props {Booleaa} isDragEnabled: false
 * @props {Boolean} isShiftStepEnabled: true
 * @props {Number} shiftStep: 10
 * @props {String} width: '250px'
 * @props {String} ClassName: ''
 * @props {Function} onChange
 * @returns {Object}
 */
const BSpacer = (props) => {
  const {
    enable: { top = true, right = true, bottom = true, left = true },
    onChange,
    value = {},
    label,
    isShiftStepEnabled = true,
    isDragEnabled = false,
    shiftStep = 10,
    className = " ",
    width = "250px",
  } = props;

  const onChangeHandler = (to, v) => {
    onChange({ ...value, [to]: v });
  };

  return (
    <Fragment>
      <PanelRow>
        <div className={className} style={{ width: width, maxWidth: "100%", display: "flex" }}>
          {top && (
            <NumberControl
              label={label.top || __("Top", "panorama-lite")}
              isShiftStepEnabled={isShiftStepEnabled}
              isDragEnabled={isDragEnabled}
              onChange={(v) => {
                onChangeHandler("top", parseInt(v));
              }}
              shiftStep={shiftStep}
              value={value.top}
            />
          )}
          {right && (
            <NumberControl
              label={label.right || __("Right", "panorama-lite")}
              isShiftStepEnabled={isShiftStepEnabled}
              isDragEnabled={isDragEnabled}
              onChange={(v) => onChangeHandler("right", parseInt(v))}
              shiftStep={shiftStep}
              value={value.right}
            />
          )}
          {bottom && (
            <NumberControl
              label={label.bottom || __("Bottom", "panorama-lite")}
              isShiftStepEnabled={isShiftStepEnabled}
              isDragEnabled={isDragEnabled}
              onChange={(v) => onChangeHandler("bottom", parseInt(v))}
              shiftStep={shiftStep}
              value={value.bottom}
            />
          )}
          {left && (
            <NumberControl
              label={label.left || __("Left", "panorama-lite")}
              isShiftStepEnabled={isShiftStepEnabled}
              isDragEnabled={isDragEnabled}
              onChange={(v) => onChangeHandler("left", parseInt(v))}
              shiftStep={shiftStep}
              value={value.left}
            />
          )}
        </div>
      </PanelRow>
    </Fragment>
  );
};

BSpacer.defaultProps = {
  enable: {},
  value: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  label: {},
};
export default BSpacer;
