const express = require('express');
const bodyParser = require('body-parser');
var path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const expressSession = require('express-session');
const app = express();

/************************router */
const router = require('./app/router');
const { use } = require('./app/router');

/*******************middware***************** */
let db = require('./config/database')
require('dotenv').config();
db(process.env.MONGO_local_KEY);

//mongoose.connect('mongodb://localhost/biblioteca', { useNewUrlParser: true, useUnifiedTopology: true });
/*var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
    console.log("conexão feita com sucesso");
});
*/

/* configurar o middleware body-parser */
app.use(express.static(path.join(__dirname, 'public')));
/* setar as variáveis 'view engine' e 'views' do express */
app.set('view engine', 'ejs');
app.set('views', './app/views');
var logger = require('morgan');
app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/* configurar o middleware multiparty */
//app.use(multiparty());

/* configurar o middleware de expressSession */
app.use(expressSession({
    secret: 'hahah',
    resave: false,
    saveUninitialized: false
}))
app.use('/files', express.static(path.resolve(__dirname, 'uploads')));
app.use('/doc', express.static(path.resolve(__dirname, 'uploads')));
app.use(router);

app.listen(5000, () => {
    console.log("Servidor rodando")
})