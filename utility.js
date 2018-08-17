const data = require("./small-database")
const enums = require('./enums')

// data.map((purchase)=> {
//     var randStatus = enums.PurchaseReviewValidStatusSlot[Math.floor(Math.random() * enums.PurchaseReviewValidStatusSlot.length)];
//     purchase.status = randStatus
// })


let phraseArray = ["Don't Pick Corn Past The Apples Day", "Your Invoice is too bigly", "Invoice can't be read do to Covfefe stain", "No documents uploaded to support invoice", "Do something that's really long too", "This is a copy of your report card not an invoice", "Dude Where Is My Car", "Gotta Catch Em All"]

// for (var x = 0; x < 8; x++) {
//     if (data[Math.floor(Math.random() * data.length)].invoices[0]) {
//         data[Math.floor(Math.random() * data.length)].invoices[0].notes = phraseArrays[x]
//         console.log(data[Math.floor(Math.random() * data.length)].invoices[0].notes = phraseArrays[x])
//     }
//     else
//     {
//         x = x-1
//     }
// }

data.map((purchases) => {
    purchases.invoices.map((invoice)=> {
        if(invoice.flagged) {
            invoice.notes = phraseArray[Math.floor(Math.random() * phraseArray.length)]
            console.log(invoice.notes)
        }
    })
})



console.log(JSON.stringify(data))