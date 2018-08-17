const data = require("./small-database")
const mongo = require('mongodb').MongoClient

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
// let count = 0;
// data.map((purchases) => {
//     count ++
//     purchases.invoices.map((invoice)=> {
//         if(invoice.flagged) {
//             invoice.invoice_number = "RR" + count
            
//             invoice.notes = phraseArray[Math.floor(Math.random() * phraseArray.length)]
//             console.log(invoice.notes)
//         }
//     })
// })
let mongoConnect
mongo.connect('mongodb://qb07rOxaft6IIdvKISWg:4gxFulKimPvjK2CIEuUk0TtB7TynlfHOT6pbmiIXs@ds017604-a1.mlab.com:17604,ds017604-a0.mlab.com:17604/fuel-dev?replicaSet=rs-ds017604', function (err,db){
    if(!err) {
        console.log("We are connected")
        db.close()
    }
    else
    {
        console.log(err)
    }
})

// console.log(JSON.stringify(mongoConnect))
