const Container = ({ children, style }) => {
  const internalStyle = `min-w-2xl max-w-7xl m-auto flex flex-col ${style}`;
  return <div className={internalStyle}>{children}</div>;
};

export default Container;
