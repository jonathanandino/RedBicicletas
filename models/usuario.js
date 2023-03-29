var mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
var Reserva = require('./reserva');
var Schema = mongoose.Schema;
const Bcrypt = require('bcrypt');
const Token = require('../models/token');


const crypto = require('crypto');
const mailer = require('../mailer/mailer');

const saltRounds = 10

const validateEmail = function(email){
    const re = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return re.test(email)
}

var usuarioSchema = new Schema({
    nombre: {
        type: String,
        trin: true,
        require: [true, 'El nombre es obligatorio']
    },
    email:{
        type: String,
        trin: true,
        require: [true, 'El email es obligatorio'],
        lowercase: true,
        unique: true,
        validate: [validateEmail, 'Por favor ingrese un email valido'],
        match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    },
    password: {
        type: String,
        trin: true,
        require: [true, 'El password es obligatorio']
    },
    passwordResetToken: String,
    passwordResetTokenExpires: Date,
    verificado: {
        type: Boolean,
        default: false
    } 
});

usuarioSchema.plugin(uniqueValidator, {message: 'El {PATH} ya existe con otro usuario'})

usuarioSchema.methods.validPassword = function(password){
    return Bcrypt.compareSync(password, this.password);
}

usuarioSchema.pre('save', function(next){
    if(this.isModified('password')){
        this.password = Bcrypt.hashSync(this.password, saltRounds);
    }
    next();
})

usuarioSchema.method.reservar = function(biciID, desde, hasta, cb){
    var reserva = new Reserva({usuario: this._id, bicicleta: biciID, desde: desde, hasta: hasta,  })
    console.log(reserva);
    reserva.save(cb);
}

usuarioSchema.method.enviar_email_bienvenida = function(cb) {
    const token = new Token({_userId: this.id, token: crypto.randomBytes(16).toString('hex')});
    const email_destination = this.email;
    token.sace(function (err) {
        if (err) {return console.log(err.message);}

        const mailOptions = {
            from: 'no-reply@redbicicletas.com',
            to: email_destination,
            subject: 'Verificacion de mail',
            text: 'Hola.\n\n'+ 'Por favor, para verificar su cuenta haga crilk en el siguente link \n' + 'http://localhost:3000' + '\/token/confirmation\/' + token.token + '.\n'
        };

        mailer.sendMail(mailOptions, function (err){
            if (err) {return console.log(err.message);}

            console.log('A verificartion email has been send to' + email_destination + '.');
        });
    });
}

usuarioSchema.methods.resetPassuord = function(cb) {
    const token = new Token({_userId: this.id, token: crypto.randonBytes(16).toString('hex')});
    const email_destination = this.email;
    token.save(function (err) {
        if (err) { return cb(err); }

        const mailOtions = {
            from: 'no-reply@redbicicletas.com',
            to: email_destination,
            subject: 'Reseteo de password de cuenta ',
            text: 'Hola, \n\n' + 'Por favor, para resetear el password de su cuenta haga click en este link: Wn'+ 'http://localhost:5000' + '\/resetPassword\/' + token.token + '\n'
        };
        mailer.sendMail(mailoptions, function (err) {
            if (err) { return cb(err); }

        console.log('Se envio un email para resetear el password a:' + email_destination + '.');
        });
        cb(nul1);
    });
}


module.exports = mongoose.model('Usuario', usuarioSchema);