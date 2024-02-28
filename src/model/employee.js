class Employee {
  constructor(employee) {
    this.id = employee.id;
    this.name = employee.name;
    this. status = employee.status;
  }
}

exports.getAllEmployees = function () {
  return new Promise(resolve => {
    const employees = [];
    let i = 0;
    let sql = "SELECT id, title as name FROM hcsh4_employees WHERE status = 'publish'"; 
    global.conn.query(sql, function (err, result) {
      if (err) {
        console.log(err);
      }
      result.forEach(element => {
        employees[i] = new Employee(result[i]);
        i++;
      });
      resolve(employees);
    });
  });
};