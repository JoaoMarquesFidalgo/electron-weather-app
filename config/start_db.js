// const mongoose = require('./config').mongoose;
// const Crawler = require('crawler');
const faker = require('faker');
const Cities = require('../models/cities');
const request = require('request');

// get shell command lines to either insert data with faker or customn data
const args = process.argv.slice(2);
args.forEach((val) => 
{
    switch (val) {
        case 'iddf':
            insertDummyDataWithFaker();
            break;
        case 'iddds':
            insertDummyDataWithDataSet();
            break;
        default:
            break;
    }
});
async function insertDummyDataWithDataSet()
{
    let docs = [];
    for (let i = 0; i < 20; i++)
    {
        let coordinates = [faker.random.number({min: -45, max: 45}), faker.random.number({min: -90, max: 90})]
        let urlString = `https://api.mapbox.com/geocoding/v5/mapbox.places/${coordinates[1]},${coordinates[0]}.json?access_token=pk.eyJ1IjoiZWxlY3RyaWNtb29uIiwiYSI6ImNqeG1zb2E1YzAyemEzY252YzVkYThtMTcifQ.DQe4E2O-FE8hAysN3S2bgw`;
        request(urlString, { json: true }, (err, res, body) => 
        {
            if (err) { return console.log(err); }
            if (body.features[0])
            {
                docs.push({
                    coordinates: body.features[0]['center'],
                    name: body.features[0]['text'],
                    geometry: body.features[0]['geometry']
                });
            }
            else
            {
                i --;
            }
        });
        await sleep(500);
    }
    Cities.insertMany(docs).then((result) => 
    {
        console.log('result', result);
    }).catch((error) => 
    {
        console.log('error', error);
    });
}
function insertDummyDataWithFaker()
{
    let docs = [];
    for (let i = 0; i < 100; i++)
    {
        // a new doc with a name and latitude and longitude (lat between -45 and 45 and long between -90 and 90)
        docs.push({
            name: faker.address.city(),
            coordinates: [faker.random.number({min: -90, max: 90}), faker.random.number({min: -180, max: 180})]
        });
    }
    Cities.insertMany(docs).then((result) => 
    {
        console.log(result);
    }).catch((error) => 
    {
        console.log(error);
    });
}
function sleep(ms){
    return new Promise(resolve =>
    {
        setTimeout(resolve, ms)
    });
}
/*
function insertDummyDataWithDataSet()
{
    const c = new Crawler({
        maxConnections : 10,
        // This will be called for each crawled page
        callback: (error, res, done) =>  
        {
            if(error)
            {
                console.log(error);
            }
            else
            {
                const $ = res.$;
                const fullText = $("td").text();
                let regexStr = fullText.match(/[a-z]+|[^a-z]+/gi);
                console.log(regexStr);
            }
            done();
        }
    });
    c.queue('https://developers.google.com/public-data/docs/canonical/countries_csv');
}
*/