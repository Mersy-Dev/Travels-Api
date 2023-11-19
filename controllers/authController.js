import User from "../models/UserModels.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

//user registration
export const register = async (req, res) => {
    try {

        //hash password 
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,            
            photo: req.body.photo
        })

        const user = await newUser.save();
        res.status(200).json({success:true, message: 'Successfully Created', data:user});
    } catch (error) {
        res.status(500).json(error, 'Failed to create user')
        
    }
}

//user login    
export const login = async (req, res) => {
    const email = req.body.email;

    try {
        const user = await User.findOne({email:email});

        //check if user doesn't exist
        if(!user){
            return res.status(404).json({success:false, message:'User not found'})
        }
        // if user exist then check password
        const validPassword = await bcrypt.compare(req.body.password, user.password);

        //check if password is incorrect
        if(!validPassword){
            return res.status(401).json({success:false, message:'Incorrect password or email'})
        }
        const {password, role, ...rest} = user._doc 

        //create token
        const token = jwt.sign({id:user._id, role:user.role}, process.env.JWT_SECRET_KEY, {expiresIn:'15d'});


        //set token in the browswer cookie and send the response to the frontend
        res.cookie('accessToken', token, {
            httpOnly:true, 
            expires: token.expiresIn,
        }).status(200).json({success:true, token,  message: 'Successfully Logged In', data:{
            ...rest},
            role,
        });
    } catch (error) {
        res.status(500).json({success:false, message:'Failed to login'}) 
        console.log(error);
        
    }
}