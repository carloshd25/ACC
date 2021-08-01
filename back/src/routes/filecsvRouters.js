const contFileCSV = require('../controllers/filecsvController.js');

module.exports = (router) => {
    router.route('/fileACC/').post(contFileCSV.processFileACC);
};
