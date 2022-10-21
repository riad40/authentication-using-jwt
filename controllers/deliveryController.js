const User = require('../models/User')
const Role = require('../models/UsersRole')
const jwt = require('jsonwebtoken')

// method : get
// URL: api/user/delivery/me
// access : private
exports.deliveryProfle = async (req, res) => {

    const userData = await User.findById({_id: req.user._id})
    const role = await Role.findById({_id: userData.role[0]})
    
    role.role == "delivery" ? res.send(`Hi ${userData.username}, Your Role Is ${role.role} Guy`) : res.send('Access Denied') 
}