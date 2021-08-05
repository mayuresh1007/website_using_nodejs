const express = require('express');//video number #88 webdev-103
const path = require('path');
// starting and connecting thedatabase npm i mongoose,body-parser
const bodyparser = require("body-parser")
// 
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactdance', { useNewUrlParser: true, useUnifiedTopology: true });
const port = 80;

const app = express();// initiate app.js

// define mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    adrs: String
});

const Contact = mongoose.model('Contact', contactSchema);// var kr sakte ho finaling the schema-model


// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')); // For serving static files
app.use(express.urlencoded());
// PUG SPECIFIC STUFF
app.set('view engine', 'pug'); // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')); // Set the views directory


// ENDPOINTS
app.get('/', (req, res) => {
    const params = {}
    res.status(200).render('home.pug', params);
})

app.get('/contact', (req, res)=>{
    // const params = { }
    res.status(200).render('contact.pug');//, params
})

app.post('/contact', (req, res) => {
    var myData = new Contact(req.body);
    myData.save().then(() => {
        res.send("This item saved to database")
    }).catch(() => {
        res.status(400).send("item Not saved to database")
    })
    // res.status(200).render('contact.pug'); you can add alert and show data saved 
});


// START THE SERVER
app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`);
});