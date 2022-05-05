const express = require('express');
const app = express();
const PreguntaRouter = express.Router();
const Pregunta = require('../models/Pregunta.model');

PreguntaRouter.route('/').get(function (req, res) {
  Pregunta.find(function (err, preguntas){
    if(err){
      console.log(err);
    }
    else {
      res.render('index', {preguntas: preguntas});
    }
  });
});

PreguntaRouter.route('/anadir').get(function(req,res){
  res.render('anadir');
});

PreguntaRouter.route('/post').post(function (req, res) {
   const pregunta = new Pregunta(req.body);
   console.log(pregunta);
   pregunta.save()
     .then(pregunta => {
     res.redirect('/preguntas');
     })
     .catch(err => {
     res.status(400).send("unable to save to database");
     });
 });

 PreguntaRouter.route('/editar/:id').get(function (req, res) {
  const id = req.params.id;
  Pregunta.findById(id, function (err, pregunta){
      res.render('editar', {preguntas: pregunta});
  });
});

PreguntaRouter.route('/update/:id').post(function (req, res) {
  Pregunta.findById(req.params.id, function(err, pregunta) {
    if (!pregunta)
      return next(new Error('Could not load Document'));
    else {
      pregunta.pregunta = req.body.pregunta;
      pregunta.rc = req.body.rc;
      pregunta.ri1 = req.body.ri1;
      pregunta.ri2 = req.body.ri2;
      pregunta.ri3 = req.body.ri3;

      pregunta.save().then(pregunta => {
          res.redirect('/preguntas');
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});

PreguntaRouter.route('/eliminar/:id').get(function (req, res) {
  Pregunta.findByIdAndRemove({_id: req.params.id},
       function(err, pregunta){
        if(err) res.json(err);
        else res.redirect('/preguntas');
    });
});

module.exports = PreguntaRouter;