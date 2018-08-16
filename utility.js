const data = require("./small-database")
const enums = require('./enums')
data.map((purchase)=> {
    var randStatus = enums.PurchaseReviewValidStatusSlot[Math.floor(Math.random() * enums.PurchaseReviewValidStatusSlot.length)];
    purchase.status = randStatus
})

console.log(JSON.stringify(data))