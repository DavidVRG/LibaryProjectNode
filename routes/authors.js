const express = require('express');
const router = express.Router();
const Author = require('../models/author')

/* ALL AUTHORS ROUTE */
router.get('/', async (req, res) => {
    let searchOptions = {}
    if(req.query.name != null && req.query.name !== ''){
        searchOptions.name = new RegExp(req.query.name, 'i')
    }
    try{
        const author = await Author.find(searchOptions)
        res.render('authors/index', {
            authors: author, 
            searchOptions: req.query
        })
    }catch{
        res.render('/')
    }
})

/* NEW AUTHOR ROUTE */
router.get('/new', (req, res) => {
    res.render('authors/new', {author: new Author()})
})

/* CREATE AUTHOR ROUTE */
router.post('/', async (req, res) => {
    const author = new Author({
        name: req.body.name
    })

    try{
        const newAuthor = await author.save()
        res.redirect(`authors`)
    }catch{
        res.render('authors/new', {
            author: author,
            errorMessage: 'Author create error!'
        })
    }
})

module.exports = router;