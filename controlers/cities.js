const Cities = require('../models/cities');

function getCities (res, req)
{
    Cities.find().then((data) => 
    {   
        res.status(200).send({error: false, cities: data});
    }).catch((error) => 
    {
        res.status(200).send({error: true, ...error});
    })
}

module.exports = { getCities };