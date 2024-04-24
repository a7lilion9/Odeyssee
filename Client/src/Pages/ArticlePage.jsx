import {
  Button,
  Title,
  Textbox,
  Form,
  Container,
  Select,
  Notification,
} from "../Components";
import TableData from "../Parts/TableData";
import db from "../db";
import { datetime } from "../utils";

import { useCallback, useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";

// Component
const ArticlePage = () => {
  const [formData, setFormData] = useState({
    id: "",
    article: "",
    typeId: null,
    action: "add",
  });

  const queryClient = useQueryClient();

  // Determine the endpoint based on the action specified in formData
  const serviceActionEndpoint = useCallback(() => {
    const endpoints = {
      add: "api/articles/add",
      remove: "api/articles/remove",
    };
    return endpoints[formData.action] || null;
  }, [formData.action]);

  // Mutation setup for performing add/remove operations
  const mutateArticle = useMutation(async (obj) => {
    const endpoint = serviceActionEndpoint();
    if (endpoint) {
      return db.post(endpoint, obj);
    }

    throw new Error(`Action ${formData.action} is not defined`);
  });

  // Fetch all Articles & ArticleTypes
  const fetchArticles = useCallback(async () => db.get("api/articles"), []);

  const fetchArticleTypes = useCallback(
    async () => db.get("api/articletypes"),
    []
  );

  // Using React Query's useQuery to manage fetching data
  const { data: articleTypes } = useQuery("articleTypes", fetchArticleTypes);
  const { data: articles } = useQuery("articles", fetchArticles);

  // Handle form submission
  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    const obj = {
      article_id: formData.id,
      datetime: datetime(),
      type_id: formData.typeId ?? articleTypes[0].type_id,
      article_name: formData.article,
    };
    mutateArticle.mutate(obj);

    // Update the local data based on the action
    if (formData.action === "add") {
      queryClient.setQueryData("articles", (old) => [...old, obj]);
    } else if (formData.action === "remove") {
      queryClient.setQueryData("articles", (old) =>
        old.filter((e) => +e.article_id !== +formData.id)
      );
    }
  });

  // Universal handler for form field changes
  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  return (
    <Container>
      <Title value="Articles" />
      <Form onsubmit={handleSubmit}>
        <Textbox onchange={handleChange("id")} name="id" holder="ID" />
        <Textbox
          onchange={handleChange("article")}
          name="article"
          disabled={formData.action === "remove" ? "disabled" : ""}
          holder="Article Name"
        />
        <Select
          onclick={handleChange("typeId")}
          name="type_id"
          disabled={formData.action === "remove" ? "disabled" : ""}
          options={articleTypes?.map((type) => ({
            value: type.type_id,
            text: type.type_name,
          }))}
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
        header={["Id", "Date & Time", "Article Name", "Article Type"]}
        data={articles?.map((e) =>
          Object.values({
            article_id: e.article_id,
            datetime: e.datetime,
            article_name: e.article_name,
            type_name: e.type_name,
          })
        )}
      />
    </Container>
  );
};

export default ArticlePage;
