let asyncHandler = require("express-async-handler")
const User = require("../model/User")
let bcrypt = require("bcryptjs")
let jwt = require("jsonwebtoken")

let userController = {
    //! register
    register: asyncHandler(async(req,res)=>{
        let {username, email, password} = req.body
        //* validate the user
        if(!username || !email || !password){
            throw new Error("All fields are required.")
        }
        //* check for existence
        let userExists = await User.findOne({email})
        if(userExists){
            throw new Error("User already exists.")
        }
        //* hash the used password
        let salt = await bcrypt.genSalt(10)
        let hashedPassword = await bcrypt.hash(password, salt)
        //* create the user
        let userCreated = await User.create({
            username:username, email:email, password:hashedPassword
        })
        //* send the response
        res.json({
            message:"User created successfully."
        })
    }),
    //! login
    login: asyncHandler(async(req,res)=>{
        let {email, password} = req.body
        //* check the user data
        let userExists = await User.findOne({email})
        if(!userExists){
            throw new Error("User doesn't exists.")
        }
        //* compare the passwrord
        let isMatch = await bcrypt.compare(password, userExists.password)
        if(!isMatch){
            throw new Error("Invalid login credentials.")
        }
        //* generate a web token
        let token = jwt.sign({id:userExists._id},"expense-tracker",{expiresIn:"15m"})
        //* send the response
        res.json({
            message:"Login success.",
            token:token,
            username:userExists.username,
            email:userExists.email
        })
    }),
    //! profile
    profile: asyncHandler(async(req,res)=>{
        //* find the user
        // console.log(req.user)
        let user = await User.findById(req.user)
        if(!user){
            throw new Error("User not found.")
        }
        //* send the response
        res.json({
            username:user.username,
            email:user.email
        })
    }),
    //! update profile
    updateProfile: asyncHandler(async(req,res)=>{
        let {newEmail, newUsername} = req.body
        //* find the user
        let updatedUser = await User.findByIdAndUpdate(req.user,
            {username:newUsername, email:newEmail},{new:true}
        )
        //* send the response
        res.json({
            message:("Profile updated successfully.",updatedUser)
        })
    }),
    //! update password
    updatePassword: asyncHandler(async(req,res)=>{
        let {newPassword} = req.body
        //* find the user and update the password
        let salt = await bcrypt.genSalt(10)
        let hashedPassword = await bcrypt.hash(newPassword, salt) 
        await User.findByIdAndUpdate(req.user,
            {password:hashedPassword},{new:true}
        )
        //* send the response
        res.json({
            message:"Password changed successfully."
        })
    })
}

module.exports = userController