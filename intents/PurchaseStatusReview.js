const PurchaseStatusReviewIntent = {
    canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && handlerInput.requestEnvelope.request.intent.name === 'PurchaseStatusReview';
    },
    handle(handlerInput) {
      const speechText = 'Craig Stranger Thing rules';
      return handlerInput.responseBuilder
        .speak(speechText)
        .withSimpleCard('Hello World', speechText)
        .getResponse();
    },
  };

module.exports = PurchaseStatusReviewIntent;