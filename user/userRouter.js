const express = require('express')
const db = require('./userDb.js')

const router = express.Router()

router.get('/', (req, res) => {
  db.get().then(user => {
    res.status(200).json(user)
  }).catch(err => {
    res.status(400).json({ message: 'The users could not be retrieved.' })
  })
})

router.get('/:id', (req, res) => {
  const {id} = req.params

  db.getById(id).then(user => {
    if(user) {
      res.status(200).json(user)
    } else {
      res.status(404).json({ message: 'The user with the specified ID does not exist' })
    }
  }).catch(err => {
    res.status(500).json({ message: 'The user could not be retrieved' })
  })
})

module.exports = router
