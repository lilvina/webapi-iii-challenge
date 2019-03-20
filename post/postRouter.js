const express = require('express')
const db = require('./postDb.js')

const router = express.Router()

router.get('/', (req, res) => {
  db.get().then(post => {
    res.status(200).json(post)
  }).catch(err => {
    res.status(400).json({ message: 'The posts could not be retrieved.' })
  })
})

router.get('/:id', (req, res) => {
  const {id} = req.params

  db.getById(id).then(post => {
    if(post) {
      res.status(200).json(post)
    } else {
      res.status(404).json({ message: 'The post with the specified ID does not exist' })
    }
  }).catch(err => {
    res.status(500).json({ message: 'The post could not be retrieved' })
  })
})


module.exports = router
