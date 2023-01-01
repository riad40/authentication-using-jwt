const Roles = require("../models/UsersRole")

const roles = ['customer', 'delivery', 'manager']

exports.setDefaultRoles = async (next) => {
    try {
        const count = await Roles.countDocuments()
        if(count === 0) {
            roles.forEach( async (role) => {
                const saveRole = new Roles({ role })
                await saveRole.save()
            })
        }
    } catch(err) {
        process.exit(1)
    }
}