const data = require('../small-database');

const InvoiceNotesIntent = {
    canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && handlerInput.requestEnvelope.request.intent.name === 'InvoiceNotes';
    },
    handle(handlerInput) {
        let slotInvoice = handlerInput.requestEnvelope.request.intent.slots.Invoice.value;

        var notes = '';
        var purchase = data.findIndex(x => x.invoices.findIndex(y => y.invoice_number == slotInvoice));
console.log(slotInvoice);
        //console.log(purchase);
        var i = data.filter(x => x.invoices.filter(y => y.invoice_number == slotInvoice.value))[0].invoices[0];
        if(i && i.notes){
            notes = i.notes;
        }
        else{
            notes = 'No invoice was found!';
        }

        return {"outputSpeech": {
        "type": "SSML",
        "ssml": `<speak>${notes}</speak>`
    }
    }
    },
  };

  module.exports = InvoiceNotesIntent