const aws = require('aws-sdk');
const config = require('../config/config.js');

aws.config.update({
    region: 'us-east-1'
});

const ses = new aws.SES({
    apiVersion: '2010-12-01',
    accessKeyId: config.AWSID,
    secretAccessKey: config.AWSSECRET
});

exports.ValidateMail = async (email) => {
    var params = {};
    const listEmail = await ses.listVerifiedEmailAddresses(params).promise();
    const listEmailText =
        listEmail.VerifiedEmailAddresses.toString().split(',');
    let respValEmail = false;
    for (var i = 0; i < listEmailText.length; i++) {
        if (listEmailText[i] == email) {
            respValEmail = true;
        }
    }
    return respValEmail;
};

exports.SendMail = async (url, email) => {
    var textoEmail =
        '<h1>Resultado de proceso</h1>' +
        '<p>' +
        'Buen día,<br><br>' +
        'Se envia documento resultante del proceso de encipción de cedula.<br>' +
        "Para descargar documento al click <a href='" +
        url +
        "'>acá</a><br><br>" +
        'Cordial saludo,<br><br>' +
        'Equipo TI<br><br><br>' +
        'Nota: Tiempo de vida del archivo: ' +
        process.env.TIMEEXPIRES +
        ' seg.';

    var params = {
        Destination: {
            ToAddresses: [email]
        },
        Message: {
            Body: {
                Html: {
                    Charset: 'UTF-8',
                    Data: textoEmail
                }
            },
            Subject: {
                Charset: 'UTF-8',
                Data: 'Archivo CSV cedulas SHA256'
            }
        },
        Source: config.EMAILFROM
    };
    try {
        await ses.sendEmail(params).promise();
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
};
