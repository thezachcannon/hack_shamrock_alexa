const enums = require('../enums');
const purchases = require('../small-database')
 
const PurchaseStatusReviewIntent = {
  canHandle(handlerInput) {
    let slotStatus = handlerInput.requestEnvelope.request.intent.slots.Status.value   
    let validSlot = false
    if (enums.PurchaseReviewValidStatusSlot.findIndex(function (row) {
        return row.toLowerCase() === slotStatus.toLowerCase()
      }) > -1) {
      validSlot = true
    }
    return validSlot && handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
      handlerInput.requestEnvelope.request.intent.name === 'PurchaseStatusReview';
  },
  handle(handlerInput) {
    let purchasesResult = []
    let total = 0;
    let slotStatus = handlerInput.requestEnvelope.request.intent.slots.Status.value   

    purchases.map((purchase) => {
          if(purchase.status && (purchase.status.toLowerCase() == slotStatus.toLowerCase())) {
            purchasesResult.push(purchase);
            total = total + purchase.purchase_total;
          }
    });

    if(total > 0){
      speechText = "Your total purchases " + slotStatus.toLowerCase() + " are $" + total;
    }
    else{
      speechText = 'There are no results for that status'
    }
    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('Road Rage', speechText)
      .getResponse();
  },
};

module.exports = PurchaseStatusReviewIntent;