const app = require('express');

const escalaController = require('./src/controller/escalaController');
const employeeController = require('./src/controller/employeeController');

const routes = app.Router();

routes.get('/', escalaController.index)

routes.get('/employee', employeeController.all)

routes.get('/escala', escalaController.all)
routes.get('/escala/:id', escalaController.byID)
routes.get('/escala/employee/:id', escalaController.byEmployee)
routes.get('/escala/delete/:id', escalaController.delete)
routes.post('/escala/add', escalaController.add)
routes.post('/escala/update', escalaController.update)
routes.post('/escala/calendar', escalaController.updateCalendar)

module.exports = routes;