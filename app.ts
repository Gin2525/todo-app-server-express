import express from 'express'
import mysqlBegin from './dbModule'
import { SQL_ALL_SELECT, Item, convertItemForQuery } from './dbModule'

const app: express.Express = express()

const conn = mysqlBegin();

// CORSの許可
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})

// body-parserに基づいた着信リクエストの解析
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// GetとPostのルーティング
const router: express.Router = express.Router()

router.get('/todo/all', (_req: express.Request, res: express.Response) => {
  conn.query(
    SQL_ALL_SELECT,
    (err: any, results: any) => {
      if (err) throw err;
      console.log(JSON.stringify(results));
      res.json(results)
    }
  )
})


router.post('/todo/create', (req: express.Request, res: express.Response) => {
  const itemForQuery = convertItemForQuery(req.body as Item);
  const insertSql = `INSERT INTO todo (id, text, done) VALUES (${itemForQuery.id}, '${itemForQuery.text}', ${itemForQuery.done})`
  conn.query(
    insertSql,
    (err: any, results: any) => {
      if (err) throw err;
      console.log(results);
    }
  )
})

router.post('/todo/update', (req: express.Request, res: express.Response) => {
  const itemForQuery = convertItemForQuery(req.body as Item);
  const updateSql = `UPDATE todo SET done = ${itemForQuery.done} WHERE id = ${itemForQuery.id}`
  conn.query(
    updateSql,
    (err: any, results: any) => {
      if (err) throw err;
      console.log(results);
    }
  )
})

router.post('/todo/delete/', (req: express.Request, res: express.Response) => { 
  const itemForQuery = convertItemForQuery(req.body as Item);
  const deleteSql = `DELETE FROM todo WHERE id = ${itemForQuery.id}`
  conn.query(
    deleteSql,
    (err: any, results: any) => {
      if (err) throw err;
      console.log(results);
    }
  )
})

app.use(router)

const portNumber = 3001;
app.listen(portNumber, () => console.log('Example app listening on port:' + portNumber))