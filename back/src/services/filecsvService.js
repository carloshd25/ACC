const { createHash } = require('crypto');
const GeneralException = require('../exceptions/ExceptionGeneral');

exports.ProcessFile = async (textFile) => {
    const arrayFilas = textFile.split('\n');
    var cedula, cedulaSHA, filaFin;
    let textFin = 'cedula,cedula_hash,nombre\n';
    cedula = arrayFilas[0].split(',');
    if(cedula.length == 2 && cedula[1].includes('nombre') && cedula[0].includes('cedula')){
        for (var i = 1; i < arrayFilas.length; i++) {
            cedula = arrayFilas[i].split(',');
            if(cedula.length == 2){
                cedulaSHA = computeSHA256(cedula[0]);
                filaFin = cedula[0] + ',' + cedulaSHA + ',' + cedula[1];
                textFin = textFin + filaFin + '\n';
            } else {
                throw new GeneralException('Archivo no tiene estructura valida, error en la fila: ' + i + 1, 401);
            }
        }
    } else {
        throw new GeneralException('Archivo no tiene estructura valida, encabezado con error', 401);
    }
    return textFin;
};

function computeSHA256(lines) {
    const hash = createHash('sha256');
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (line === '') continue;
        hash.write(line);
    }
    return hash.digest('base64');
}
