API endpoints:

GET /api/gettemp?lat=[lat]&long=[long]&unit=[unit]
POST /api/gettemp, payload= lat=[lat], long=[long], unit=[unit]

[lat] = latitude coordinates, rounded up to two decimal places.
[long] = longitude coordinates, rounded up to two decimal places.
[unit] = C/c for Celsius, F/f for Fahrenheit.

Omission of lat/long defaults to lat/long of London.
Omission of unit, defaults to Celsius.

P.S. Add /lib/config.json with
{
  "googleApi":"YOUR GOOGLE MAPS API KEY"
} 
