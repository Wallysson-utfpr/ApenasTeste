// 
// 
require('./environment')
const jwt = require('jsonwebtoken');
const express = require('express');
const app = express();
const { emitWarning } = require('process');
const login = require('./model/login');

// a contante abaixo é utilizada para teste em bando de dados local
//const porta = process.env.porta || 3000;

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
    res.render('login.ejs')
})


app.get('/cadastrar', function (req, res) {
    res.render('cad_user.ejs');
})


/* Primeira função para cadastro de usuário - não verifica se o email já está cadastrado.
app.post('/cadastrar', function (req, res) {

    //console.log('requestttttt#####', req.body)
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
*/


// Segunda versão da função para cadastro de usuário - verifica se o email já está cadastrado.
app.post('/cadastrar', async (req, res) => {

    try {
        const { iptEmail } = req.body;
        const data = await Login.findOne({ email: iptEmail})

        const seed = 'token-seed-development' // assinatura do token
        const EXPIRES = '1h' // tempo que esse token ira expirar
        const accessToken = jwt.sign({
            id: data._id
        }, seed, { expiresIn: EXPIRES })

        const newUser = {
            id: data._id,
            email: data.email

        }

        return res.redirect('/userExist')

    } catch (error) {
        if (error) {
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
        }
    }
})


// autenticação do usuário no servidor - comparando os dados informados
app.post('/authenticate', async (req, res) => {

    try {
        const { iptEmail, iptSenha } = req.body;
        const data = await Login.findOne({ email: iptEmail, password: iptSenha })

        const seed = 'token-seed-development' // assinatura do token
        const EXPIRES = '1h' // tempo que esse token ira expirar
        const accessToken = jwt.sign({
            id: data._id
        }, seed, { expiresIn: EXPIRES })

        const newUser = {
            id: data._id,
            email: data.email

        }

        return res.redirect('/add')

        /*JRMS - Verificar
        if (accessToken) return res.status(200).json({
            ok: true,
            message: 'Is Authenticated',
            user: newUser,
            token: accessToken

        })
        */

    } catch (error) {
        if (error) {
            return res.redirect('/wrong_passw')
        }
    }
})


app.get('/add', function (req, res) {
    res.render('cad_moeda.ejs');
})

app.get('/wrong_passw', function (req, res) {
    res.render('wrong_passw.ejs');
})


app.get('/consulta', function (req, res) {
    res.render('cons_moeda.ejs');
})


app.get('/userExist', function (req, res) {
    res.render('userExist.ejs');
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
    fotos.push(req.file.filename);
    res.redirect('/add');

})

let port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log("Conexão inicializada.");
})

