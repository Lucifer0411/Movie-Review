import { User } from "../models/userModel.js"
import asyncHandler from 'express-async-handler'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const registerUser=asyncHandler(async(req,res)=>{
    const {name, password, email}=req.body;
    if(!name || !password || !email){
        res.status(404)
        throw new Error("please enter all the fields")
    }
     // Check if user exists
    const userExists=await User.findOne({email});
    if(userExists){
        res.status(400)
        throw new Error("User already exists")
    }
    //handle bcrypt for generating encrypted password
    const salt=await bcrypt.genSalt(10)
    const hashedPassword=await bcrypt.hash(password,salt)

    // Create user
    const user=await User.create({
        name,
        email,
        password:hashedPassword
    })

    if(user){
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            // Create JWT token
            token:generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error("Invalid user data")
    }
})

export const loginUser=asyncHandler(async(req,res)=>{
    const {email,password}=req.body
    if(!password || !email){
        res.status(404)
        throw new Error("Please enter all the fields")
    }
    // Find user by email
    const userExists=await User.findOne({email});
    if(userExists && (await bcrypt.compare(password,userExists.password))){
        res.status(201).json({
            _id:userExists.id,
            name:userExists.name,
            email:userExists.email,
            token:generateToken(userExists._id)
        })
    }
    else{
        res.status(400)
        throw new Error("Invalid credentials")
    }
})

export const updateUserProfile=asyncHandler(
    async (req, res) => {
        const { name, email, password, newPassword } = req.body;
      
        try {
          // Find the user by ID
          const user = await User.findById(req.params.userId);
          
          if (!user) {
            return res.status(404).json({ error: 'User not found' });
          }
      
          // Check if the provided current password is correct
          const isPasswordValid = await bcrypt.compare(password, user.password);
          if (!isPasswordValid) {
            return res.status(400).json({ error: 'Current password is incorrect' });
          }
      
          // If new password is provided, hash it
          let updatedFields = { name, email };
          if (newPassword) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(newPassword, salt);
            updatedFields.password = hashedPassword;
          }
      
          // Update user profile
          const updatedUser = await User.findByIdAndUpdate(req.params.userId, updatedFields, { new: true });
      
          res.json(updatedUser);
        } catch (error) {
          res.status(500).json({ error: 'Server error' });
        }
      }
)


const generateToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:'30d'
    })
}

