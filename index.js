const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const history = require('connect-history-api-fallback')
var serveStatic = require('serve-static')
var request = require('request');
var bodyParser = require('body-parser');
const staticFileMiddleware = express.static(path.join(__dirname + '/dist'))


express()
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(staticFileMiddleware)
  .use(history({
    disableDotRule: true,
    verbose: true
  }))
  .use(staticFileMiddleware)
  .use(express.static(path.join(__dirname, 'public')))
  .use(express.static(path.join(__dirname, 'src')))
  .use(express.static(path.join(__dirname, '/dist/')))
  .use(serveStatic(path.join(__dirname, 'dist')))
  .set('views', path.join(__dirname, 'views'))
  .get('/', (req, res) => res.send('hello'))
  .get('/test', (req, res) =>  res.render(path.join(__dirname + '/dist/index.html')))
  .post('/register', (req, res) => { 

    var query1=request.body.var1;
    var query2=request.body.var2;
    
    console.log(var1+" "+var2);
  })


  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
