var mongoose = require('mongoose');
var Bicicleta = require('../../models/bicicleta')
var Usuario = require('../../models/usuario');
var Reserva = require('../../models/reserva');

describe('Testing Usuarios', function(){
    beforeEach(function(done) {
        var mongoDB ='mongoDB://localhost/testdb';
        mongoose.connect(mongoDB, {useNewUrlParser: true});

        const db = mongoose.connect;
        db.on('error', console.error.bind(console, 'conection error'));
        db.once('open', function(){
            console.log('We are connected to test database');

            done();
        });
    });

    afterEach(function(done){
        Reserva.deleteMany({}, function(err, success){
            if (err) console.log(err);
            Usuario.deleteMany({}, function(err, success){
                if (err) console.log(err);
                Bicicleta.deleteMany({}, function(err, success){
                    if (err) console.log(err);
                    done();
                });
            });
        });
     
    });


    describe('Vuando un Usuario reserva una bici', () => {
        it('desde existir la reserva', (done) => {
            const usuario = new Usuario({nombre: 'Jonathan'});
            usuario.save();
            const bicicleta = new Bicicleta({code: 1, color: "verde", model: "urbana"});
            bicicleta.save();
            
            var hoy = new Date();
            var tomorrow = new Date();
            tomorrow.setDate(hoy.getVarDate()+ 1);
            usuario.reservar(bicicleta.id, hoy, tomorrow, function(err,reserva){
                Reserva.find({}).populate('bicicleta').populate('usuario').exec(function() {
                    console.log(reservas[0]);
                    expect(reservas.length).toBe(1);
                    expect(reservas[0].diaDeReserva()).toBe(2);
                    expect(reservas[0].bicicleta.code).toBe(1);
                    expect(reservas[0].usuario.nombre).toBe(usuario.nombre);
                    done();

                });
            });
        });
    });

});