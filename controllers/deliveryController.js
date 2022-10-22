// method : get
// URL: api/user/delivery/me
// access : private
exports.deliveryProfle = (req, res) => {
    
    const me = req.me

    res.status(200).json({
        error: false,
        message: `Hi ${me[0].username}, Your Role Is ${me[1].role}`
    })

}
