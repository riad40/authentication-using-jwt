const User = require('../models/User')
const Role = require('../models/UsersRole')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
// const { token } = require('morgan')

// method : post
// URL: api/auth/login
// access : public
exports.login = async (req, res, next) => {

    const user = await User.findOne({email: req.body.email})
    const token = jwt.sign({_id: user._id } , process.env.JWT_SECRET, { expiresIn: '24h' })
    // console.log(token)
    // sent user to route dependsnon the role 
    const role = await Role.findOne({_id: user.role[0]})

    req.body.username !== '' && req.body.password !== '' ? 
    user.email && await bcrypt.compare(req.body.password, user.password) ? 
    user.emailIsValid == false ? 
    res.send(
        next({
            status: 400, 
            message: 'Email is not validated' 
        })
    ):  res
            .cookie('accessToken', token)
            .send(`Hi ${user.username} u've just authenticated succefully`)
    :  res.send(
        next({ 
            status: 400, 
            message: 'Credintials are wrong' 
        })
    ):  res.send(
        next({ 
            status: 400, 
            message: 'All the fileds are required' 
        })
    )
}

// method : post
// URL: api/auth/register
// access : public
exports.register = async (req, res, next) => {
    // set up the email transporter
    const transporter = nodemailer.createTransport({
        service: process.env.SERVICE_TRANSPORTER,
        auth: {
            user: process.env.EMAIL, 
            pass: process.env.PASSWORD
        }, 
        tls: {
            rejectUnauthorized: false
        } 
    })
    // verify if email already taken
    const emailTaken = await User.findOne({email: req.body.email})
    // hash the password
    const hashPassword = await bcrypt.hash(req.body.password, await bcrypt.genSalt(10))
    let roles = await Role.findOne({role: req.body.role})
    roles == null ? roles = {
        _id: '634d5416feb86a7fa621a6ee',
        role: "customer"
    } : roles = roles
    // register user method
    const registerUser = async () => {
        const user = new User ({
            username: req.body.username,
            email: req.body.email,
            password: hashPassword,
            role: roles._id
        })
        // get roles
        try {
            const userRegister = await user.save()
            // token verification
            const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, { expiresIn: '1h' })    
            // send verification email
            const mailContent = {
                from: process.env.EMAIL,
                to: user.email,
                subject: 'Verify Your Email',
                html: `<h2>Hi Please Verify Your Email<a href="http://localhost:3000/api/auth/register/verify/${token}">here</a></h2>`
            }
            transporter.sendMail(mailContent, (err) => !err ? console.log('mail just sent to '+user.email) : console.log(err))
            res.send({ userRegister })
        } catch (error) {
            res.send(next({
                status: 400, 
                message: "something went wrong " + error
            }))
        }
    }
    // make register
    req.body.username !== '' && req.body.email !== '' && req.body.password !== '' && req.body.repeatpassword ? req.body.password == req.body.repeatpassword ? !emailTaken ? registerUser() 
    :   res.send(next({ 
            status: 400, 
            message: 'Email is already taken' 
        })
    ):  res.send(next({ 
            status: 400, 
            message: 'Passwords dosent match' 
        })
    ):  res.send(next({ 
            status: 400, 
            message: 'All the fileds are required',
        })
    )
}

// method : post
// URL: api/auth/register/verify/:token
// access : public
exports.verifyEmail = async (req, res) => {
    const token = req.params.token
    const userData = jwt.verify(token, process.env.JWT_SECRET)
    const userId = userData._id
    const allUserData = await User.findOne({_id: userId})
    allUserData.emailIsValid == true ? res.send('email already valide') :
    User.updateOne({_id: userId}, { $set: { emailIsValid: true } })
        .then(() => {
            res.send('email verified succefully') && console.log('email verified succefully')
        }).catch((err)=> {
            console.log(err) && res.send('something went wrong '+err)
        
    })
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
