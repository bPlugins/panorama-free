const { TextControl } = wp.components;
const { useState, useEffect, useRef } = wp.element;

import "./styles.scss";

const MultipleSelect = ({ list = [], options = [], value = [], onChange, placeholder = "Select", label = "" }) => {
  const [selecting, setSelecting] = useState(false);
  const [inputHeight, setInputHeight] = useState(30);
  const ref = useRef(null);

  // const selectedList = ref?.current || document.createElement("div");

  useEffect(() => {
    setInputHeight(ref?.current.offsetHeight);
  }, [value]);

  // selectedList.onblur = () => {
  //   setTimeout(() => {
  //     setSelecting(false);
  //   }, 100);
  // };

  const allOptoins = list.length ? list : options;

  return (
    <div className="bpm-multiple-select">
      <TextControl
        label={label}
        autoComplete="off"
        onFocus={() => setSelecting(true)}
        onBlur={() => {
          setTimeout(() => {
            setSelecting(false);
          }, 200);
        }}
        placeholder={value.length ? "" : placeholder}
        style={{ height: `${inputHeight}px` }}
      ></TextControl>
      <div
        className="bpm-selected-list"
        ref={ref}
        onClick={() =>
          setTimeout(() => {
            setSelecting(!selecting);
          }, 200)
        }
      >
        <ul>
          {allOptoins.map((item) => {
            return (
              value.includes(item.value) && (
                <li>
                  <span
                    className="close"
                    onClick={() => {
                      const newValue = [...value];
                      const index = newValue.indexOf(item.value);
                      newValue.splice(index, 1);
                      onChange(newValue);
                    }}
                  >
                    &times;
                  </span>
                  <span className="label">{item.label}</span>
                </li>
              )
            );
          })}
        </ul>
      </div>
      {allOptoins.length && selecting && (
        <div className="bpm-selectable-list">
          <ul>
            {allOptoins.map((item) => {
              return (
                !value.includes(item.value) && (
                  <li
                    onClick={() => {
                      onChange([...value, item.value]);
                      setSelecting(false);
                    }}
                  >
                    {item.label}
                  </li>
                )
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MultipleSelect;
