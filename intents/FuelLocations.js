const locations = require('./locations');

const FuelLocationsIntent = {
    canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && handlerInput.requestEnvelope.request.intent.name === 'FuelLocationsIntent';
    },
    handle(handlerInput) {

      const random = Math.floor(Math.random() * 10);
      const speechText = 'The nearest fuel station is ' + locations[random].name + ' located at ' + locations[random].address + ' ' + locations[random].city + ' ' + locations[random].state + ' ' + locations[random].zip;
      return handlerInput.responseBuilder
        .speak(speechText)
        .withSimpleCard('Road Rage', speechText)
        .getResponse();
    },
  };

module.exports = FuelLocationsIntent;