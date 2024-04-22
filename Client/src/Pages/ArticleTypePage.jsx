import { useState } from "react";
import { Button, Container, Form, Select, Textbox, Title } from "../Components";
import { SelectOp, TableData } from "../Parts";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { datetime } from "../utils";
import db from "../db";

const ArticleTypePage = () => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [op, setOp] = useState("add");

  const queryClient = useQueryClient();

  const { mutate } = useMutation(
    ((op) => {
      switch (op) {
        case "add":
          return async (obj) => await db.post("api/articletypes/add", obj);
        case "remove":
          return async (obj) => await db.post("api/articletypes/remove", obj);
        default:
          console.error(op, `is undefined`);
      }
    })(op)
  );

  const { data } = useQuery(
    "articletypes",
    async () => await db.get("api/articletypes")
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    const obj = {
      type_id: id,
      datetime: datetime(),
      type_name: name,
    };

    mutate(obj);

    switch (op) {
      case "add":
        queryClient.setQueryData("articletypes", (old) => [...old, obj]);
        break;
      case "remove":
        queryClient.setQueryData("articletypes", (old) =>
          data.filter((e) => +e.type_id !== +id)
        );
    }
  };

  return (
    <Container>
      <Title value="Article Types" />
      <Form onsubmit={handleSubmit}>
        <Textbox
          onchange={(e) => setId(e.target.value)}
          name="type_id"
          holder="Id"
        />
        <Textbox
          disabled={op === "remove" ? "disable" : ""}
          onchange={(e) => setName(e.target.value)}
          name="type_name"
          holder="Type Name"
        />
        <SelectOp onclick={(e) => setOp(e.target.value)} />
        <Button value="Submit" />
      </Form>

      <TableData
        header={["Id", "Date & Time", "Type Name"]}
        data={data ? data.map((e) => Object.values(e)) : null}
      />
    </Container>
  );
};

export default ArticleTypePage;
