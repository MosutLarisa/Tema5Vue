import express from "express"
import bodyParser from "body-parser"

const api = express()
const port = 3000

let notes = [
  { id: 1, title: "Shop Page Design", description: "lorem ipsum", label: "Important" },
  { id: 2, title: "Landing Page Development", description: "lorem ipsum", label: "Work" },
  { id: 3, title: "Plugin Development", description: "lorem ipsum", label: "Personal" }
]

// Add headers before the routes are defined
api.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*")

  // Request methods you wish to allow
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE")

  // Request headers you wish to allow
  res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type")

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true)

  // Pass to next layer of middleware
  next()
})

api.use(bodyParser.json())

api.get("/api/notes", (req, res) => {
  res.json(notes)
})

api.post("/api/notes", (req, res) => {
  const newNote = req.body
  newNote.id = notes.length + 1
  notes.unshift(newNote)
  res.status(201).json(newNote)
})

api.delete("/api/notes/:id", (req, res) => {
  const { id } = req.params
  notes = notes.filter(note => note.id !== parseInt(id))
  res.status(204).end()
})

api.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
