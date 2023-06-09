var Bicicleta = require('../../models/bicicleta');

exports.bicicleta_list = function(req, res){
    console.log(bicicleta.allBicis),

    res.status(200).json({
        bicicletas: Bicicleta.allBicis
    });
}

exports.bicicletas_create = function(req, res) {
    var bici = new Bicicleta(req.body.id, req.body.color, req.body.model);
    bici.ubicacion = [req.body.lat, req.body.lng];

    Bicicleta.add(bici);
    console.log(bici)

    res.status(200).json({
        bicicleta:bici
    });
}

exports.bicicletas_delete = function(req, res) {
    Bicicleta.removeById(req.body.id);
    res.status(204).send();
}