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

router.post('/', (req, res) => {
  const posts = req.body
  console.log(posts)
  if(posts.user_id && posts.text) {
    console.log("You can see me!")
    db.insert(posts).then(post => {
      res.status(201).json(posts)
    }).catch(err => {
      res.status(500).json({ message: 'There was an error while saving the post to the database' })
    })
  } else {
    res.status(400).json({ message: 'Please provide text for the post' })
  }
})

router.put('/:id', (req, res) => {
  const {id} = req.params
  const posts = req.body

  if(posts.user_id && posts.text) {
    db.update(id, posts).then(post => {
      if(post) {
        res.status(200).json(post)
      } else {
        res.status(404).json({ message: 'The post with the ID does not exist' })
      }
    }).catch(err => {
      res.status(500).json({ message: 'The post infomation could not be modified.' })
    })
  } else {
    res.status(400).json({ message: 'Please provide text for the post' })
  }
})

router.delete('/:id', (req, res) => {
  const {id} = req.params

  db.remove(id).then(post => {
    if(post) {
      res.status(200).json(post)
    } else {
      res.status(404).json({ message: 'The post with the ID does not exist' })
    }
  }).catch(err => {
    res.status(500).json({ message: 'The post could not be removed.' })
  })
})
module.exports = router
