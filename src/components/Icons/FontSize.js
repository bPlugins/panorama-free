const FontSize = (props) => {
  return (
    <svg width={25} height={25} viewBox="0 0 25 25" xmlns="http://www.w3.org/2000/svg" {...props}>
      <text x={5} y={20} fontSize="1.6em">
        {"T"}
      </text>
      <text x={15} y={20} fontSize="1em">
        {"T"}
      </text>
    </svg>
  );
};

export default FontSize;
