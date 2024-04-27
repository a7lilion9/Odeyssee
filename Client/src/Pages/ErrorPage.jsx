import { useCallback, useEffect, useState } from "react";
import { Button, Container, Form, Select, Textbox, Title } from "../Components";
import { useMutation, useQuery, useQueryClient } from "react-query";
import db from "../db";
import { datetime } from "../utils";
import { TableData } from "../Parts";

export default function ErrorPage() {
  const [formData, setFormData] = useState({
    error_id: "",
    error_desc: "",
    error_type: "",
    service_id: null,
    service_name: "",
    action: "add",
  });

  const queryClient = useQueryClient();

  // Determine the endpoint based on the action specified in errors
  const serviceActionEndpoint = useCallback(() => {
    const endpoints = {
      add: "api/errors/add",
      remove: "api/errors/remove",
    };
    return endpoints[formData.action] || null;
  }, [formData.action]);

  // Mutate setup for performing add/remove ops
  const mutateError = useMutation(async (obj) => {
    const endpoint = serviceActionEndpoint();
    if (endpoint) {
      return db.post(endpoint, obj);
    }

    throw new Error(`Action ${formData.action} is not defined`);
  });

  // Fetch all errors/services
  const fetchErrors = useCallback(async () => db.get("api/errors"), []);
  const fetchServices = useCallback(async () => db.get("api/services"));

  // Using React Query's useQuery to manage fetching data
  const { data } = useQuery("errors", fetchErrors);
  const { data: services } = useQuery("services", fetchServices);

  // Handle form submission
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const obj = {
        error_id: formData.error_id,
        datetime: datetime(),
        error_desc: formData.error_desc,
        error_type: formData.error_type,
        service_id: formData.service_id ?? services[0].service_id,
      };

      mutateError.mutate(obj);

      // Update the local data based on the action
      if (formData.action === "add") {
        queryClient.setQueryData("errors", (old) => [
          ...old,
          { ...obj, service_name: formData.service_name },
        ]);
      } else if (formData.action === "remove") {
        queryClient.setQueryData("errors", (old) =>
          old.filter((e) => +e.error_id !== +formData.error_id)
        );
      }
    },
    [formData]
  );

  // Universal handler for form field changes
  const handleChange = (field) => (e) => {
    if (field === "service_id") {
      const services = queryClient.getQueryData("services");
      const selected = services.find((s) => +s.service_id === +e.target.value);
      setFormData((prev) => ({
        ...prev,
        [field]: e.target.value,
        service_name: selected.service_name,
      }));
    } else setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    // console.log(formData);
  };

  return (
    <Container>
      <Title value="Errors" />
      <Form onsubmit={handleSubmit} position="justify-end">
        <Textbox
          name="error_id"
          onchange={handleChange("error_id")}
          holder="Id"
        />
        <Textbox
          name="error_desc"
          onchange={handleChange("error_desc")}
          holder="Error Description"
          disabled={formData.action === "remove" ? "disabled" : ""}
        />
        <Textbox
          name="error_type"
          onchange={handleChange("error_type")}
          holder="Error Type"
          disabled={formData.action === "remove" ? "disabled" : ""}
        />
        <Select
          name="service_id"
          onclick={handleChange("service_id")}
          options={services?.map((service) => ({
            value: service.service_id,
            text: service.service_name,
          }))}
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
        header={["Id", "Date & Time", "Error Desc", "Type", "Service"]}
        data={data?.map((e) =>
          Object.values({
            error_id: e.error_id,
            datetime: e.datetime,
            error_desc: e.error_desc,
            error_type: e.error_type,
            service_name: e.service_name,
          })
        )}
      />
    </Container>
  );
}
