const { createHash } = require('crypto');

exports.ProcessFile = async (textFile) => {
    const arrayFilas = textFile.split('\n');
    var cedula, cedulaSHA, filaFin;
    let textFin = 'cedula,cedula_hash,nombre\n';
    for (var i = 1; i < arrayFilas.length; i++) {
        cedula = arrayFilas[i].split(',');
        cedulaSHA = computeSHA256(cedula[0]);
        filaFin = cedula[0] + ',' + cedulaSHA + ',' + cedula[1];
        textFin = textFin + filaFin + '\n';
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
