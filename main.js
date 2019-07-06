const electron = require('electron');
const path = require('path');
require('./index.js');
const request = require('request');
const citiesController = require('./controlers/cities');

const { BrowserWindow, app, Menu, dialog, ipcMain } = electron;

let mainWindow = null;
let data = null;

app.on('ready', () => 
{
    mainWindow = new BrowserWindow({
        webPreferences: 
        {
            nodeIntegration: true
        }
    });
    mainWindow.setTitle('Project weather app');
    mainWindow.setIcon(path.normalize(`${__dirname}/public/assets/images/logo/logo.png`));
    mainWindow.loadURL(path.normalize(`${__dirname}/page/index.html`));
    mainWindow.show();
    const urlString = 'http://localhost:10011/api/cities';
    
    request(urlString, { json: true }, (err, res, body) => 
    {
        if (err) console.log(err);
        data = body;
    });

    mainWindow.webContents.on('did-finish-load', () =>
    {
        mainWindow.webContents.send('dataFromLocalAPI', data);
    });
});