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

router.get('/:id/posts', (req, res) => {
  const {id} = req.params

  db.getUserPosts(id).then(user => {
    if(user) {
      res.status(200).json(user)
    } else {
      res.status(404).json({ message: 'The user with the specified ID does not exist' })
    }
  }).catch(err => {
    res.status(500).json({ message: 'The user could not be retrieved' })
  })
})

router.post('/', (req, res) => {
  const users = req.body

  if(users.name) {
    db.insert(users).then(user => {
      res.status(201).json(user)
    }).catch(err => {
      res.status(500).json({ message: 'There was an error while saving the post to the database' })
    })
  } else {
    res.status(404).json({ message: 'Please provide name for the post' })
  }
})

router.put('/:id', (req, res) => {
  const {id} = req.params
  const users = req.body

  if(users.name) {
    db.update(id, users).then(user => {
      if(user) {
        res.status(200).json(user)
      } else {
        res.status(404).json({ message: 'The post with the ID does not exist' })
      }
    }).catch(err => {
      res.status(500).json({ message: 'The post infomation could not be modified.' })
    })
  } else {
    res.status(400).json({ message: 'Please provide name for the post' })
  }
})

router.delete('/:id', (req, res) => {
  const {id} = req.params

  db.remove(id).then(user => {
    if(user) {
      res.status(200).json(user)
    } else {
      res.status(404).json({ message: 'The post with the ID does not exist' })
    }
  }).catch(err => {
    res.status(500).json({ message: 'The name could not be removed.' })
  })
})

module.exports = router
