var mongoose = require('mongoose');
var moment = require('moment');
var Schema = mongoose.Schema;

var reservaSchema = new Schema({
    desde: Date,
    hasta: Date,
    bicicleta: {type: mongoose.Schema.Types.ObjectID, ref: 'Bicicleta'},
    usuario: {type: mongoose.Schema.Types.ObjectID, ref: 'Usuario'},
});


reservaSchema.method.diasDeReserva = function(){
    return moment(this.hasta).diff(moment(this.desde), 'days') + 1; 
}

module.exports = mongoose.model('Reserva', reservaSchema);
