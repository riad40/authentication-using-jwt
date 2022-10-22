const User = require('../models/User')
const Role = require('../models/UsersRole')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')

// method : post
// URL: api/auth/register
// access : public
exports.register = async (req, res, next) => {
    // verify if email already taken
    const emailTaken = await User.findOne({email: req.body.email})
    // hash the password
    const hashPassword = await bcrypt.hash(req.body.password, await bcrypt.genSalt(10))
    // get role id
    let userRole = await Role.findOne({role: req.body.role})
    // set a default role if the user didn't set the role
    let defaultRole = await Role.findOne({role: 'customer'})
    if(userRole == null) { 
        userRole = {
            _id: defaultRole._id,
            role: "customer"
        }
    }  
    // make register
    if(req.body.username !== '' && req.body.email !== '' && req.body.password !== '' && req.body.repeatpassword) { 
        if(req.body.password == req.body.repeatpassword) {
            if(!emailTaken) {
                const user = new User ({
                    username: req.body.username,
                    email: req.body.email,
                    password: hashPassword,
                    role: userRole._id
                })
                try {
                    const userRegister = await user.save()
                    // token for email verification
                    const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, { expiresIn: '1h' })  
                    sendEmail(user.email, token, 'auth/register/verify', 'Verify Your Email ')  
                    res.send({ 
                        message: "registerd succefully", 
                        userRegister 
                    })
                } catch (error) {
                    res.send(next({
                        status: 400, 
                        message: "something went wrong " + error
                    }))
                }
            } else {
                res.send(next({ 
                    status: 400, 
                    message: 'Email is already taken' 
                })
            )}
        } else {
                res.send(next({ 
                    status: 400, 
                    message: 'Passwords dosent match' 
                })
        )}
    } else {
        res.send(next({ 
            status: 400, 
            message: 'All the fileds are required',
        })
    )}  
}

// send email function 

const sendEmail = (email, token, route, mailGoal) => {
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
    // send verification email
    const mailContent = {
        from: mailGoal + process.env.EMAIL,
        to: email,
        subject: mailGoal,
        html: `<p>Hi ${mailGoal} <a href="http://localhost:3000/api/${route}/${token}">here</a></h2>`
    }
    transporter.sendMail(mailContent, (err) => !err ? console.log('mail just sent to ' + email) : console.log(err))
}

// method : post
// URL: api/auth/register/verify/:token
// access : public
exports.verifyEmail = async (req, res, next) => {

    const token = req.params.token

    const userData = jwt.verify(token, process.env.JWT_SECRET)

    const allUserData = await User.findOne({_id: userData._id})

    allUserData.emailIsValid == true ? res.send('email already valide') :
    User.updateOne({_id: userData._id }, { $set: { emailIsValid: true } })
        .then(() => {
            res.send(
                next({ 
                    status: 200, 
                    message: 'A reset password mail has been sent to your inbox' 
                })
            )
        }).catch((err)=> {
            console.log(err) && res.send('something went wrong '+err)
        
    })
}

// method : post
// URL: api/auth/login
// access : public
exports.login = async (req, res, next) => {

    const user = await User.findOne({email: req.body.email})
    if(!user) { 
        res.send(next({ 
                status: 400, 
                message: "email dosen't exist"  
            })
        )
    } else {

        const token = jwt.sign({_id: user._id } , process.env.JWT_SECRET, { expiresIn: '24h' })
    
        if(req.body.email !== '' && req.body.password !== ''){
            if(user.email && await bcrypt.compare(req.body.password, user.password)) {
                if(user.emailIsValid) {
                    res
                        .cookie('accessToken', token)
                        .json({ 
                            message: `Hi ${user.username} u've just logged in succefully`, 
                            token
                        })
                } else {
                    res.send(next({
                            status: 400, 
                            message: 'Email is not validated, Check your inbox to validate your email' 
                        })
                    )
                }
            } else {
                res.send(
                    next({ 
                        status: 400, 
                        message: 'Credintials are wrong' 
                    })
                )
            }
        } else {
            res.send(
                next({ 
                    status: 400, 
                    message: 'All the fileds are required' 
                })
            )
        }
    }

}

// method : post
// URL: api/auth/forgetpassword
// access : public
exports.forgetPassword = async (req, res, next) => {

    if(req.body.email !== '') {

        const user = await User.findOne({email: req.body.email})

        // generate token
        const token = jwt.sign({_id: user._id } , process.env.JWT_SECRET, { expiresIn: '24h' })
        // send forget password email
        sendEmail(user.email, token, 'auth/resetpassword', 'Verify Your Email To Reset Password ')  
        res.send(
            next({ 
                status: 200, 
                message: 'A reset password mail has been sent to your inbox' 
            })
        )
    }
    else {
        res.send(
            next({ 
                status: 400, 
                message: 'email is required' 
            })
        )
    }
}

// method : post
// URL: api/auth/resetpassword
// access : public
exports.resetPassword = async (req, res, next) => {

    if(req.body.newpassword !== '' && req.body.repeatpassword !== '') {

        if (req.body.newpassword !== req.body.repeatpassword) {  
            res.send(
                next({ 
                    status: 400, 
                    message: 'Passwords dosent match' 
                })
            )
        }

        const token = req.params.token

        const userData = jwt.verify(token, process.env.JWT_SECRET)

        const pwd = await bcrypt.hash(req.body.newpassword, await bcrypt.genSalt(10))

        User.updateOne({_id: userData._id}, { $set: { password: pwd} })
            .then(() => {
                res.send(next({ 
                        status: 200, 
                        message: 'Password Changed Succefully' 
                    })
                )
            }).catch((err)=> {
                console.log(err) && res.send('something went wrong ' + err)
            })
    } else {
        res.send(
            next({ 
                status: 400, 
                message: 'All fileds are required' 
            })
        )
    }  
}

exports.idk = (req, res, next) => {
    next()
}
