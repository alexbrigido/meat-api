import * as restify from 'restify'

export abstract class Router {
    abstract applyRooutes(application: restify.Server)
}