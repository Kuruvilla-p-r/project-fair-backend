//import jsonwebtoken
const jwt = require('jsonwebtoken');

// login logic


//import userSchema or model
const users=require('../Models/userSchema')


// Register logic
exports.register = async(req,res)=>{
    console.log("Inside register method");
    // accept data from client
const {username,email,password} = req.body
console.log(username,email,password);
    //accept data client
    try{
        //check if the email is already registered
        const existingUser = await users.findOne({email})
        console.log(existingUser);
        if (existingUser) {
            res.status(406).json("User already registered")
        } else {
            const newUser = new users({
                username,
                email,
                password,
                github:"",
                livelink:"",
                profile:""
            })
            await newUser.save()
            res.status(200).json(newUser)
        }
    }
    catch(err){
        res.status(500).json("Register failed...")
    }
}

//login logic
exports.login = async(req,res)=>{
    //accept data from client
    const {email,password} = req.body
    try {
        // chheck if email  and password in db
        const existingUser = await users.findOne({email,password})
        if (existingUser) {
            const token = jwt.sign({userId: existingUser._id},"super2024")
            console.log(token);
            res.status(200).json({existingUser,token})
        } else {
            res.status(404).json("Invalid email or password")
        }
    } catch (err) {
        res.status(500).json("Login failed..."+err)
    }
}