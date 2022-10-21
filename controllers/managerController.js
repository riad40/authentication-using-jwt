const User = require('../models/User')
const Role = require('../models/UsersRole')
const jwt = require('jsonwebtoken')

// method : get
// URL: api/user/manager/me
// access : private
exports.mangerProfle = async (req, res) => {

    const userData = await User.findById({_id: req.user._id})
    const role = await Role.findById({_id: userData.role[0]})
    
    role.role == "manager" ? res.send(`Hi ${userData.username}, Your Role Is ${role.role}`) : res.send('Access Denied')
}


