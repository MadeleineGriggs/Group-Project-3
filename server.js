const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

const port = process.env.PORT || 5000;

var db = require("./models");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Static file declaration
app.use(express.static(path.join(__dirname, 'client/build')));

var syncOptions = { force: false };

//production mode
if(process.env.NODE_ENV === 'production') {  
    app.use(express.static(path.join(__dirname, 'client/build'))); 
    app.get('*', (req, res) => {    
        res.sendfile(path.join(__dirname = 'client/build/index.html'));  
    })
}

//build mode
app.get('*', (req, res) => {  
    res.sendFile(path.join(__dirname+'/client/public/index.html'));
})

//Route setup
app.get('/', (req, res) => {    
    res.send('root route');
});

app.post("/api/example", function(req, res) {
    db.Example.create({
        text: req.body.text,
        description: req.body.description
    }).then(function(dbItem) {
        res.json(dbItem);
    });
});

//Start server

db.sequelize.sync(syncOptions).then(function() {
app.listen(port, (req, res) => {
    console.log(`server listening on port: ${port}`)
});

});
