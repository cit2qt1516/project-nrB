var mongoose = require('mongoose');
var NrB = mongoose.model('nrMessage');

//GET All
exports.findAllnrB = function(req, res) {
    NrB.find(function(err, nrB) {
        if(err) res.send(500, err.message);

        console.log('GET /nrB')
        res.status(200).jsonp(nrB);
    });
};

//GET by ID
exports.findById = function(req, res) {
    NrB.findById(req.params.id, function(err, nrB) {
        if(err) return res.send(500, err.message);

        console.log('GET /nrB/' + req.params.id);
        res.status(200).jsonp(nrB);
    });
};

//POST - post que nos hara A para saber que nos quiere enviar algo y le contestaremos con el paso 2 .
exports.addNrB = function(req, res) {
    console.log('POST');
    console.log(req.body);

    var prueba = (req.body.identificador2+req.body.paso+req.body.contenido);

    var nrB = new NrB({
        identificador1:  req.body.identificador1,
        identificador2:  req.body.identificador2,
        paso: 		req.body.paso,
        contenido: 	req.body.contenido,
        prueba:  prueba
    });

    nrB.save(function(err, nrB) {
        if(err){
            return res.send(500, err.message);
        } else {
            var paso2 = nrB.paso+1;
            var prueba2 = (nrB.identificador1+paso2+nrB.contenido);
            var nrA = new NrB({
                identificador2:  nrB.identificador1,
                paso: 		paso2,
                prueba:    prueba2
            })
            nrA.save();
            res.status(200).jsonp(nrA);
        }
    });
};

////POST - especial para A
//    exports.addNrA = function (req, res) {
//        console.log('POST');
//        console.log(req.body);
//
//        var nrB = new NrB({
//            identificador: "A",
//            paso: "2",
//            prueba: "A2sesto mariquita"
//        });
//
//        nrB.save(function (err, nrB) {
//            if (err) return res.send(500, err.message);
//            res.status(200).jsonp(nrB);
//        });
//    };


//PUT - Update a register already exists
exports.updateNrB = function(req, res) {
    NrB.findOneAndUpdate({"_id": req.params.id}, req.body, function(err, nrB) {
           nrB.set(function(err) {
            //if(err) return res.send(500, err.message);
            //res.status(200).jsonp(nrB);
            if (!err) {
                console.log('Updated');
            }
            else {
                console.log('ERROR' + err);
            }
        });
        res.send('Modified');
    });
};

//DELETE -
exports.deleteNrB = function(req, res) {
    NrB.findOne({"_id":req.params.id}, function(err, nrB) {
        nrB.remove(function(err) {
            //if(err) return res.send(500, err.message);
            if (!err) {
                console.log('Object delete');
            }
            else {
                console.log('ERROR: ' + err);
            }
        })
    });
    res.status(200).send('Delete');
};