const Table = ({ children }) => {
  return <table className="border-collapse m-2">{children}</table>;
};

const Col = ({ children }) => {
  return <td className="border px-5 py-2">{children}</td>;
};

const Row = ({ children }) => {
  return <tr>{children}</tr>;
};

const THeader = ({ children }) => {
  return <thead className="bg-slate-600 text-slate-100">{children}</thead>;
};

const TBody = ({ children }) => {
  return <tbody>{children}</tbody>;
};

const TFooter = ({ children }) => {
  return <tfoot>{children}</tfoot>;
};

export { Table, TBody, THeader, TFooter, Row, Col };
