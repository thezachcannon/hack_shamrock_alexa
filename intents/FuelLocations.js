const locations = require('./locations');
const mongo = require('mongodb').MongoClient
const axios = require('axios')


const FuelLocations = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
      handlerInput.requestEnvelope.request.intent.name === 'FuelLocations';
  },
  handle(handlerInput) 
  {
    let rtnStation = {
      Name: 'Pilot Flying J Travel Center',
      "Retail Price": "$2.78"  
    }
    let distance = {text: '3.69 Miles'}
    let speechText = `${rtnStation.Name} is the closest station. It is ${distance.text} away. The current gas price is ${rtnStation["Retail Price"]}`
    return handlerInput.responseBuilder
    .speak(speechText)
    .withSimpleCard('Road Rage', speechText)
    .getResponse();
   
}}

module.exports = FuelLocations;