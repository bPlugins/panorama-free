const SpacerIcon = () => {
  const { height = 25, width = 25 } = props;
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true" focusable="false">
      <path d="M12.5 4.2v1.6h4.7L5.8 17.2V12H4.2v7.8H12v-1.6H6.8L18.2 6.8v4.7h1.6V4.2z"></path>
    </svg>
  );
};

export default SpacerIcon;
