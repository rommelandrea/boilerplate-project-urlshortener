require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

require('./database')
const DnsCheck = require('./utils/dnsCheck')

const Url = require('./url.model')

const app = express()

// Basic Configuration
const port = process.env.PORT || 3000

/** this project needs a db !! * */

app.use(cors())
app.use(bodyParser.json())

/** this project needs to parse POST bodies * */
// you should mount the body-parser here

app.use('/public', express.static(`${process.cwd()}/public`))

app.get('/', function(req, res) {
  res.sendFile(`${process.cwd()}/views/index.html`)
})

// your first API endpoint...
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' })
})

app.post('/api/shorturl/new', (req, res) => {
  let url = req.body.url
  let dnsCheck = new DnsCheck()
  let isOK = dnsCheck.checkValidURL(url)
  .then(aaa => {
    console.log('ok = ' + aaa)

    let u = new Url({url: url})
    u.save()
    res.json({
      original_url:url,
      short_url:u.id
    })
  })
  .catch(err => {
    res.json({error:"invalid URL"})
  })
})

app.get('/api/shorturl/:id', (req, res) => {
  Url.findById(req.params.id, function (err, url) {
    res.redirect(url.url);
  });
})

app.listen(port, () => {
  console.log('Node.js listening ...')
})
