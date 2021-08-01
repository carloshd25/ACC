const express = require('express');
const config = require('./src/config/config');
const errorMiddleware = require('./src/middlewares/errorMiddleware');
const bodyParser = require('body-parser');
const routing = require('./src/routes');
const logger = require('./src/util/logger');
const cors = require('cors');
require('express-async-errors');

const app = express();
const router = express.Router();

app.use(
    bodyParser.urlencoded({
        extended: true
    })
);

app.use(bodyParser.json());

routing(router);
app.use(cors({ origin: '*' }));
app.use('/api/v1', router);
app.use(errorMiddleware);

app.listen(config.PORT, () => {
    logger.writeSuccess(
        `${config.APPLICATION_NAME} ejecutandose en el puerto ${config.PORT}`
    );
});
