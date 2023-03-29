var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BicicletaSchema = new Schema({
    code: Number,
    color: String,
    model: String,
    ubicacion: { 
        type: [Number], index: {type:'2dsphere', sparse: true}
    }
});

BicicletaSchema.statics.createInstance = function(code, color, model, ubicacion){
    return new this({
        code: code,
        color: color,
        model: model,
        ubicacion: ubicacion
    });
};

BicicletaSchema.methods.toString = function() {
    return 'code: ' + this.code + ' |color: ' + this.color;
};

BicicletaSchema.statics.allBicis = function(cb) {
    return this.find({}, cb); 
};

BicicletaSchema.statics.add = function(aBici, cb) {
    this.create(aBici, cb); 
};

BicicletaSchema.statics.findByCode = function(aCode, cb) {
    return this.findByCode({code: aCode}, cb); 
};

BicicletaSchema.statics.removeByCode = function(aCode, cb) {
    return this.removeByCode({code: aCode}, cb); 
};


module.exports = mongoose.model('Bicicleta', BicicletaSchema);
