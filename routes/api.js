const express = require('express')
const routeStatus = require('../middleware/routeStatus')
const router = express.Router()

router.get('/', routeStatus, (_, res) => {


    res.render('api', { 
        title: 'The Wet Microburst API',
        layout: 'layout.handlebars',
    })
})


module.exports = router