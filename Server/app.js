import express from "express";
import cors from "cors";

import { router as servicesRouter } from "./routes/services.js";
import { router as rolesRouter } from "./routes/roles.js";
import { router as usersRouter } from "./routes/users.js";
import { router as errorsRouter } from "./routes/errors.js";
import { router as articleTypesRouter } from "./routes/articleTypes.js";
import { router as articlesRouter } from "./routes/articles.js";
import { router as itemsRouter } from "./routes/items.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Uses of middleware
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Route Mounts
app.use("/api/services", servicesRouter);
app.use("/api/roles", rolesRouter);
app.use("/api/users", usersRouter);
app.use("/api/errors", errorsRouter);
app.use("/api/articleTypes", articleTypesRouter);
app.use("/api/articles", articlesRouter);
app.use("/api/items", itemsRouter);

app.get("/", async (req, res) => {
  res.send("This is the Home page");
  res.status(200);
});

app.listen(PORT, () => {
  console.log(`Listening at port ${PORT}`);
});
