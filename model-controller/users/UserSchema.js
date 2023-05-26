import mongoose from 'mongoose';
import bcrypt from "bcrypt";
const SALT_WORK_FACTOR = 10;

const UserSchema = new mongoose.Schema(
    {
        firstname: {
            type: String,
            required: true,
        },
        lastname: {
            type: String,
        },
        user_email: {
            type: String,
            required: true,
            unique: true
        },
        user_login: {
            type: String,
            required: true,
            unique: true,
            select: false
        },
        password: {
            type: String,
            required: true,
            select:false
        },
        user_role: {
            value: {
                type: String,
                default: 'subscriber'
            },
            label: {
                type: String,
                default: 'Subscriber'
            }
        },
        user_status: {
            type: String,
            default: 'active',
        },
        refreshToken: {
            type: String,
            default: null
        }
    },
    { timestamps: true }
);
UserSchema.pre('save', function (next) {
    const user = this
    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);
            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});
UserSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model('User', UserSchema, 'User Details')
