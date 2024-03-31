const express = require('express');
require('dotenv').config();
const fs = require("fs") 

const rota = express.Router()

async function ultima_venda(){
    return new Promise((resolve, reject) => {
        fs.readFile('src/api/banco.json', 'utf8', (err, data) => {
            if (err) {
                console.error('Erro ao ler o arquivo:', err);
                return;
              }
                const obj = JSON.parse(data);
                var ultimas_vendas = []
                for(var u in obj.vendas){
                    ultimas_vendas.push(obj.vendas[u])
                }
                

            // Converter o conteúdo do arquivo para um objeto JavaScript

                resolve({ultimas_vendas:ultimas_vendas})
            }
        )
    
    })
}


rota.post('/',async (req, res)=>{
    try{
        var result = await ultima_venda()
        res.status(200).send({result:result})    
    }
    catch(error){
        res.status(500).send({result:error})
    }
})
module.exports = rota