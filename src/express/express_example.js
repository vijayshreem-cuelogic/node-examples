import express from 'express'

var app = express();

app.use((req, res, next) => {
  console.log(`Time: ${Date.now()}`)
  next();
})

function guessMethod(req, res, next){
  console.log('Method', req.method)
  res.send('Hello user')
  next();
}
function getOriginalUrl(req, res, next) {
  console.log('URL', req.originalUrl)
  next('route')
} 

function endProcess(req, res, next) {
  // This wont get executed
  console.log('END')
}

var MyRequests = [guessMethod, getOriginalUrl, endProcess]
app.get('/user/:id', MyRequests)

app.get('/',(req, res) => {
  res.send('Hello in Express')
})


app.listen('3000')