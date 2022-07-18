const { message } = require('statuses');
var UserDb = require('../model/model');

// create and save new user
exports.create = (req, res) => {
    // validate request
    if(!req.body) {
        res.status(400).send({message: "Content can not be empty!"});
        return;
    }

    // new user
    const user = new UserDb({
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        status: req.body.status
    });

    // save user in the database
    user
      .save(user)
      .then(data => {
          //res.send(data)
          res.redirect('/add-user');
      })
      .catch(error => {
        console.log("Error in Create.");
          debugger
          res.status(500).send({message: error.message || "Some error occured while creating a create opertaion"});
      });
};

// retrive and return all users/single user
exports.find = (req, res) => {

    if(req.query.id) {
        const id = req.params.id;

        UserDb.findById(id)
        .then(data => {
            if(!data) {
                res.status(404).send({message: "Not found user with id = " + id});
            } else {
                res.send(data);
            }
        })
        .catch(error => {
            res.status(500).send({message: "Error retriving user with id = " +  id});
        });
    } else {
        UserDb.find()
        .then(user => {
            res.send(user);
        })
        .catch(error => {
            res.status(500).send({message: error.message || "Error occured while retriving user information"})
        });  
    }  
};

// pdate a new identified user by user id
exports.update = (req, res) => {
    debugger
    if(!req.body) {
        return res.status(400).send({message: "Data to update can not be empty"});
    }

    const id = req.params.id;
    UserDb.findByIdAndUpdate(id, req.body, {
        useFindAndModify: false
    })
    .then(data => {
        if(!data) {
            res.status(400).send({message: `Cannot update user with &{id}. Maybe user not found.`});
        } else {
            res.send(data);
        } 
    })
    .catch(error => {
        res.status(500).send({message: "Error update user information"});
    });    
};

// delete s user with speceified user id in the rquest
exports.delete = (req, res) => {
    debugger
    const id = req.params.id;
    
    UserDb.findByIdAndDelete(id)
    .then(data => {
        if(!data) {
            res.status(404).send({message: `Cannot delete with id ${id}. Maybe id is wrong.`});
        } else {
            res.send({message: "User deleted successfully!"});
        }
    })
    .catch(error => {
        res.status(500).send({message: "Could not delete user with id = " + id});
    });
};
