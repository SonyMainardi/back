//const connection = require("../database");

class Escala {
  constructor(escala) {
    this.id = escala.id;
    this.starts_at = escala.starts_at;
    this.ends_at = escala.ends_at;
    this.calendar_id = escala.calendar_id;
    this.employee_id = escala.employee_id;
  }
}

exports.getAll = function () {
  return new Promise(resolve => {
    const escalas = [];
    let sql = "SELECT * FROM hcsh4_shifts";
    let i = 0;
    global.conn.query(sql, function (err, result) {
      if (err) {
        console.log(err);
      }
      result.forEach(element => {
        escalas[i] = new Escala(result[i]);
        i++;
      });
      resolve(escalas);
    });
  });
};

exports.validateHash = function (hash) {
  return new Promise(resolve => {
    let sql = `SELECT count(*) qtd FROM hcsh4_shifts WHERE load_hash = '${hash}'`;
    global.conn.query(sql, function (err, result) {
      if (err) {
        console.log(err);
        resolve(0);
      }
      qtd = result[0].qtd
      if (qtd == 0){
        resolve(1);
      }
      else {
        console.log('Hash Inválido!');
        resolve(0);
      }
    });
  });
};

exports.getEscalaByEmployee = function (employee_id) {
  return new Promise(resolve => {
    const escalas = [];
    let sql = `SELECT * FROM hcsh4_shifts WHERE employee_id = ${employee_id}`;
    let i = 0;
    global.conn.query(sql, function (err, result) {
      if (err) {
        console.log(err);
      }
      result.forEach(element => {
        escalas[i] = new Escala(result[i]);
        i++;
      });
      resolve(escalas);
    });
  });
};

exports.getEscalaByID = function (escala_id) {
  return new Promise(resolve => {
    const escalas = [];
    let sql = `SELECT * FROM hcsh4_shifts WHERE id = ${escala_id}`;
    let i = 0;
    global.conn.query(sql, function (err, result) {
      if (err) {
        console.log(err);
      }
      result.forEach(element => {
        escalas[i] = new Escala(result[i]);
        i++;
      });
      resolve(escalas);
    });
  });
};

exports.getEscalaByEmployeePeriod = function (employee_id, dt_inicio, dt_fim) {
  return new Promise(resolve => {
    const escalas = [];
    let sql = `SELECT * FROM hcsh4_shifts WHERE employee_id = ${employee_id} AND starts_at >=  ${dt_inicio} AND starts_at <=  ${dt_fim}`;
    let i = 0;
    global.conn.query(sql, function (err, result) {
      if (err) {
        console.log(err);
      }
      result.forEach(element => {
        escalas[i] = new Escala(result[i]);
        i++;
      });
      resolve(escalas);
    });
  });
};

exports.create = function (escala) {
  return new Promise(resolve => {
    let sql = ''
    if (escala.load_hash){
      sql = `INSERT INTO hcsh4_shifts (starts_at, ends_at, calendar_id, employee_id, load_hash) VALUES (${escala.starts_at}, ${escala.ends_at}, ${escala.calendar_id}, ${escala.employee_id}, '${escala.load_hash}')`;
    }
    else {
      sql = `INSERT INTO hcsh4_shifts (starts_at, ends_at, calendar_id, employee_id) VALUES (${escala.starts_at}, ${escala.ends_at}, ${escala.calendar_id}, ${escala.employee_id})`;
    }
    console.log(sql);
    global.conn.query(sql, function (err, result) {
      if (err) {
        console.log(err);
      }
      resolve(result);
    });
  });
};

exports.delete = function (id) {
  return new Promise(resolve => {
    let sql = `DELETE FROM hcsh4_shifts WHERE id = ${id}`;
    global.conn.query(sql, function (err, result) {
      if (err) {
        console.log(err);
      }
      resolve(result);
    });
  });
};

exports.update = function (escala) {
  return new Promise(resolve => {
    let sql = `UPDATE hcsh4_shifts SET starts_at = ${escala.starts_at}, ends_at = ${escala.ends_at}, calendar_id = ${escala.calendar_id}, employee_id = ${escala.employee_id}  WHERE id = ${escala.id}`;
    global.conn.query(sql, function (err, result) {
      if (err) {
        console.log(err);
      }
      resolve(result);
    });
  });
};

exports.updateCalendar = function (info, hash) {
  return new Promise(resolve => {
    let sql = `UPDATE hcsh4_shifts
    SET calendar_id = ${info.calendar_id},
    load_hash = '${hash}'
    WHERE employee_id = ${info.employee_id}
      AND starts_at >=  ${info.dt_inicio}
      AND starts_at <=  ${info.dt_fim}`;

    global.conn.query(sql, function (err, result) {
      if (err) {
        console.log(err);
      }
      resolve(result);
    });
  });
};