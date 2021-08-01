const fileSCVService = require('../services/filecsvService.js');
const S3Service = require('../services/S3Service.js');
const SESService = require('../services/SESService.js');
const ReqFieldException = require('../exceptions/ReqFieldException');
const GeneralException = require('../exceptions/ExceptionGeneral');
const config = require('../config/config.js');

exports.processFileACC = async (req, res) => {
    const bucket = config.BUCKET_NAME;
    if (!req.body.email) {
        throw new ReqFieldException('email');
    }
    if (!req.body.nomFile) {
        throw new ReqFieldException('Nombre Archivo');
    }
    var hoy = new Date();
    var fecha =
        hoy.getDate() +
        '-' +
        hoy.getMonth() +
        '-' +
        hoy.getFullYear() +
        '-' +
        hoy.getHours() +
        '-' +
        hoy.getMinutes() +
        '-' +
        hoy.getSeconds();
    const arrayName = req.body.nomFile.split('.');
    const nomFileOut = arrayName[0] + '_out_' + fecha + '.csv';

    let valEmail = await SESService.ValidateMail(req.body.email);
    let resp = {};
    if (valEmail == true) {
        let valFile = await S3Service.GetFileS3(bucket, req.body.nomFile);
        let textCifrado = await fileSCVService.ProcessFile(valFile);
        let newFile = await S3Service.CreateFileS3(
            bucket,
            textCifrado,
            nomFileOut
        );
        let url = await S3Service.GetURLSigned(bucket, nomFileOut);
        let respMail = await SESService.SendMail(url, req.body.email);
        if (respMail) {
            resp = {
                etagFile: newFile,
                urlPreSigned: url,
                message: 'Email enviado con exito'
            };
        }
    } else {
        throw new GeneralException('Email no autorizado', 401);
    }
    res.status(200).send(resp);
};
