exports = module.exports = function(app, mongoose) {

    var nrMessageSchema = new mongoose.Schema({
        identificador1: 		{ type: String }, //QUIEN SOY
        identificador2: 		{ type: String }, //A QUIEN LE TIENE QUE LLEGAR
        paso: 		{ type: Number }, // EL PASO DONDE ESTOY
        contenido: 	{ type: String }, // EL MENSAJE QUE ENVIARE
        prueba:  	{ type: String } // LA PRUEBA CON EL HASH DE TODO
    });

    mongoose.model('nrMessage', nrMessageSchema);
};