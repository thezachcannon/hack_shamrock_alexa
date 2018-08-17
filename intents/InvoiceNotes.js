const data = require('../small-database');

const InvoiceNotesIntent = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
            handlerInput.requestEnvelope.request.intent.name === 'InvoiceNotes';
    },
    handle(handlerInput) {
        let notes = ''
        let invoiceSlot = handlerInput.requestEnvelope.request.intent.slots.Invoice.value;

        data.map((purchase) => {
            let indexNo = purchase.invoices.findIndex((invoice) => invoice.invoice_number === invoiceSlot);
            if (indexNo > -1) {
                if (purchase.invoices[indexNo].notes) {
                    notes = purchase.invoices[indexNo].notes
                } else {
                    notes = 'There are no notes for this invoice.'
                }
            }
        })

        notes = notes == '' ? 'Invoice was not found' : notes
        return {
            "outputSpeech": {
                "type": "SSML",
                "ssml": `<speak>${notes}</speak>`
            }
        }
    },
};

module.exports = InvoiceNotesIntent