import {status} from 'http-status'
import {User} from '../models/user.model.js'

export const authController={
    signUp: async(req,res,next)=>{
        try {
            const body=req.body
            const user=await User.findOne({email:body.email},"email_id",).exec()
            console.log(user);
            if(!user){
                const newUser=await User(body)
                await newUser.save()
                res.send(newUser)
            }
            res.send("User already exists!;");
            return;
        } catch (error) {
            next(error)
        }
    },

    singIn: async(req,res,next)=>{
        try {
            const body=req.body
        const user=await User.findOne({email:body.email})
        if(!user){
            res.send("User not found!")
            return;
        }

        const validaPass=await user.isValidPassword(body.password)

        console.log({validaPass});

        if(!validaPass){
            res.status(401).send("Password is not valid!")
            return;
        }
        res.send({
            message:"ok",
            date:user,
        })
        } catch (error) {
            next(error)
        }
    }
}