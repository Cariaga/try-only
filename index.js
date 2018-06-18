const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const history = require('connect-history-api-fallback')
var serveStatic = require('serve-static')
var bodyParser = require('body-parser');
const staticFileMiddleware = express.static(path.join(__dirname + '/dist'))//static vue location
//we need to make sure that we do all the dynamic routing first then the vue routing 

express()
  .use(bodyParser.json()) // support json encoded bodies
  .use(bodyParser.urlencoded({ extended: true })) // support encoded bodies

  //---dynamic routing start
  .get('/test2', (req, res) => res.send('hello'))
  .set('views', path.join(__dirname, 'views'))
  //---dynamic routing end

  //---vue location start
  .use(staticFileMiddleware)
  .use(history({
    disableDotRule: true,
    verbose: true
  }))
  .use(staticFileMiddleware)
  //---vue location end

  .post('/register', (req, res) => {
    var var1 = req.body.var1;
    var var2 = req.body.var2;
    res.send(var1+" "+var2);
  
})



// not used anymore
 // .use(express.static(path.join(__dirname, 'public')))
 // .use(express.static(path.join(__dirname, 'src')))
  //.use(express.static(path.join(__dirname, '/dist/')))
 // .use(serveStatic(path.join(__dirname, 'dist')))
//  

 // .get('/test', (req, res) =>  res.render(path.join(__dirname + '/dist/index.html'))) 
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
