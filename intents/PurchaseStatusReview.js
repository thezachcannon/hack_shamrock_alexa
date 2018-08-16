const PurchaseStatusReviewIntent = {
    canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && handlerInput.requestEnvelope.request.intent.name === 'PurchaseStatusReview';
    },
    handle(handlerInput) {
      const speechText = 'Yo Yo Yo, it is Alexa';
      return handlerInput.responseBuilder
        .speak(speechText)
        .withSimpleCard('Road Rage', speechText)
        .getResponse();
    },
  };

module.exports = PurchaseStatusReviewIntent;