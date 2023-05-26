import mongoose from "mongoose";
// Mongodb connection
export const Connect = () => {
    mongoose.connect('mongodb://localhost:27017/webx-lorecafe')

    // mongoose.connect('mongodb://localhost:27017/webx-lorecafe', {
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true,
    //     useCreateIndex: true,
    // });
}
// mongodb connection check
mongoose.connection.on('disconnected', () => {
    console.log('Disconnected Mongodb');
})
mongoose.connection.on('connected', () => {
    console.log('Connected Mongodb');
})
