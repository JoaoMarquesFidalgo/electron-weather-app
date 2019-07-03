const app = require('express')();
const express = require('express');
const configuration = require('./config/config').config;

app.use('/', require('./config/routes'));
app.use(express.static('public'));

app.listen(configuration.port, () => 
{
    console.log(`Running on port ${configuration.port}`);
});

module.exports = { app };