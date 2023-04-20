// passport.js

import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt'

// Importar el modelo de usuario
import DBUSER from '../../persistence/dao/mongo/usuariosMongo.js';

const dbUser = new DBUSER();

// Configurar estrategia local de Passport
passport.use(new LocalStrategy(
    {
        usernameField: 'email', // Campo del formulario para el correo electrónico
        passwordField: 'password' // Campo del formulario para la contraseña
    },
    async (email, password, done) => {
        try {
            // Buscar al usuario en la base de datos por correo electrónico
            const user = await dbUser.getByEmail(email);

            // Si no se encuentra al usuario, devolver error
            if (!user) {
                return done(null, false, { message: 'Correo electrónico o contraseña incorrecta' });
            }
            // Verificar la contraseña
            const isMatch = bcrypt.compareSync(password, user.password)
            
            if (!isMatch) {
                console.log("Contra mala");
                return done(null, false, { message: 'Correo electrónico o contraseña incorrecta' });
            }

            // Si el usuario y contraseña son correctos, devolver el usuario
            return done(null, user);
        } catch (err) {
            return done(err);
        }
    }
));

// Serializar/deserializar el usuario
passport.serializeUser((user, done) => {
    done(null, user._id.toString());
});

passport.deserializeUser(async (id, done) => {
    try {
        // Buscar al usuario en la base de datos por ID
        const user = await dbUser.getById(id)

        // Si no se encuentra al usuario, devolver error
        if (!user) {
            return done(null, false, { message: 'Usuario no encontrado' });
        }

        // Si se encuentra al usuario, devolverlo
        return done(null, user);
    } catch (err) {
        return done(err);
    }
});

export default passport;
