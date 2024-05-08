const express = require('express');
const route = express.Router();
const services = require('../services/employeeServices');
const upload = require('../config/multer')

// Employee routes 
route.post('/api/employees',upload.single('image'),services.create);
route.get('/api/employees',services.find);
route.get('/api/employees/:id',services.findEmployee);
route.put('/api/employees/:id',upload.single('image'),services.update);
route.delete('/api/employees/:id',services.delete);
route.get("/search/:key", services.search);


module.exports = route;