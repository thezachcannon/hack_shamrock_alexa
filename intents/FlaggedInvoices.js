const invoices = require('../small-database');
//const json = require('../database.json');

const FlaggedInvoicesIntentHandler = {
    canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && handlerInput.requestEnvelope.request.intent.name === 'FlaggedInvoices';
    },
    handle(handlerInput) {
      const flagged = [];
      invoices.forEach(i => {
          var f = i.invoices.filter(x => x.flagged == true);
          f.forEach(p => flagged.push(p));
      });
      //const speechText = 'Turn this mother to '+ flagged.length;

      let invoiceNumber = '';
      //const speechText = 'test ' + flagged[0].invoice_number;
      
      const speechText = 'You currently have ' + flagged.length + ' invoices.';
      var invoiceText = '';
      flagged.forEach(x => invoiceText += `<say-as interpret-as='characters'>${x.invoice_number}</say-as>` );
      return {"outputSpeech": {
        "type": "SSML",
        "ssml": `<speak>${speechText} ${invoiceText}</speak>`
    }
    }
    },
  };

  module.exports = FlaggedInvoicesIntentHandler