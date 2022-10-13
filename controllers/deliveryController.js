// method : get
// URL: api/user/delivery
// access : private
exports.deliveryDashboard = (req, res) => {
    res.send('This is delivery guy dashboard')
}

// method : get
// URL: api/user/delivery/me
// access : private
exports.deliveryProfle = (req, res) => {
    res.send('This is delivery guy profile')
}