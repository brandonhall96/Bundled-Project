const express = require('express');
require('dotenv').config();
const app = express();
const site = require('./api/site')
const cors = require('cors');
const bodyParser = require('body-parser')

app.use(cors({
    origin: '*'
}))
// a test route to make sure we can reach the backend
//this would normally go in a routes file
app.get('/test', (req, res) => {
res.send('Welcome to the backend!')
})


//Set the port that you want the server to run on
const port = process.env.PORT || 8080;
app.listen(port);
console.log('App is listening on port ' + port);

app.use(bodyParser.json())

// Home route
app.get('/', (req, res) => {
    res.status(200).json({ message: 'Smile, you are being watched by the Backend' });
});

app.use('/api/site', site);
