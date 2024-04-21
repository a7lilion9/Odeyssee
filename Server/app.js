import express from "express"
import cors from 'cors'
import pool from "./db/pool.js"
import select from './db/sql/select.js'
import insert from "./db/sql/insert.js"
import remove from "./db/sql/remove.js"
import table from "./db/sql/table.js"

const app = express()

// Uses of middleware

app.use(cors())
app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use((req, res, next) => {
  next()
})

app.get('/', async (req, res) => {
  // insert.service((new Date()).toISOString(), 'Test')
  const {rows} = await select.getAllServices()
  console.log(rows)
  res.status(200).json(rows)
})

app.get('/api/users', async (req, res) => {
  const {rows} = await select.getAllUsers()
  console.log('get /api/users')
  res.status(200).json(rows)
})

app.post('/api/users/add', async (req, res) => {
  try {
    const id = req.body.user_id
    const datetime = req.body.datetime
    const fname = req.body.first_name
    const lname = req.body.last_name
    const username = req.body.username
    const password = req.body.password
    const role_id = req.body.role_id
    const service_id = req.body.service_id

    console.log('post /api/users/add', req.body)
    insert.user(id, datetime, fname, lname, username, password, role_id, service_id)
    res.status(201)
  } catch (e) {
    console.error(e.stack);
    res.status(400);
  }
})

app.post('/api/users/remove', async (req, res) => {
  try {
    console.log('post /api/users/remove', req.body);
    await remove.users(req.body.user_id)
    res.status(201)
  } catch (e) {
    console.error(e.stack);
    res.status(400)
  }
})

app.get('/api/roles', async (req, res) => {
  const {rows} = await select.getAllRoles()
  console.log('get /api/roles')
  res.status(200).json(rows)
})

app.post('/api/roles/add', async (req, res) => {
  try {
    console.log('post /api/roles/add', req.body)
    insert.role(req.body.role_id, req.body.datetime, req.body.role_name)
    res.status(201)
  } catch (e) {
    console.error(e.stack)
    res.status(400)
  }
})

app.post('/api/roles/remove', async (req, res) => {
  try {
    console.log('post /api/roles/remove', req.body);
    await remove.roles(req.body.role_id)
    res.status(201)
  } catch (e) {
    console.error(e.stack);
    res.status(400)
  }
})

app.get('/api/services', async (req, res) => {
  const {rows} = await select.getAllServices()
  console.log('get /api/services')
  res.status(200).json(rows)
})

app.post('/api/services/remove', async (req, res) => {
  try {
    console.log('post /api/services/remove', req.body);
    await remove.services(req.body.service_id)
    res.status(201)
  } catch (e) {
    console.error(e.stack);
    res.status(400)
  }
})

app.post('/api/services/add', async (req, res) => {
  try {
    console.log('post /api/services/add', req.body)
    insert.service(req.body.service_id, req.body.datetime, req.body.service_name)
    res.status(201)
  } catch (e) {
    console.error(e.stack)
    res.status(400)
  }
})

app.get('/api/tables', async (req, res) => {
  const {rows} = await select.getAllTables()
  res.json(rows)
})

app.post('/api/createAllTables', (req, res) => {
  try {
    table.createAllTables()
    res.status(201)
  } catch (e) {
    console.error(e.stack)
    res.status(400)
  }
})

app.post('/api/removeTable', async (req, res) => {
  try {
    await table.runQuery(table.drop(req.body.tableName))
    console.log(`drop table ${req.body.tableName}`)
  } catch(e) {
    console.error(e)
    res.send(400)
  }
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Listening at port ${PORT}`)
})