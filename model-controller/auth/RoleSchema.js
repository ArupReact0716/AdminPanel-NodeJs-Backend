import mongoose from 'mongoose';

const RolesSchema = new mongoose.Schema(
    {
        role: {
            type: String,
            required: [true, 'product name empty']
        }
    },
    { timestamps: true }
);

export default mongoose.model('UserRoles', RolesSchema, 'User Roles')