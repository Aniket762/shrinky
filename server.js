const express = require('express')
const mongoose = require('mongoose');
const app = express()

// importing model
const ShortUrl = require('./models/urls');

// to access the environment variables
require('dotenv').config()


// fixing views
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))

// fetching all the shorturls
app.get('/', async (req, res) =>
{
    const allData = await ShortUrl.find()
    res.render('index', { shortUrls: allData})
})

// setting corresponding full url to short
app.post('/short', async (req, res) =>
{
    // parse the full url from the req.body
    const fullUrl = req.body.fullUrl

    //insert the record using the model
    const record = new ShortUrl({
        full:fullUrl
    })

    // save the record
    await record.save()

    // after pushing the data redirect to home
    res.redirect('/')
})

app.get('/:shortid', async (req, res) =>
{
    // grab the :shirtid param
    const shortid = ''

    // perform the mongoose call to find the long URL
    const data = await ShortUrl.findOne({short:shortid})
	// if null, set status to 404 (res.sendStatus(404))
    if (!data)
    {
        return res.sendStatus(404)
    }
	// if not null, increment the click count in database
    data.clicks++
    await data.save()

	// redirect the user to original link
    res.redirect(data.full)
})

// Connected to mongodb
mongoose.connect('mongodb://localhost:25367', {
    useNewUrlParser: true,
    useUnifiedTopology:true
})


<<<<<<< HEAD
// wait for mongo connection before server starts
mongoose.connection.on('open', async () =>
{
    // url for testing
    await ShortUrl.create({ full: 'https://hackodisha.xyz' })
        
    // connecting express to a particular port
    app.listen(process.env.PORT, () =>
    {
        console.log('Server is up and running on port: '+ process.env.PORT)
    })
=======
// connecting express server to a particular port 
app.listen(process.env.PORT, () =>
{
    console.log('Server is up and running on port: '+ process.env.PORT)
>>>>>>> bff118e607855c93fc69da50a1bdb9b40d21e814
})
