const express = require('express')
const app = express()

// to access the environment variables
require('dotenv').config()


app.get('/', (req, res) =>
{
    res.send("Shorten the link. Broaden the reach")
})


// connecting express to a particular port 
app.listen(process.env.PORT, () =>
{
    console.log('Server is up and running on port: '+ process.env.PORT)
})