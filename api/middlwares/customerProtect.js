const User =  require('../models/User')
const Role =  require('../models/UsersRole')

const customerProtectRoute = async (req, res, next) => {
 
    // get the data
    const userData = await User.findById({_id: req.user._id})
    const role = await Role.findById({_id: userData.role[0]})

    const me = [userData, role]

    if(role.role == "customer") {
        req.me = me
        next()  
    } else {        
        res.status(400).json({
            error: true,
            message: 'Not Allowed'
        })
    }
}    

module.exports = customerProtectRoute