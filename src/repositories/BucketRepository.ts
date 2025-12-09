import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "../config/aws/s3";
import { IBucketRepository } from "./Interfaces";
import path from "path";
import { v4 as uuidv4 } from "uuid";

export const BucketRepository = (): IBucketRepository => ({
    uploadFile: async (file: Express.Multer.File): Promise<string> => {
        const fileExtension = path.extname(file.originalname);
        const fileKey = `uploads/${uuidv4()}${fileExtension}`;

        const uploadParams = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: fileKey,
            Body: file.buffer,
            ContentType: file.mimetype,
        };

        await s3.send(new PutObjectCommand(uploadParams));

        const fileUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${fileKey}`;

        return fileUrl;
    },
});
