const employee = require("../model/employee");

module.exports = {
  async all(req, res){
    const response = await employee.getAllEmployees();
    return res.send(response);
  }
}