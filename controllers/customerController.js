// method : get
// URL: api/user/manager
// access : private
exports.customerDashboard = (req, res) => {
    res.send('This is customer dashboard')
}

// method : get
// URL: api/user/manager/me
// access : private
exports.customerProfle = (req, res) => {
    res.send('This is customer profile')
}