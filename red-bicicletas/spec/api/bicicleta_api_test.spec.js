var Bicicleta = require('../../models/bicicleta');
var request = require('request');
var server = require('../../bin/www');
var mongoose = require('mongoose');

var base_url = "http://localhost:3000/api/bicicletas";

describe('bicicleta Api', () => {

    beforeEach(function (done) {
        var mongoDB = 'mongodb://localhost:27017/testdb';
        mongoose.connect(mongoDB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
          }).then(() => {
            console.log('Conectado a la base de datos');
          }).catch((err) => {
            console.error(err);
          });

        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error'));
        db.once('open', function () {
            console.log('we are connected to test database!');
            done();
        })
    })

    afterEach(function(done){
        Bicicleta.deleteMany({}, function(err, success){
            if (err) console.log(err);
            done();
        })
    })
    
    describe('GET BICICLETAS /', () => {
        it('status 200', () =>{
            expect(Bicicleta.allBicis.length).toBe(0);

            var a = new Bicicleta(1, 'negro', 'urbana', [-34.742981, -56.175396]);
            Bicicleta.add(a);

            request.get('http://localhost:3000/api/bicicletas', function(error, response, body){
                expect(response.statusCode).toBe(200);
            })
        })
    })

    describe('POST BICIBLETAS /create', () => {
        it('status 200', (done) =>{
            var headers = {'content-Type' : 'aplication/json'};
            var aBici = {"id": 10, "color": "rojo", "model": "urbana", "lat": -38, "lng": -58};
            request.post({
                headers: headers,
                url: 'http://localhost:3000/api/bicicletas/create',
                body: aBici
            },function(error,response, body) {
                expect(response.statusCode.toBe(200));
                expect(Bicicleta.findById.color.toBe("rojo"));
                done()
            })
          
            })
        })
    })
