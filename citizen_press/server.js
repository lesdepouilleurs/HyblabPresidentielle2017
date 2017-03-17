// Use strict mode
'use strict';

// Load usefull expressjs and nodejs objects / modules
var express = require('express');
var path = require('path');

var app = express();

var fs = require('fs');

var d3 = require('d3');
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req, res) => {
	console.log("Page principale");
	res.set({"Content-Type" : "text/html"});	// Typage du texte
	fs.readFile('citizen_press/public/html/testchart.html','utf8', function(err,data){	// Lecture d'un fichier
		res.write(data);
		res.end();
	});	// Ecriture dans la réponse
});

// GET bureaux (pour la map)
app.get("/bureaux", (req, res) => {
	console.log("Chargement des bureaux...");
	fs.readFile('data.json', 'utf8', function (err, data) {
	    if (err) throw err; // à voir 
	    var obj = JSON.parse(data);
	    res.write(obj.bureaux[0].id);
	    res.send();
	});
})

// GET informations sur un bureau (pour récupérer les informations lors de l'inscription)
app.get("/bureaux/:id", (req, res) => {

});

// La page du formulaire d'inscription
app.get("/bureaux/:id/inscription" , (req, res) => {

});

// Ajout assesseurs
app.post("/assesseurs/:id", (req, res) => {
	console.log("Ajout d'un assesseurs...");
	fs.readFile('data.json', 'utf8', function (err, data) {
	    if (err) throw err; // à voir 
	    var obj = JSON.parse(data);
	    var nbAssesseurs = obj.assesseurs.length;
	    obj.assesseurs[nbAssesseurs+1].id = req.params.id;
	    // ajout des autres caractéristiques de l'objet bureau

	    // Écriture du nouveau fichier
	    fs.writeFile('data.json', JSON.stringify(obj));
	});
});

// La page de connexion  d'un président
app.get("/connexion", (req, res) => {
 // TODO
});

// La page des assesseurs validé sur un bureau
app.get("/bureaux/:id/assesseurs", (req, res) => {
 // TODO
});

// La page des statistique globales sur les assesseurs
app.get("/assesseurs", (req, res) => {
 // TODO
});


// Minimum routing: serve static content from the html directory
//app.use(express.static(path.join(__dirname, 'public')));

// You can then add whatever routing code you need

// This module is exported and served by the main server.js located
// at the root of this set of projects. You can access it by lanching the main
// server and visiting http(s)://127.0.0.1:8080/name_of_you_project/ (if on a local server)
// or more generally: http(s)://server_name:port/name_of_you_project/
module.exports = app;
