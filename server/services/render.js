const axios = require('axios');
const { request } = require('express');

exports.homeRoutes = (req, res)=>{
    // make a get request to api/users to get all users
    debugger
    axios.get('http://localhost:3000/api/users')
    .then(function(response) {
        console.log(response);
        res.render('index', {users: response.data});
    })
    .catch(error => {
        res.send(error);
    });
};

exports.add_user = (req, res)=>{
    res.render('add_user');
}

exports.update_user = (req, res)=>{
    debugger
    // get request to get specific user by id
    axios.get('http://localhost:3000/api/users', {params:{id:req.query.id}})
    .then(function(userdata) {
        res.render('update_user', {user:userdata.data});
    })
    .catch(error => {
        res.send(error);
    })
}
