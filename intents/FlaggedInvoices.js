const FlaggedInvoicesIntentHandler = {
    canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && handlerInput.requestEnvelope.request.intent.name === 'FlaggedInvoices';
    },
    handle(handlerInput) {
      const speechText = 'Turn this mother to 11!';
  
      return handlerInput.responseBuilder
        .speak(speechText)
        .withSimpleCard('Flagged Invoices', speechText)
        .getResponse();
    },
  };

  module.exports = FlaggedInvoicesIntentHandler