import pool from "../pool.js"

// Every table needs to have the primary key with the name as ${table}_id

const createService = `
  CREATE TABLE IF NOT EXISTS Service (
    service_id    SERIAL PRIMARY KEY,
    datetime      TIMESTAMP WITH TIME ZONE NOT NULL,
    service_name  VARCHAR(50) NOT NULL
  );
`

const createRole = `
  CREATE TABLE IF NOT EXISTS Role (
    role_id   SERIAL PRIMARY KEY,
    datetime  TIMESTAMP WITH TIME ZONE NOT NULL,
    role_name VARCHAR(50) NOT NULL
  );
`

const createUser = `
  CREATE TABLE IF NOT EXISTS Users (
    user_id     SERIAL PRIMARY KEY,
    datetime    TIMESTAMP WITH TIME ZONE NOT NULL,
    first_name  VARCHAR(50),
    last_name   VARCHAR(50),
    username    VARCHAR(50),
    password    VARCHAR(255),
    role_id     INT NOT NULL,
    service_id  INT NOT NULL,

    CONSTRAINT fk_service FOREIGN KEY (service_id) REFERENCES Service (service_id),
    CONSTRAINT fk_role    FOREIGN KEY (role_id) REFERENCES Role (role_id)
  );
`

const createArticleType = `
  CREATE TABLE IF NOT EXISTS ArticleType (
    type_id   SERIAL PRIMARY KEY,
    type_name VARCHAR(50) NOT NULL
  );
`

const createArticle = `
  CREATE TABLE IF NOT EXISTS Article (
    article_id    SERIAL PRIMARY KEY,
    article_name  VARCHAR(50) NOT NULL,
    type_id       INT NOT NULL,

    CONSTRAINT fk_articleType FOREIGN KEY (type_id) REFERENCES ArticleType (type_id)
  );
`

const createError = `
  CREATE TABLE IF NOT EXISTS Error (
    error_id    SERIAL PRIMARY KEY,
    error_desc  VARCHAR(255) NOT NULL,
    error_type  VARCHAR(50),
    service_id  INT NOT NULL,

    CONSTRAINT fk_service FOREIGN KEY (service_id) REFERENCES Service (service_id)
  );
`

const createItem = `
  CREATE TABLE IF NOT EXISTS Items (
    item_id     SERIAL PRIMARY KEY,
    datetime    TIMESTAMP WITH TIME ZONE NOT NULL,
    code        VARCHAR(50),
    article_id  INT NOT NULL,
    user_id     INT NOT NULL,
    error_id    INT NOT NULL,

    CONSTRAINT fk_article FOREIGN KEY (article_id) REFERENCES Article  (article_id),
    CONSTRAINT fk_user    FOREIGN KEY (user_id)    REFERENCES Users    (user_id),
    CONSTRAINT fk_error   FOREIGN KEY (error_id)   REFERENCES Error    (error_id)
  );
`

const createTablesQueries = [
  createService,
  createArticleType,
  createArticle,
  createRole,
  createUser,
  createError,
  createItem,
]

const drop = (table) => `
  DROP TABLE IF EXISTS ${table};
`

const runQuery = async query => {
  try {
    await pool.query(query)
  } catch(e) {
    console.error(e.stack)
  }
}

const createAllTables = () => {
  createTablesQueries.forEach(query => {
    runQuery(query)
  })
}

export default {
  runQuery, drop, createAllTables,
  createTablesQueries,
}
