import session from 'express-session'
import passport from "passport";
import { Strategy as LocalStrategy } from 'passport-local'
import Mailer from '../service/nodeMailer.js'

import logger from "../utils/logger.js"

import MongoUsuarios from "../persistence/dao/mongo/usuariosMongo.js";

const baseUsuarios = new MongoUsuarios();

export class initPassport {
    constructor() { }
    setConfig(app) {
        app.use(session({
            secret: 'laappsecretisima',
            resave: false,
            saveUninitialized: false,
            cookie: {
                maxAge: 60000
            }
        }))
        app.use(passport.initialize())
        app.use(passport.session())
    }
}

//----Loggin-----//
passport.use('login', new LocalStrategy(async (email, password, done) => {

    const usuario = await baseUsuarios.getByEmail(email)
    if (!usuario) {
        logger.warn("No existe el usuario.")
        return done(false)
    }

    if (usuario.password != password) {
        logger.warn("Contrasenia incorrecta.")
        return done(false)
    }

    logger.info("Usuario logeado.")
    return done(null, usuario)
}))

passport.serializeUser((user, done) => {
    done(null, user.email)
})

passport.deserializeUser(async (email, done) => {
    const usuario = await baseUsuarios.getByEmail(email)
    done(null, usuario)
})

//----Passport-----//

export class Passport {

    constructor() { }

    //Inicio Session
    renderLogin(req, res) {
        res.render('./forms/log/login');
    }

    login(req, res) {
        passport.authenticate('login', { failureRedirect: '/faillogin', successRedirect: '/api/productos' })
    }

    renderFailLogin(req, res) {
        res.render('./forms/log/noLog');
    }

    //LogOut
    logout(req, res) {
        req.logout();
        res.redirect('/login');
    }

}

