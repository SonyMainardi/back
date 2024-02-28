const escala = require("../model/escala");
const fs = require('fs')

 function getHash(len){
  string = ''
  for(let i = 0; i < len; i++){
    let char = Math.floor(Math.random() * 36).toString(36);
    string = string + char;
  }
  return string.toUpperCase();
 }

module.exports = {
  async index(req, res){
    return res.send('Conectado');
  },

  async all(req, res){
    const response = await escala.getAll();
    return res.send(response);
  },

  async byEmployee(req, res){
    const { id } = req.params;
    const response = await escala.getEscalaByEmployee(id);
    return res.send(response);
  },

  async byID(req, res){
    const { id } = req.params;
    const response = await escala.getEscalaByID(id);
    return res.send(response);
  },

  async add(req, res){
    const info = req.body;
    const response = await escala.create(info);
    return res.send(response);
  },

  async delete(req, res){
    const { id } = req.params;
    const response = await escala.delete(id);
    return res.send(response);
  },

  async update(req, res){
    const info = req.body;
    const response = await escala.update(info);
    return res.send(response);
  },

  async updateCalendar(req, res){
    const info = req.body;
    let validHash = 0;
    let hash = ''
    while (!validHash) {
      hash = getHash(6);
      validHash = await escala.validateHash(hash);
    }

    const escalas = await escala.getEscalaByEmployeePeriod(info.employee_id, info.dt_inicio, info.dt_fim);

    let substituicao = []
    for (i in escalas){
      let item = escalas[i]
      let insert = {
        "starts_at": item.starts_at, 
        "ends_at": item.ends_at, 
        "calendar_id": item.calendar_id, 
        "employee_id": info.substitute_id, 
        "load_hash": hash
      }
      await escala.create(insert)
      substituicao.push(insert)
    }
    
    const response = await escala.updateCalendar(info, hash);

    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    const outputLog = fs.createWriteStream(`./src/log/${year}${('0' + month).slice(-2)}${('0' + day).slice(-2)}-${hash}.log`);

    const consoler = new console.Console(outputLog);

    consoler.log('Escalas Originais:');
    consoler.log(escalas);
    consoler.log(`\nAlteração calendar_id: ${info.calendar_id}`);
    consoler.log('\nEscalas de Substituição:');
    consoler.log(substituicao);

    return res.send(response);
  }
}