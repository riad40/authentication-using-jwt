// method : post
// URL: api/auth/login
// access : public
exports.login = (req, res) => {
    res.send(req.body)
}

// method : post
// URL: api/auth/register
// access : public
exports.register = (req, res) => {
    res.send(req.body)
}

// method : post
// URL: api/auth/forgetpassword
// access : public
exports.forgetPassword = (req, res) => {
    res.send(req.body)
}

// method : post
// URL: api/auth/resetpassword
// access : public
exports.resetPassword = (req, res) => {
    res.send(req.body)
}