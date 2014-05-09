var express = require('express');
var app = express();
var fs = require('fs');  // we will need it for file uploads


// Configuración
app.configure(function() {
	app.use(express.static(__dirname + '/public'));		// Localización de los ficheros estáticos
	app.use(express.logger('dev'));						// Muestra un log de todos los request en la consola
	app.use(express.bodyParser());						// Permite cambiar el HTML con el método POST
	app.use(express.methodOverride());					// Simula DELETE y PUT
	app.use(app.router);
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

app.get('/api/upload_video', function(req, res) {
	res.json("{get}");				// POST que crea un TODO y devuelve todos tras la creación
	console.log('Subiendo fichero');
});

app.post('/api/upload_video', function(req, res) {				// POST que crea un TODO y devuelve todos tras la creación
	console.log(JSON.stringify(req.files)); // this will let you see 
	
	 var temp_path = req.files.file.path;
     var save_path = './public/images/' + req.files.file.name;
     
     fs.rename(temp_path, save_path, function(error){
     	if(error) throw error;
     	
     	fs.unlink(temp_path, function(){
     		if(error) throw error;
     		res.send("File uploaded to: " + save_path);
     	});
     	
     });
     
     
	res.json("{post}");				// POST que crea un TODO y devuelve todos tras la creación
	console.log('Subiendo fichero');
});

// Escucha y corre el server
app.listen(8099, function() {
	console.log('App listening on port 8099 - Upload Videos');
});
