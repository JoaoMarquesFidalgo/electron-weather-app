const express = require('express');
const router = express.Router();

const CitiesController = require('../controlers/cities');

router.get('/api/cities', (req, res, next) =>   
{
    CitiesController.getCities(res, req)
});

module.exports =  router;