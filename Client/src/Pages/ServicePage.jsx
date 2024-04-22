import { Button, Title, Textbox, Form, Container, Select } from "../Components";
import TableData from "../Parts/TableData";
import db from "../db";
import { datetime } from "../utils";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";

// Component
const ServicePage = () => {
  const [service, setService] = useState("");
  const [id, setId] = useState("");
  const [action, setAction] = useState("add");

  const queryClient = useQueryClient();

  const handleActions = (action) => {
    if (action === "add") {
      return async (obj) => {
        return await db.post("api/services/add", obj);
      };
    } else if (action === "remove") {
      return async (obj) => {
        return await db.post("api/services/remove", obj);
      };
    }
  };

  // Mutation to add a service
  const { mutate } = useMutation(handleActions(action));

  // useQuery to fetch all services
  const { data } = useQuery("services", async () => {
    return await db.get("api/services");
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const mobj = {
      service_id: id,
      datetime: datetime(),
      service_name: service,
    };

    mutate(mobj);

    if (action === "add") {
      queryClient.setQueryData("services", (old) => [...old, mobj]);
    } else if (action === "remove") {
      queryClient.setQueryData("services", (old) =>
        data.filter((e) => +e.service_id !== +id)
      );
    } else {
      console.error(`Action '${action}' is Undefined`);
    }
  };

  const handleChange = (e) => setService(e.target.value);
  const handleChangeId = (e) => setId(e.target.value);
  const handleCheckbox = (e) => setAction(e.target.value);

  // console.log(data);

  return (
    <Container>
      <Title value="Services" />
      <Form onsubmit={handleSubmit} position="justify-end">
        <Textbox name="id" onchange={handleChangeId} holder="Id" />
        <Textbox name="service" onchange={handleChange} holder="Service Name" />
        <Select
          onclick={handleCheckbox}
          options={[
            { value: "add", text: "Add" },
            { value: "remove", text: "Remove" },
          ]}
        />
        <Button value="Submit" />
      </Form>

      <TableData
        header={["Id", "Date & Time", "Name"]}
        data={data ? data.map((e) => Object.values(e)) : null}
      />
    </Container>
  );
};

export default ServicePage;
