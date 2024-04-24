import {
  Button,
  Title,
  Textbox,
  Form,
  Container,
  Table,
  TBody,
  THeader,
  TFooter,
  Row,
  Col,
  Select,
} from "../Components";
import db from "../db";
import { datetime } from "../utils";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";

// Component
const RolePage = () => {
  const [role, setRole] = useState("");
  const [id, setId] = useState("");
  const [action, setAction] = useState("add");

  const queryClient = useQueryClient();

  const handleActions = (action) => {
    if (action === "add") {
      return async (obj) => {
        return await db.post("api/roles/add", obj);
      };
    } else if (action === "remove") {
      return async (obj) => {
        return await db.post("api/roles/remove", obj);
      };
    }
  };

  // Mutation to add a role
  const { mutate } = useMutation(handleActions(action));

  // useQuery to fetch all roles
  const { data, error, isLoading, isError } = useQuery("roles", async () => {
    return await db.get("api/roles");
  });

  if (isLoading) return <div>Loading ...</div>;
  if (isError) return <div>Error {error.message}</div>;

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    if (
      (formData.get("id") && formData.get("role")) ||
      (formData.get("id") && action === "remove")
    ) {
      mutate({
        role_id: formData.get("id"),
        datetime: datetime(),
        role_name: formData.get("role"),
      });
    }

    if (action === "add") {
      queryClient.setQueryData("roles", (old) => [
        ...old,
        {
          role_id: formData.get("id"),
          datetime: datetime(),
          role_name: formData.get("role"),
        },
      ]);
    } else if (action === "remove") {
      console.log(data.filter((e) => +e.role_id !== +id));
      queryClient.setQueryData("roles", (old) =>
        data.filter((e) => +e.role_id !== +id)
      );
    }
  };

  const handleChangeRole = (e) => setRole(e.target.value);
  const handleChangeId = (e) => setId(e.target.value);
  const handleCheckbox = (e) => setAction(e.target.value);

  return (
    <Container>
      <Title value="Roles" />
      <Form onsubmit={handleSubmit} position="justify-end">
        <Textbox
          name="id"
          onchange={handleChangeId}
          holder="Id"
          label="Entrer ID"
        />
        <Textbox
          name="role"
          onchange={handleChangeRole}
          holder="Role Name"
          label="Entrer le nom de role"
        />
        <Select
          onclick={handleCheckbox}
          options={[
            { value: "add", text: "Add" },
            { value: "remove", text: "Remove" },
          ]}
        />
        <Button value="Submit" />
      </Form>
      <Table>
        <THeader>
          <Row>
            <Col>Id</Col>
            <Col>Date & Time</Col>
            <Col>Name</Col>
          </Row>
        </THeader>
        <TBody>
          {data.map((s, i) => (
            <Row key={i}>
              <Col>{s.role_id}</Col>
              <Col>{s.datetime}</Col>
              <Col>{s.role_name}</Col>
            </Row>
          ))}
        </TBody>
        <TFooter></TFooter>
      </Table>
    </Container>
  );
};

export default RolePage;
