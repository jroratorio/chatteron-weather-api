var weather = require('weather-js');
var NodeGeocoder = require('node-geocoder');
var config = require('./config.json');
 
var options = {
  provider: 'google', 
  httpAdapter: 'https', // Default
  apiKey: config.googleApi,
  formatter: null         // 'gpx', 'string', ...
};

var findTemperatureByCity = function(city, unit, originalres) {
    if(unit !== 'C' || unit !== 'F'){
        unit === 'F';//setting default unit as F
    }
    weather.find({search: city, degreeType: unit}, function(err, result) {
        if(err) {
            originalres.json({ status: 400, err: 'Temperature fetch error ' + err });
        } else {
            originalres.json({
                status: 200,
                city: result[0].location.name,
                currenttemp: result[0].current.temperature,
                unit: result[0].location.degreetype
            });
        }  
    });
};

var findCityByCoordinates = function( lat, long, unit, originalres ){
    var geocoder = NodeGeocoder(options);
    geocoder.reverse({lat:lat, lon:long}, function(err, res) {
        if(err){
            originalres.json({ status: 400, err: 'Google Geocoder error ' + err.message });
        }
        else {
            var city = res[0].city;
            if(city){
                findTemperatureByCity( city, unit, originalres );
            }
            else{
                originalres.json({ status: 400, err: 'Invalid city coordinates' });
            }                
        }        
    });    
};

var findTemperatureByCoordinates = function(lat, long, unit, originalres) {
    findCityByCoordinates(lat, long, unit, originalres);    
};

module.exports = findTemperatureByCoordinates ;





