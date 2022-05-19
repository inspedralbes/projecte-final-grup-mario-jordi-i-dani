const express = require('express');
const app = express();
const host = '0.0.0.0';
const port = 3000;
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://a20jorcatace:Institut124@cluster1.gkwwj.mongodb.net/preguntaBot?retryWrites=true&w=majority')

const PreguntaRouter = require('./routes/PreguntaRouter');
const RespuestaRouter = require('./routes/RespuestaRouter');

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/preguntas', PreguntaRouter);
app.use('/respuestas', RespuestaRouter);

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname,'public', 'index.html'));
 });

app.listen(port, host, function() {
    console.log('listening on 3000')
});
