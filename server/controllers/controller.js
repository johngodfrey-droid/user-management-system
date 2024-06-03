var UserDB = require('../models/model');

// create and save new user

exports.create = (req, res) => {
    // validate request
    if(!req.body) {
        res.status(400).send({message: "Content cannot be empty"});
        return;
    } 

    // new user
    const user = new UserDB({
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        status: req.body.status
    });

    // save user in database
    user
        .save(user)
        .then(data => {
            // res.send(data)
            res.redirect('/add-user')
        })

        .catch(err => {
            res.status(500).send({
               message: err.message || "Some error occured while creating a create operation" 
            });
        });
}
// retrieve and return all users / single user

exports.find = (req, res) => {

    if (req.query.id) {
        const id = req.query.id;
        UserDB.findById(id)
            .then(data => {
                if(!data) {
                    res.status(404).send({message: `Cannot find user with id=${id}.`});
                } else {
                    res.send(data);
                }
            })
            .catch(err => {
                res.status(500).send({message: "Error retrieving user with id=" + id});
                });
    } else {
        UserDB.find()
        .then(user=>{
            res.send(user)
        })
        .catch(err=> {
            res.status(500).send({message:err.message || "An Error Occured while retrieving user information"})
        })
    }
}
//  update and identify user by user ID

exports.update = (req, res) => {
    if(!req.body) {
        return res
            .status(400)
            .send({message: "Data to update cannot be empty"});
    }

    const id = req.params.id;
    UserDB.findByIdAndUpdate(id, req.body, {useFindAndModify: false})
    .then(data => {
        if(!data) {
            res.status(404).send({message: `Cannot update user with ${id}. Maybe user not found`})
        } else {
            res.send(data)
        }
    })
    .catch(err =>{
        res.status(500).send({message: "Error updating user information" + err.message});
    });

}
//  Delete a user with a specified user ID in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    UserDB.findByIdAndDelete(id)
    .then(data => {
        if(!data){
            ress.status(404).send({message: `Cannot delete with id ${id}. Check ID again`})
        } else {
            res.send({
                message: "User was deleted successfully"
            })
        }
    })
    .catch(err => {
        res.status(500).send({message: `Could not delete user with ID = ${id}`})
    })
}