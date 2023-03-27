var mongoose = require('mongoose');
var Reserva = require('./reserva');
var Schema = mongoose.Schema;

var usuarioSchema = new Schema({
    nombre: String,
});

usuarioSchema.method.reservar = function(biciID, desde, hasta, cb){
    var reserva = new Reserva({usuario: this._id, bicicleta: biciID, desde: desde, hasta: hasta,  })
    console.log(reserva);
    reserva.save(cb);
}

module.exports = mongoose.model('Usuario', usuarioSchema);