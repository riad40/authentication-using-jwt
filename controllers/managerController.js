// method : get
// URL: api/user/manager/me
// access : private
exports.mangerProfle = (req, res) => {

    const me = req.me

    res.status(200).json({
        error: false,
        message: `Hi ${me[0].username}, Your Role Is ${me[1].role}`
    })

}
