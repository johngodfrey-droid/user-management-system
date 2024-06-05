const axios = require('axios');


exports.homeRoutes = (req, res) =>{
    // Make a get request to the API users
    axios.get(`${process.env.MONGO_URI}/api/users`)
        .then(function(response){
            res.render('index', {users: response.data});
        })
        .catch(err => {
            res.send(err)
        });
}

exports.add_user = (req, res) => {
    res.render('add_user');
}

exports.update_user = (req, res) => {
    axios.get(`${process.env.MONGO_URI}/api/users`, {params: {id: req.query.id}})
        .then(function(userdata){
            res.render("update_user", {user: userdata.data})
        })
    res.render('update_user');
}