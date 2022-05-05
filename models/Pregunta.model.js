const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Pregunta = new Schema({
  pregunta: {
      type: String
  },
  imagen: {
      type: String
  },
  rc: {
    type: String
  },
  respuestas: [{
    type: String
    }],
},{
    collection: 'preguntas'
});

module.exports = mongoose.model('Pregunta', Pregunta);