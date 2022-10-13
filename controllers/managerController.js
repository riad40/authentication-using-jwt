// method : get
// URL: api/user/manager
// access : private
exports.managerDashboard = (req, res) => {
    res.send('This is manager dashboard')
}

// method : get
// URL: api/user/manager/me
// access : private
exports.mangerProfle = (req, res) => {
    res.send('This is manager profile')
}


