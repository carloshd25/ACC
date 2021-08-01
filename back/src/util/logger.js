/*
 * Objeto utilizado para realizar el log de la aplicacion
 * con el fin de centralizar el debug
 */

const colors = require('colors');
const moment = require('moment');

// Se configura el tema de colors con proposito de tener
// una mejor visualizacion de los logs
colors.setTheme({
    info: 'green',
    help: 'magenta',
    warn: 'yellow',
    success: 'cyan',
    error: 'red'
});
const format = 'DD/MM/YYYY hh:mm:ss:SSS';

exports.writeError = (message) => {
    console.log(
        'ERROR:   '.error + moment().format(format) + '    ' + message.error
    );
};

exports.writeWarning = (message) => {
    console.log(
        'WARNING: '.warn + moment().format(format) + '    ' + message.warn
    );
};

exports.writeHelp = (message) => {
    console.log(
        'HELP:    '.help + moment().format(format) + '    ' + message.help
    );
};

exports.writeInfo = (message) => {
    console.log(
        'INFO:    '.info + moment().format(format) + '    ' + message.info
    );
};

exports.writeSuccess = (message) => {
    console.log(
        'SUCCESS: '.success + moment().format(format) + '    ' + message.success
    );
};
