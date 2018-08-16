const FuelLocationsIntent = {
    canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && handlerInput.requestEnvelope.request.intent.name === 'FuelLocationsIntent';
    },
    handle(handlerInput) {
      const speechText = 'All the fuel locations';
      return handlerInput.responseBuilder
        .speak(speechText)
        .withSimpleCard('Hello World', speechText)
        .getResponse();
    },
  };

module.exports = FuelLocationsIntent;