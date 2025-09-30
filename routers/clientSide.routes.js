const { Router } = require("express");

const clientCtl = require('../controllers/client.controller')
const clientRouter = Router();

clientRouter.get('/viewData', clientCtl.viewpage)

module.exports = clientRouter;