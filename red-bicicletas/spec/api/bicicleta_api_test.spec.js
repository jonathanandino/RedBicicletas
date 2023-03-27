var Bicicleta = require('../../models/bicicleta');
var request = require('request');
var server = require('../../bin/www');

var base_url = "'http://localhost:3000/api/bicicletas";


describe('bicicleta Api', () =>{
    
    beforeEach(function(done){
        var mongoDB = 'mongoDB://localhost/testdb';
        mongoose.connect(mongoDB, {useNewUrlPrser: true});

        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'conection error'));
        db.once('open', function(){
            console.log('we are connected to rest database!');
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
