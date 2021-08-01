const aws = require('aws-sdk');
const config = require('../config/config.js');

aws.config.update({
    region: 'us-east-1'
});
const s3 = new aws.S3({
    apiVersion: '2006-03-01',
    accessKeyId: config.AWSID,
    secretAccessKey: config.AWSSECRET
});

exports.GetFileS3 = async (myBucket, myKey) => {
    const params = {
        Bucket: myBucket,
        Key: config.RUTAIN + myKey
    };
    let archivo = await s3.getObject(params).promise();
    return archivo.Body.toString('utf-8');
};

exports.CreateFileS3 = async (myBucket, text, myKey) => {
    let params = {
        Bucket: myBucket,
        Key: config.RUTAOUT + myKey,
        ACL: 'public-read',
        ContentType: 'text/csv',
        Body: text
    };
    let etag = await s3.putObject(params).promise();
    return etag;
};

exports.GetURLSigned = async (myBucket, myKey) => {
    var params = {
        Bucket: myBucket,
        Key: config.RUTAOUT + myKey,
        Expires: Number(process.env.TIMEEXPIRES)
    };
    let url = s3.getSignedUrl('getObject', params);
    return url;
};
