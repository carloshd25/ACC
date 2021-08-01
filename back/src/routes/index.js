/*
 * Archivo principal de rutas.
 * Sobre este archivo no se deben definir rutas, sino importarlas de su propio archivo de rutas
 */
const processACC = require('./filecsvRouters.js');

module.exports = (router) => {
    processACC(router);
};
