const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const Usuarios = require('../models/Usuarios');

module.exports = function (passport) {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback'
    },
        async (acessToken, refreshToken, profile, done) => {
            const novoUsuario = {
                googleID: profile.id,
                nome: profile.displayName,
                image: profile.photos[0].value,
            }

            try {
                let usuario = await Usuarios.findOne({ googleID: profile.id })

                if (usuario) {
                    done(null, usuario);
                } else {
                    usuario = await Usuarios.create(novoUsuario);
                    done(null, usuario)
                }
            } catch (error) {
                console.error(error);
            }
        }
    ))

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        Usuarios.findById(id, (error, user) => done(error, user))
    });
}