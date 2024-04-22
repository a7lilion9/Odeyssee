import { Table, THeader, Row, Col, TBody, TFooter } from "../Components";

const TableData = ({ header, data }) => {
  // header = ['header1', 'header2', ...]
  // data   = [['0', 'name1'], ['1', 'name2']]

  // console.log(data);
  return (
    <Table>
      <THeader>
        <Row>
          {header ? (
            header.map((e, i) => <Col key={i}>{e}</Col>)
          ) : (
            <Col>Empty</Col>
          )}
        </Row>
      </THeader>
      <TBody>
        {data ? (
          data.map((row, i) => (
            <Row key={i}>
              {row ? (
                row.map((c, i) => <Col key={i}>{c}</Col>)
              ) : (
                <Col>Empty</Col>
              )}
            </Row>
          ))
        ) : (
          <Row>
            <Col>Empty</Col>
          </Row>
        )}
      </TBody>
      <TFooter></TFooter>
    </Table>
  );
};

export default TableData;
