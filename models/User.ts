import mongoose, {Schema, model, models } from "mongoose";
import bcrypt from "bcryptjs";


export interface IUser{
    email:String;
    password:String;
    _id?:mongoose.Types.ObjectId;
    createdAt:Date;
    updatedAt:Date;
} 


const userShcema  = new Schema<IUser>(
    {
        email:{
            type:String,
            required:true,
            unique:true,
        },
        
        password:{
            type:String,
            required:true,
            unique:true,
        }
    },
    {
        timestamps:true,
    }
);


userShcema.pre('save', async function(next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 12)
    }

    next();
})

const User = models?.User || model<IUser>("User", userShcema)

export default User;