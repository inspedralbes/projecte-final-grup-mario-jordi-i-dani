const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Respuesta = new Schema({
  tag: {
      type: String
  },
  tiempo: {
      type: String
  },
  puntuacion: {
    type: String
  }, 
},{
    collection: 'respuestas'
});

module.exports = mongoose.model('Respuesta', Respuesta);