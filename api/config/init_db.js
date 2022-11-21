const Roles = require("../models/UsersRole")

const roles = ['customer', 'delivery', 'manager']

exports.setDefaultRoles = () => {
    try {
        roles.forEach((role) => {
            const saveRole = new Roles({ role })
            saveRole.save()
        })
    } catch(err) {
        next({
            error: true,
            status: 400, 
            message: "something went wrong " + err
        })
    }
}