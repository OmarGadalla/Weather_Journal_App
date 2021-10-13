// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
const bodyParser = require('body-parser');

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

/* GET & POST routes */
app.get("/getQueryData", (req, res) => {
    res.send(projectData);
})

app.post('/saveQueryData', (req, res) => {
    
    projectData.date =  req.body.date;
    projectData.temperature = req.body.temperature;
    projectData.feelings = req.body.feelings;

    res.end();
})

// Setup Server
const port = 5000;


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
});