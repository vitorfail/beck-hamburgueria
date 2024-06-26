const express = require('express');
const app = express();
const port = 8080; // Escolha a porta que desejar
const bodyParser = require("body-parser")
const home = require("./src/api/Home.js")
const ultimas_vendas = require("./src/api/ultima_venda.js")





var cors = require('cors')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())
app.use(express.json({limit: '534kb', extended: false }));
app.use(express.urlencoded({limit: '534kb', extended: true }));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.get('/', async (req, res) => {
    res.status(200).send("Beckend de testes")  
  });
app.use("/home", home)
app.use("/ultimas_vendas", ultimas_vendas)

app.listen(port, () => {
    console.log(`Servidor está ouvindo na porta ${port}`);
});