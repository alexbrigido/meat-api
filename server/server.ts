import * as restify from 'restify'
import * as mongoose from 'mongoose'
import {environment} from '../common/environment'
import {Router} from '../common/router'
import {mergePatchBodyParser} from './merge-patch.parser'

export class Server {

    application: restify.Server

    initalizeDb(): mongoose.MongooseThenable {
        (<any>mongoose).Promise = global.Promise
        return mongoose.connect(environment.db.url, {
            useMongoClient: true
        })
    }

    bootstrap(routers: Router[] = []): Promise<Server> {
        return this.initalizeDb().then(()=>
                this.initRoutes(routers).then(()=> this))
    }

    initRoutes(routers: Router[]): Promise<any>{
        return new Promise((resolve, reject)=>{
            try {

                // create the server
                this.application = restify.createServer({
                    name: 'meat-api',
                    version: '1.0.0'
                })
                
                // configure query params on json format
                this.application.use(restify.plugins.queryParser())
                this.application.use(restify.plugins.bodyParser())
                this.application.use(mergePatchBodyParser)

                // routes
                for (let router of routers) {
                    router.applyRooutes(this.application)
                }
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