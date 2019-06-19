import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    img: string;
    state: boolean;
}

const UserSchema: Schema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    img: { type: String },
    state: { type: Boolean, default: true }
});

/* UserSchema.methods.toJSON = function(): any{
    let userObejct = this.toObject();
    delete userObejct.password;

    return userObejct;
} */

export default mongoose.model<IUser>('User', UserSchema);