const express = require('express');
const app = express();
const host = '0.0.0.0';
const port = 7005;
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://marsolluc:Institut124@finalproject.ven8w.mongodb.net/discordBot?retryWrites=true&w=majority')

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
    console.log('listening on 7005')
});
