const express = require('express')
const hbs = require('hbs')
const fs = require('fs')

const APP_PORT = process.env.PORT || 3001
let app = express()

hbs.registerPartials(__dirname + '/views/partials')

app.set('view engine', 'hbs')

//the order of the middleware is by the order defined in this file
app.use((req, res, next) => {
    var now = new Date().toString()
    var log = `${now}: ${req.method} ${req.url}`
    console.log(log)
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log')
        }
    })
    next()
})


// app.use((req, res, next) => {
//     res.render('maintenance.hbs', {
//         pageTitle: 'Under construction',
//         img: 'UnderConstruct.jpg'
//     })
// })

app.use(express.static(__dirname + '/public'))


hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
})

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase()
})
app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Hello Sir!'
    })
})

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page'
    })
})

app.get('/projects', (req, res) => {
    res.render('projects.hbs', {
        pageTitle: 'Projects'
    })
})

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'bad request'
    })
})

app.listen(APP_PORT, () => {
    console.log(`App listening on port ${APP_PORT}`)
})
