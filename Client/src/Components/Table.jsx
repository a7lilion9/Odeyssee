const Table = ({ children }) => {
  return (
    <table className=" cursor-default min-w-full m-auto overflow-hidden leading-normal shadow-gray-200 shadow-md rouned-lg">
      {children}
    </table>
  );
};

const Col = ({ children }) => {
  return (
    <td className="px-5 py-3 border-t border-blue-200 text-sm text-gray-800">
      {children}
    </td>
  );
};

const Row = ({ children }) => {
  return <tr>{children}</tr>;
};

const THeader = ({ children }) => {
  return <thead className="bg-blue-100">{children}</thead>;
};

const TBody = ({ children }) => {
  return <tbody>{children}</tbody>;
};

const TFooter = ({ children }) => {
  return <tfoot>{children}</tfoot>;
};

export { Table, TBody, THeader, TFooter, Row, Col };
