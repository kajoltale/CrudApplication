const express = require('express');
const route = express.Router();

const services = require('../services/render');
const controller = require('../controller/controller');
const { Router } = require('express');

/* 
route.get('/', (req, res)=>{
    res.render('index');
})

route.get('/add-user', (req, res)=>{
    res.render('add_user');
})

route.get('/update-user', (req, res)=>{
    res.render('update_user');
})*/

/* seprate file for call back function */

/**
 * @description Root Route
 * @method Get
 */
route.get('/', services.homeRoutes);

/**
 * @description Add users
 * @method Get /add-user
 */
route.get('/add-user', services.add_user);

/**
 * @description Update users
 * @method Get /update-user
 */
route.get('/update-user', services.update_user);

// API
route.post('/api/users', controller.create);
route.get('/api/users', controller.find);
route.put('/api/users/:id', controller.update);
route.delete('/api/users/:id', controller.delete);

module.exports = route;
