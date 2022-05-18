const express = require('express');
const app = express();
const RespuestaRouter = express.Router();
const Respuesta = require('../models/Respuesta.model');

RespuestaRouter.route('/').get(function (req, res) {
  Respuesta.find(function (err, respuestas){
    if(err){
      console.log(err);
    }
    else {
      res.render('respuestaIndex', {respuestas: respuestas});
    }
  });
});

RespuestaRouter.route('/respuestaAnadir').get(function(req,res){
  res.render('respuestaAnadir');
});

RespuestaRouter.route('/post').post(function (req, res) {
   const respuesta = new Respuesta(req.body);
   console.log(respuesta);
   respuesta.save()
     .then(respuesta => {
     res.redirect('/respuestas');
     })
     .catch(err => {
     res.status(400).send("unable to save to database");
     });
 });

 RespuestaRouter.route('/editar/:id').get(function (req, res) {
  const id = req.params.id;
  Respuesta.findById(id, function (err, respuesta){
      res.render('editar', {respuestas: respuesta});
  });
});

RespuestaRouter.route('/update/:id').post(function (req, res) {
  Respuesta.findById(req.params.id, function(err, respuesta) {
    if (!respuesta)
      return next(new Error('Could not load Document'));
    else {
      respuesta.usertag = req.body.usertag;
      respuesta.puntuacion = req.body.puntuacion;

      respuesta.save().then(respuesta => {
          res.redirect('/respuestas');
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});

RespuestaRouter.route('/eliminar/:id').get(function (req, res) {
  Respuesta.findByIdAndRemove({_id: req.params.id},
       function(err, respuesta){
        if(err) res.json(err);
        else res.redirect('/respuestas');
    });
});

module.exports = RespuestaRouter;