const data = require('../small-database');

const FlaggedInvoicesIntent = {
    canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && handlerInput.requestEnvelope.request.intent.name === 'FlaggedInvoices';
    },
    handle(handlerInput) {
      const flagged = [];
      var speechText = '';
      var invoiceText = '';

      data.forEach(i => {
          var f = i.invoices.filter(x => x.flagged == true);
          f.forEach(p => flagged.push(p));
      });

      if(flagged.length > 0){
        const pluralizeInvoice = flagged.length > 1 ? 'invoices' : 'invoice'
        speechText = `You currently have ${flagged.length} flagged ${pluralizeInvoice}`;
        flagged.forEach(x => invoiceText += `<break time="0.5s"/><say-as interpret-as='characters'>${x.invoice_number}</say-as> ` );
      }
      else{
        speechText = 'There are currently no flagged invoices.';
      }
      return {"outputSpeech": {
        "type": "SSML",
        "ssml": `<speak>${speechText} ${invoiceText}</speak>`
        }
      }
    },
  };

  module.exports = FlaggedInvoicesIntent