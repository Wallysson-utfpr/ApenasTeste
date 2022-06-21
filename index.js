const express = require('express');
const app = express();
const porta = process.env.porta || 3000;
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var path = require('path');
var Moeda = require('./model/moeda');
var Login = require('./model/login');
var upload = require('./config/configMulter');

app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");

app.get('/', function (req, res) {
    res.render('login.ejs');
})

app.get('/cadastrar', function (req, res) {
    res.render('cadastro.ejs');
})

app.post('/cadastrar', function (req, res) {
    var login = new Login({
        email: req.body.iptEmail,
        password: req.body.iptSenha
    })

    login.save(function (err) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/');
        }
    })
})


app.post('/authenticate', (req, res) => {
    const { iptEmail, iptSenha } = req.body;
    
    Login.findOne({ iptEmail })
    .then((data) => {
        if (data.email == iptEmail && data.password == iptSenha)  {
            res.redirect('/add')
        } else { 
            res.redirect('/?=SenhaIncorreta') 
        }
    })
})

app.get('/add', function (req, res) {
    res.render('index.ejs');
})

app.post('/add', upload.single("txtFoto"), function (req, res) {
    var money = new Moeda({
        nome: req.body.txtNome,
        alta: req.body.txtAlta,
        baixa: req.body.txtBaixa,
        foto: req.file.filename
    })
    money.save(function (err) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/add');
        }
    })
})


<<<<<<< HEAD
app.listen(3000, function () {
=======
app.post('/posts', validateAuthToken, (req, res) => {
    req.cookies;
    const post = req.body;
    posts.push(post);
    res.status(201).send(post);
})

function validateCookie( req, res, next) {
    const { cookies} = req;
    if('session_id' in cookies) {
        console.log('Id de sessão ja existe');
        if( cookies.session_id === '123456') {
            next();
        } else {
            res.status(403).send({ msg: 'Não autenticado'});
        }
    } else {
        res.status(403).send({ msg: 'Não autenticado'});
    }
}

app.get('/signin', (req, res) => {
    res.cookie('session_id', '123456');
    res.status(200).json({msg: 'Logado'});
})

app.get('/protecao', validateCookie, (req, res) => {
    res.status(200).json({msg: 'Autorizado'});
})
*/
app.listen(porta, function () {
>>>>>>> 89e79ece0ae02e074b65ef7b2acdb07be081f668
    console.log("Conexão inicializada.");
})

