import * as restify from 'restify'


// create the server
const server = restify.createServer({
    name: 'meat-api',
    version: '1.0.0'
})

// register the URL router (endpoint)
server.get('/hello', (req, respo, next)=>{
    respo.json({message: 'hello'})
    return next()
})

// enable server listen on port 3000
server.listen(3000, ()=>{
    console.log('API is running on http://localhost:3000')
})