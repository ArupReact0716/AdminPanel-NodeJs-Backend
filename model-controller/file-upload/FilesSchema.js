import mongoose from 'mongoose';

const UploadSchema = new mongoose.Schema(
    {
        filename: {
            type: String,
            required: true,
        },
        fileuse: [
            {
                type: mongoose.Schema.Types.ObjectId,
            }
        ],
        filetype: {
            type: String,
            required: true,
        },
        filesize: {
            type: Number,
            required: true,
        },
        filepath: {
            type: String,
            required: true,
        },
        destination: {
            type: String,
            required: true,
        },
        originalname: {
            type: String,
            required: true,
        }

    },
    { timestamps: true }
);

export default mongoose.model('UploadFiles', UploadSchema, 'Upload File')