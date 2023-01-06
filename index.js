const express = require('express')
const app = express()

app.use(express.json())

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]


app.get('/api/info', (req, res) => {
  let date = new Date()
  res.send(`<h2>Phonebook has info for ${persons.length} people</h2><p>${date}</p>`)
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(p => p.id === id)

  if(person) {
    res.json(person)
  } else {
    res.status(404).end()
  }
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(p => p.id !== id)

  res.status(204).end()
})

const nameExists = (name) => {
  const names = persons.map(p => p.name)
  return names.includes(name)
}

app.post('/api/persons', (req, res) => {
  const body = req.body
  const newId = Math.floor(Math.random() * 10000)
  if (!body.name || !body.number) {
    return res.status(400).send({
      error: "name and/or number missing"
    })
  }

  if (nameExists(body.name)) {
    return res.status(400).send({
      error: "name must be unique"
    })
  }

  const newPerson = {
    "id": newId,
    "name": body.name || "",
    "number": body.number || ""
  }

  persons.concat(newPerson)
  res.send(newPerson)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`)
})