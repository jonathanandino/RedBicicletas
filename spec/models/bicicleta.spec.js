var mongoose = require('mongoose');
var Bicicleta = require('../../models/bicicleta');


describe('Testing bicicletas', function(){

    beforeEach(function(done) {
        var mongoDB = 'mongodb://127.0.0.1/testDB';
        mongoose.connect(mongoDB, { useNewUrlParser: true});

        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error'));
        db.once('open', function() {
            console.log('we are connection to test abdatabase');
            done();
        });
    });

    afterEach(function(done){
        Bicicleta.deleteMany({}, function(err, success){
            if (err) console.log(err);
            done();
        });
     
    });

    describe('Bicicleta.createInstance', () => {
        it('Crea un instancia de bicicleta', () => {
            var bici = Bicicleta.createInstance(1, "verde", "urbana", [-34.5, -54.1]);

            expect(bici.code).toBe(1);
            expect(bici.color).toBe("verde");
            expect(bici.model).toBe("urbana");
            expect(bici.ubicacion[0]).toBe(-34.5);
            expect(bici.ubicacion[1]).toBe(-54.1);
        });
    });

    describe('Bicicletas.allBicis', () => {
        it('coniensa vacia', (done) => {
            Bicicleta.allBicis(function(err, bicis){
                expect(bicis.length).toBe(0);
                done();
            });
        });
    })

    describe('Bicicleta.add', () => {
        it('agrega solo una bici', (done) => {
            var aBici = new Bicicleta({code: 1, color: "verde", model: "urbana"});
            Bicicleta.addListener( aBici, function(err, newBici){
                if (err) console.log(err);
                Bicicleta.allBicis(function(err, bicis){
                    expect(bicis.length).toEqual(1);
                    expect(bicis[0].code).toEqual(aBici.code);

                    done();
                });
            });
        });
    });

    describe('Bicicletas.findByCode', () => {
        it('debe devolver la bici con code 1', (done) => {
            Bicicleta.allBicis(function(err, bicis){
                expext(bicis.length).toBe(0);



                var aBici = new Bicicleta({code:1, color: "verde", model: "urbana"});
                Bicicleta.addListener(aBici, function(err, newBici){
                    if (err) console.log(err);

                    var aBici2 = new Bicicleta({code: 2, color: "roja", model: "urbana"});
                    Bicicleta.addListener(aBici2, function(error, newBici){
                        if(err) console.log(err);
                        Bicicleta.findByCode(1, function (error, targetBici){
                            expect(targetBici.code).toBe(aBici.code);
                            expect(targetBici.color).toBe(aBici.color);
                            expect(targetBici.model).toBe(aBici.model);

                            done();
                        });
                    });
                });
            });
        });
    });
});



/*
beforeEach(() => {Bicicleta.allBicis = []; });

describe("Bicicleta.allbicis", () => {
    it("continua vacia", () => {
    expect(Bicicleta.allBicis.length).toBe(0);
    });
   }); 

   describe("Bicicleta.add", () =>{
    it('agregamos una',() => {
        expect(Bicicleta.allBicis.length).toBe(0);

        var a = new Bicicleta(1, "roja","urbana",[-34.742981, -56.175396]);
        Bicicleta.add(a);
        
        expect(Bicicleta.allBicis.length).toBe(1);
        expect(Bicicleta.allBicis[0]).toBe(a);
    })
   })

   describe("Bicicleta.findById", ()=> {
        it('debe devolver la bici con id i', () => {
            expect(Bicicleta.allBicis.length).toBe(0);
            var aBici = new Bicicleta(1, "verde", "urbana");
            var aBici2 = new Bicicleta(2, "verde", "urbana");
            Bicicleta.add(aBici);
            Bicicleta.add(aBici2);

            var targetBici = Bicicleta.findById(1);
            expect(targetBici.id).toBe(1);
            expect(targetBici.color).toBe(aBici.color);
            expect(targetBici.model).toBe(aBici.model);



        })
   })*/