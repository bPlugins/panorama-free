const { CustomSelectControl } = wp.components;

const BMultipleSelect = (props) => {
  const { value = [], onChange, options } = props;
  return <CustomSelectControl {...props} options={options} onChange={({ selectedItem }) => onChange([...value, selectedItem])} value={value} />;
};

export default BMultipleSelect;
