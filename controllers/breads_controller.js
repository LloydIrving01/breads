const express = require('express')
const breads = express.Router()
const Bread = require('../models/bread.js')

// NEW
breads.get('/new', (req, res) => {
  res.render('new')
})

// Index
breads.get('/', (req, res) => {
  Bread.find().then(foundBreads => {
        res.render('index', {
          breads: foundBreads,
          title: 'Index Page'
        })
      })
})

// CREATE
breads.post('/', (req, res) => {
  if (!req.body.image) {
    req.body.image = undefined
  }
  if(req.body.hasGluten === 'on') {
    req.body.hasGluten = true
  } else {
    req.body.hasGluten = false
  }
  Bread.create(req.body)
  res.redirect('/breads')
})

// Edit
breads.get('/:id/edit', (req, res) => {
  Bread.findById(req.params.id).then(foundBread =>{
    res.render('edit', {
    bread: foundBread
    })
  })
})

// Show
breads.get('/:id', (req, res) => {
    Bread.findById(req.params.id)
        .then(foundBread => {
          const bakedBy = foundBread.getBakedBy()
          console.log(bakedBy)
          res.render('show', {bread: foundBread})})
        .catch(() => {res.status(404).render('error404')})  
})

// Update
breads.put('/:id', (req, res) => {
  if(req.body.hasGluten === 'on'){
    req.body.hasGluten = true
  } else {
    req.body.hasGluten = false
  }
  Bread.findByIdAndUpdate(req.params.id, req.body, { new: true }) 
    .then(updatedBread => {
      console.log(updatedBread) 
      res.redirect(`/breads/${req.params.id}`) 
    })
})


// Delete
breads.delete('/:id', (req, res) => {
  Bread.findByIdAndDelete(req.params.id)
    .then(deleteBread => {
      res.status(303).redirect('/breads')
    })
})

module.exports = breads
