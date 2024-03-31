const express = require('express');
require('dotenv').config();
const fs = require("fs") 

const rota = express.Router()

async function home(){
    return new Promise((resolve, reject) => {
        fs.readFile('src/api/banco.json', 'utf8', (err, data) => {
            if (err) {
                console.error('Erro ao ler o arquivo:', err);
                return;
              }
            // Converter o conteúdo do arquivo para um objeto JavaScript
                var valor_dia = 0
                var despesas_dia = 0
                var despesas_mes = 0
                var valor_mes= 0

                const obj = JSON.parse(data);
                var data = new Date()
                ///////Valor dia
                if (Object.keys(obj.vendas).length == 0){
                    valor_dia = 0
                }
                else{
                    for(var chave in obj.vendas){
                        var data_venda = new Date(obj.vendas[chave].data)
                        if(data_venda.getDate() === data.getDate()){
                            valor_dia= valor_dia + obj.vendas[chave].valor
                        }
                    }    
                }
                ////////despesas dia
                if (Object.keys(obj.despesas).length == 0){
                    despesas_dia = 0
                }
                else{
                    for(var chave in obj.despesas){
                        var data_venda = new Date(obj.despesas[chave].data)
                        if(data_venda.getDate() === data.getDate()){
                            despesas_dia= despesas_dia + obj.despesas[chave].valor
                        }
                    }    
                }
                ////////vendas mes
                if (Object.keys(obj.vendas).length == 0){
                    valor_mes = 0
                }
                else{
                    for(var chave in obj.vendas){
                        var data_despesas = new Date(obj.vendas[chave].data)
                        if(data_despesas.getMonth() === data.getMonth()){
                            valor_mes= valor_mes + obj.vendas[chave].valor
                        }
                    }    
                }
                ////////despesas mes
                if (Object.keys(obj.despesas).length == 0){
                    despesas_mes = 0
                }
                else{
                    for(var chave in obj.despesas){
                        var data_despesas = new Date(obj.despesas[chave].data)
                        if(data_despesas.getMonth() === data.getMonth()){
                            despesas_mes= despesas_mes + obj.despesas[chave].valor
                        }
                    }    
                }
                resolve({valor_dia:valor_dia, despesas_dia:despesas_dia,despesas_mes:despesas_mes ,valor_mes:valor_mes})
            }
        )
    
    })
}


rota.post('/',async (req, res)=>{
    try{
        var result = await home()
        console.log(result)
        res.status(200).send({result:result})    
    }
    catch(error){
        res.status(500).send({result:error})
    }
})
module.exports = rota