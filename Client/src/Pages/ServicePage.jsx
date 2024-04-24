import { Button, Title, Textbox, Form, Container, Select } from "../Components";
import TableData from "../Parts/TableData";
import db from "../db";
import { datetime } from "../utils";

import { useCallback, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";

// Component
const ServicePage = () => {
  const [formData, setFormData] = useState({
    id: "",
    service: "",
    action: "add",
  });

  const queryClient = useQueryClient();

  // Determine the endpoint based on the action specified in formData
  const serviceActionEndpoint = useCallback(() => {
    const endpoints = {
      add: "api/services/add",
      remove: "api/services/remove",
    };
    return endpoints[formData.action] || null;
  }, [formData.action]);

  // Mutation setup for performing add/remove operations
  const mutateService = useMutation(async (obj) => {
    const endpoint = serviceActionEndpoint();
    if (endpoint) {
      return db.post(endpoint, obj);
    }

    throw new Error(`Action ${formData.action} is not defined`);
  });

  // Fetch all services
  const fetchServices = useCallback(async () => db.get("api/services"), []);

  // Using React Query's useQuery to manage fetching data
  const { data } = useQuery("services", fetchServices);

  // Handle form submission
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const obj = {
        service_id: formData.id,
        datetime: datetime(),
        service_name: formData.service,
      };

      mutateService.mutate(obj);

      // Update the local data based on the action
      if (formData.action === "add") {
        queryClient.setQueryData("services", (old) => [...old, obj]);
      } else if (formData.action === "remove") {
        queryClient.setQueryData("services", (old) =>
          old.filter((e) => +e.service_id !== +formData.id)
        );
      }
    },
    [formData]
  );

  // Universal handler for form field changes
  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  return (
    <Container>
      <Title value="Services" />
      <Form onsubmit={handleSubmit} position="justify-end">
        <Textbox name="id" onchange={handleChange("id")} holder="Id" />
        <Textbox
          name="service"
          onchange={handleChange("service")}
          holder="Service Name"
          disabled={formData.action === "remove" ? "disabled" : ""}
        />
        <Select
          onclick={handleChange("action")}
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
