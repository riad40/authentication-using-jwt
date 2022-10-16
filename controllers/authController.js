// method : post
// URL: api/auth/login

// const errorHandler = require("../middlwares/errorHandler")

// access : public
exports.login = (req, res, next) => {
    req.body.username !== '' && req.body.password !== '' ? req.body.username == 'root' && req.body.password == 'root' ? res.send(
        next({ 
            status: 200, 
            message: 'Athenticated succefully' 
        })
    ): res.send(
        next({ 
            status: 400, 
            message: 'Credintials are wrong' 
        })
    ) : res.send(
        next({ 
            status: 400, 
            message: 'All the fileds are required' 
        })
    )
}

// method : post
// URL: api/auth/register
// access : public
exports.register = (req, res, next) => {
    let emails = ['a1@gmail.com', 'a2@gmail.com', 'a3@gmail.com', 'a4@gmail.com']
    req.body.username !== '' && req.body.email !== '' && req.body.password !== '' && req.body.repeatpassword ? req.body.password == req.body.repeatpassword ? !emails.includes(req.body.email) ? res.send(
        next({ 
            status: 200, 
            message: 'Registerd succefully' 
        })
    ):  res.send(next({ 
            status: 400, 
            message: 'Email is already taken' 
        })
    ):  res.send(next({ 
            status: 400, 
            message: 'Passwords dosent match' 
        })
    ):  res.send(next({ 
            status: 400, 
            message: 'All the fileds are required' 
        })
    )
}

// method : post
// URL: api/auth/forgetpassword
// access : public
exports.forgetPassword = (req, res, next) => {
    req.body.email !== '' ? res.send(
        next({ 
            status: 200, 
            message: 'A reset password mail has been sent to your inbox' 
        })
    ):  res.send(
        next({ 
            status: 400, 
            message: 'email is required' 
        })
    )
}

// method : post
// URL: api/auth/resetpassword
// access : public
exports.resetPassword = (req, res, next) => {
    req.body.newpassword !== '' && req.body.repeatpassword !== '' ? req.body.newpassword == req.body.repeatpassword ? res.send(
        next({ 
            status: 200, 
            message: 'New password has been created succuefully' 
        })
    ):  res.send(
        next({ 
            status: 400, 
            message: 'Passwords dosent match' 
        })
    ):  res.send(
        next({ 
            status: 400, 
            message: 'All fileds are required' 
        })
    )
}

exports.idk = (req, res, next) => {
    next()
}
