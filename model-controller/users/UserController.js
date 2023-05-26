import jwt from 'jsonwebtoken'
import UserSchema from "./UserSchema.js"
import nodemailer from 'nodemailer'
import ErrorHandler from '../../utils/ErrorHandler.js'
import UserFilter from './Userfilter.js'


// user add from admin panel
export const AddUser = async (req, res, next) => {
    try {
        // search username
        const user_login = await UserSchema.findOne({
            user_login: req.body.user_login
        });
        if (user_login) return next(new ErrorHandler("username alredy exist", 404))
        // search email
        const user_email = await UserSchema.findOne({
            user_email: req.body.user_email
        });
        if (user_email) return next(new ErrorHandler("email alredy exist", 404))

        const newUser = new UserSchema({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            user_email: req.body.user_email,
            user_login: req.body.user_login,
            password: req.body.password,
            user_role: req.body.user_role
        })
        const user = await newUser.save()

        const { _id, firstname, ...data } = user
        res.status(200).send({
            success: true,
            message: 'successfully insert user (' + user.firstname + ')'
         })

    } catch (err) {
        next(err)
    }
}
// user login
export const Login = async (req, res, next) => {
    try {
        const user = await UserSchema.findOne({ user_email: req.body.user_email }).select('password')
        if (!user) return next(new ErrorHandler('invalid email or password', 401))

        const match = await user.comparePassword(req.body.password)
        if (!match) return next(new ErrorHandler('invalid email or password', 401))

        const { _id, user_email, user_role } = await UserSchema.findOne({ _id: user._id })

        const accessToken = jwt.sign({ _id, user_email }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '15s'
        })
        const refreshToken = jwt.sign({ _id, user_email, user_role }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '1d'
        })
        await UserSchema.findByIdAndUpdate(_id, { refreshToken: refreshToken })

        res.cookie('refreshToken', refreshToken, {
            httpOnly: false,
            secure: false,
            maxAge: 24 * 60 * 60 * 1000
        });

        res.status(200).json(accessToken)
    } catch (error) {
        next(error)
    }
}
// get all user list for admin panel
export const AllUsers = async (req, res, next) => {
    try {
        const perPage = req.query.limit ? req.query.limit : 2
        const totalUsers = await UserSchema.countDocuments();
        const filterFatch = new UserFilter(UserSchema.find(), req.query).search().filter()
        let users = await filterFatch.query
        let filterUsers = users.length

        filterFatch.pagination(perPage)
        users = await filterFatch.query.clone()

        res.status(200).json({ totalUsers, filterUsers, users })
    } catch (err) {
        next(err)
    }
}
// profile
export const UserProfile = async (req, res, next) => {
    try {
        const users = await UserSchema.findOne({ _id: req.params.id })
        res.status(200).send(users)
    } catch (error) {
        console.log(error);
    }
}
// edit user from admin panel
export const EditUser = async (req, res, next) => {
    try {

        var query = { _id: req.params._id };
        const update = {
            user_role: req.body.user_role
        };
        const editUser = await UserSchema.findOneAndUpdate(query, update);

        res.status(200).json(
            {
                success: true,
                message: 'user update seccessfully',
                _id: editUser._id
            }
        )
    } catch (error) {
        next(error)
    }
}
// profile
export const UserData = async (req, res, next) => {
    try {
        const data = await UserSchema.findOne({ _id: req.params._id })
        res.status(200).json(data)
    } catch (error) {
        next(error)
    }
}






export async function sendEmail(subject) {

    const htmlToSend = '<div style="font-size: 14px; color: #686868; margin: 0 0 16px;">Please verify your email address</div><p style="font-weight: 400; font-size: 16px; color: #686868; margin: 0 0 16px;font-family: Montserrat, -apple-system, sans-serif;">Hello,<span style="font-weight: 500; color: #244875; font-family: Montserrat, -apple-system, sans-serif;"> John Doe!</span></p><p style="font-weight: 600; font-size: 20px; margin: 0 0 16px; color: #263238; ">Thanks for join our community! 👋</p><p style="font-size: 14px; margin: 0 0 24px; color: #686868;">Please verify your email address by clicking the below button and join our creative community, start exploring the resources or showcasing your work.</p><p style="color: #263238; margin: 0 0 24px; ">If you did not sign up to PixInvent, please ignore this email or contact us at <a href="mailto:support@example.com " style="color: #7367f0; text-decoration: none; ">support@example.com</a></p><a href="https://pixinvent.com?verification_url " style="display: block;text-align: center; font-weight: 600; font-size: 14px; padding: 16px 24px; color: #ffffff; text-decoration: none; background-color: #7367f0; justify-content: center;">Verify Email Now &rarr;</a><div style="background-color: #eceff1; height: 1px; line-height: 1px; margin: 24px;">&zwnj;</div><p style="margin: 0 0 16px;">Not sure why you received this email? Please<a href="mailto:support@example.com" style="color: #7367f0; text-decoration: none;"> let us know</a>.</p><p style="margin: 0 0 16px;">Thanks, <br>The PixInvent Team</p><div style="background-color: #eceff1; height: 1px; line-height: 1px; margin: 24px;">&zwnj;</div><p style="text-align: center;"><a href="" style="padding: 0 3px;color: #6495ed;">facebook</a><a href="" style="padding: 0 3px;color: #6495ed;">twitter</a><a href="" style="padding: 0 3px;color: #6495ed;">instragram</a></p><p style="color: #263238;">Use of our service and website is subject to our <a href="https://pixinvent.com/" style="color: #7367f0; text-decoration: none;"> Terms of Use </a> and <a href="https://pixinvent.com/" style="color: #7367f0; text-decoration: none;"> Privacy Policy </a>.</p>';

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "arupmaity550@gmail.com",
            pass: "tcpxvsyqvhgvvnfn"
        }
    });
    const mailOptions = {
        from: '"noreply@yourdomain.com" <noreply@yourdomain.com>',
        to: 'arupmaity079@gmail.com',
        subject: subject,
        html: htmlToSend
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

}
