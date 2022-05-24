const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const preguntasSchema = mongoose.Schema({
  pregunta: {
      type: String
  },
  imagen: {
      type: String
  },
  tema: {
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
const model = mongoose.model('preguntas', preguntasSchema); 
module.exports = model;