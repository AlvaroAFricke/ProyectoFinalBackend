import session from 'express-session'
import passport from "passport";
import { Strategy as LocalStrategy } from 'passport-local'
import Mailer from '../service/nodeMailer.js'

import logger from "../utils/logger.js"

import MongoUsuarios from "../persistence/dao/mongo/usuariosMongo.js";

const mailer = new Mailer();
const baseUsuarios = new MongoUsuarios();

export class initPassport{
    constructor(){}
    setConfig(app){
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

//----Registro-----//
passport.use('register', new LocalStrategy({
    passReqToCallback: true
}, async (req, email, password, done) => {
    const { username } = req.body
    const { direccion } = req.body
    const { edad } = req.body
    const { telefono } = req.body

    const usuario = await baseUsuarios.getByEmail(email)
    if (usuario) {
        logger.warn("Usuario ya registrado.")
        return done('el usuario ya esta registrado', false)
    }

    const newUser = {
        username,
        password,
        email,
        edad,
        telefono,
        direccion
    }

    mailer.send(newUser)

    baseUsuarios.save(newUser)
    logger.info("Nuevo usuario registrado.")
    return done(null, newUser)
}))

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
    const usuario = await baseUsuarios.email(email)
    done(null, usuario)
})

//----Passport-----//

export class Passport {

    constructor() { }

    //Registro
    renderRegister(req, res) {
        res.render('./forms/log/registro');
    }

    register(req, res) {
        passport.authenticate('register', { failureRedirect: '/failregister', successRedirect: '/apiproductos' })
    }

    renderFailRegister(req, res) {
        res.render('./forms/log/noReg');
    }

    //Inicio Session
    renderLogin(req, res) {
        res.render('./forms/log/login');
    }

    login(req, res) {
        passport.authenticate('login', { failureRedirect: '/faillogin', successRedirect: '/index' })
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

