import * as restify from 'restify'
import {environment} from '../common/environment'

export class Server {

    application: restify.Server

    bootstrap(): Promise<Server> {
        return this.initRoutes().then(()=> this)
    }

    initRoutes(): Promise<any>{
        return new Promise((resolve, reject)=>{
            try {

                // create the server
                this.application = restify.createServer({
                    name: 'meat-api',
                    version: '1.0.0'
                })
                
                // configure query params on json format
                this.application.use(restify.plugins.queryParser())

                // routes
                // register the URL router (endpoint)(
                this.application.get('/info', (req, respo, next)=>{
                    respo.json({
                            browser: req.userAgent(),
                            method: req.method,
                            url: req.href(),
                            path: req.path(),
                            query: req.query
                        })
                    return next()
                })

                // enable server listen on port 3000
                this.application.listen(environment.server.port, ()=>{
                    resolve(this.application)
                })

            }catch(error){
                reject(error)
            }
        })
    }
}