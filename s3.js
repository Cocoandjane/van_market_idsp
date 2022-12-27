import aws from 'aws-sdk'
import dotenv from "dotenv"
import crypto from "crypto"
import {promisify} from "util"
const randomBytes = promisify(crypto.randomBytes)

dotenv.config()

const region= process.env.REGION
const bucketName= process.env.BUCKET_NAME
const accessKeyId= process.env.ACCESS_KEY
const secretAccessKey= process.env.SECRET_KEY

const s3 = new aws.S3({
    region,
    accessKeyId,
    secretAccessKey,
    signatureVersion: "v4"
})

export  async function generateUploadURL(){
    const rawBytes = await randomBytes(16)
    const imageName = rawBytes.toString("hex")

    const params = ({
        Bucket: bucketName,
        Key: imageName,
        Expires:60

    })
    const uploadURL = await s3.getSignedUrlPromise("putObject", params)
    return uploadURL
}