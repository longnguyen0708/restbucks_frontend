/**
 * Created by longnguyen on 11/3/16.
 */

var express = require('express')
var path = require('path')
var compression = require('compression')

var app = express()
// must be first!
app.use(compression())

// serve our static stuff like index.css
app.use(express.static(path.join(__dirname, 'public')))

// send all requests to index.html so browserHistory in React Router works
app.get('*', function (req, res) {
    // and drop 'public' in the middle of here
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

var PORT = process.env.PORT || 8080
app.listen(PORT, function() {
    console.log('Restbucks Express server running at localhost:' + PORT)
})