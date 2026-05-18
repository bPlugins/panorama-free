const TagIcon = (props) => {
  const { height, width, tag } = props;
  return (
    <svg width={width} height={height} viewBox="0 0 25 25" xmlns="http://www.w3.org/2000/svg" {...props}>
      <text x={5} y={20} fontSize="1.6em">
        {tag}
      </text>
    </svg>
  );
};

export default TagIcon;
