import { useMutation, useQuery, useQueryClient } from "react-query";
import db from "../db";
import { useCallback, useState } from "react";
import { Button, Container, Form, Select, Textbox, Title } from "../Components";
import { datetime } from "../utils";
import { TableData } from "../Parts";

export default function ItemPage() {
  const [item, setItem] = useState({
    item_id: null,
    code: null,
    article_id: null,
    user_id: null,
    error_id: null,
    action: "add",
  });

  const queryClient = useQueryClient();

  // Determine the endpoint based on the action specified in items
  const serviceActionEndpoint = useCallback(() => {
    const endpoints = {
      add: "api/items/add",
      remove: "api/items/remove",
    };
    return endpoints[item.action] || null;
  }, [item.action]);

  // Mutate setup for performing add/remove ops
  const mutateItem = useMutation(async (obj) => {
    const endpoint = serviceActionEndpoint();
    if (endpoint) {
      return db.post(endpoint, obj);
    }

    throw new Error(`Action ${item.action} is not defined`);
  });

  // Fetch
  const fetchItems = useCallback(async () => db.get("api/items"));
  const fetchArticles = useCallback(async () => db.get("api/articles"));
  const fetchUsers = useCallback(async () => db.get("api/users"));
  const fetchErrors = useCallback(async () => db.get("api/errors"));

  // React Query
  const { data: dataItems } = useQuery("items", fetchItems);
  const { data: dataArticles } = useQuery("articles", fetchArticles);
  const { data: dataUsers } = useQuery("users", fetchUsers);
  const { data: dataErrors } = useQuery("errors", fetchErrors);

  // Handle form submission
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const itemObj = {
        item_id: item.item_id,
        datetime: datetime(),
        code: item.code,
        article_id: item.article_id,
        user_id: item.user_id,
        error_id: item.error_id,
      };

      mutateItem.mutate(itemObj);

      // Update the local data based on the action
      if (item.action === "add") {
        queryClient.setQueryData("items", (old) => [...old, itemObj]);
      } else if (item.action === "remove") {
        queryClient.setQueryData("items", (old) =>
          old.filter((e) => +e.error_id !== +item.error_id)
        );
      }
    },
    [item]
  );

  const handleChange = (field) => (e) => {
    console.log(e.target.value);
    setItem((prev) => ({ ...prev, [field]: e.target.value }));
  };

  return (
    <Container>
      <Title value="Items" />
      <Form onsubmit={handleSubmit}>
        <Textbox
          name="item_id"
          onchange={handleChange("item_id")}
          holder="Id"
        />
        <Textbox
          name="code"
          onchange={handleChange("code")}
          holder="Code"
          disabled={item.action === "remove" ? "disabled" : ""}
        />
        <Select
          name="article_id"
          onclick={handleChange("article_id")}
          options={dataArticles?.map((article) => ({
            value: article.article_id,
            text: article.article_name,
          }))}
          disabled={item.action === "remove" ? "disabled" : ""}
        />
        <Select
          name="user_id"
          onclick={handleChange("user_id")}
          options={dataUsers?.map((user) => ({
            value: user.user_id,
            text: `${user.first_name} ${user.last_name}`,
          }))}
          disabled={item.action === "remove" ? "disabled" : ""}
        />
        <Select
          name="error_id"
          onclick={handleChange("error_id")}
          options={dataErrors?.map((error) => ({
            value: error.error_id,
            text: error.error_desc,
          }))}
          disabled={item.action === "remove" ? "disabled" : ""}
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
        header={["Id", "Date & Time", "code", "article", "user", "error"]}
        data={dataItems?.map((e) =>
          Object.values({
            item_id: e.item_id,
            datetime: e.datetime,
            code: e.code,
            article_name: e.article_name,
            user_name: e.user_name,
            error_desc: e.error_desc,
          })
        )}
      />
    </Container>
  );
}
