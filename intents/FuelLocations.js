const locations = require('./locations');
const mongo = require('mongodb').MongoClient
const axios = require('axios')


const FuelLocations = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
      handlerInput.requestEnvelope.request.intent.name === 'FuelLocations';
  },
  handle(handlerInput) {
      return mongo.connect(String(process.env.MONGO_CONNECT), (err, db) => {
        if (err) throw err
        if (!err) {
          var dbo = db.db('fuel-dev')
          dbo.collection('pfj_stations').find({}).toArray(function (err, result) {
            pfjs = result
            db.close()
            let locationSlot = handlerInput.requestEnvelope.request.intent.slots.Location.value
            encodeURI(locationSlot)
            let connectUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(locationSlot)}&key=${process.env.GOOGLE_MAPS_API_KEY}`
            let locationCoord, rtnStation, distance
            axios.get(connectUrl).then(function(myJson){
              myJson = myJson.data
              locationCoord = myJson.results[0].geometry.location
              let originAddress = myJson.results[0].formatted_address
              if(locationCoord) {
                rtnStation = NearestPilot(locationCoord.lat,locationCoord.lng, pfjs)
              }
              let directionParameters = encodeURI(`origin=${originAddress}&destination=${rtnStation.AddressLine1}${rtnStation.AddressLine2},${rtnStation.City},${rtnStation.State}`)
              let directionURL = `https://maps.googleapis.com/maps/api/directions/json?&${directionParameters}key=${process.env.GOOGLE_MAPS_API_KEY}`
                axios.get(directionURL).then(function(rtnJSON){
                  {
                    rtnJSON = rtnJSON.data
                    distance = rtnJSON.routes[0].legs[0].distance
                    if(rtnStation){
                      let speechText = `${rtnStation.Name} is the closest station. It is ${distance.text} away. The current gas price is ${rtnStation["Retail Price"]}`
                      console.log(speechText)
                      return handlerInput.responseBuilder
                      .speak(speechText)
                      .withSimpleCard('Road Rage', speechText)
                      .getResponse();
                    }
                  }
                })
            })
          })
        }
      })
  },
};

// Convert Degress to Radians
function Deg2Rad(deg) {
  return deg * Math.PI / 180;
}

function PythagorasEquirectangular(lat1, lon1, lat2, lon2) {
  lat1 = Deg2Rad(lat1);
  lat2 = Deg2Rad(lat2);
  lon1 = Deg2Rad(lon1);
  lon2 = Deg2Rad(lon2);
  var R = 6371; // km
  var x = (lon2 - lon1) * Math.cos((lat1 + lat2) / 2);
  var y = (lat2 - lat1);
  var d = Math.sqrt(x * x + y * y) * R;
  return d;
}

function NearestPilot(latitude, longitude, pfjs){
  var mindif = 99999;
  var closest;

  for (index = 0; index < pfjs.length; ++index) {
    var dif = PythagorasEquirectangular(latitude, longitude, pfjs[index]['Latitude'], pfjs[index]['Longitude']);
    if (dif < mindif) {
      closest = index;
      mindif = dif;
    }


  
}
// echo the nearest city
return pfjs[closest];
}

module.exports = FuelLocations;