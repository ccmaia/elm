const express = require('express')
let server = express()
const path = require('path')
server.listen(8890)

let shoppingRoute = express.Router()

server.use('/shopping',shoppingRoute)

shoppingRoute.use("/v3",(req,res) => {
    res.sendFile(path.resolve('./eleJson/shopping.json'));
})

shoppingRoute.use("/pizza",(req,res) => {
    res.sendFile(path.resolve('./eleJson/pizza.json'));
})

shoppingRoute.use("/ratting",(req,res) => {
    res.sendFile(path.resolve('./eleJson/ratting.json'));
})

shoppingRoute.use("/booking",(req,res) => {
    res.sendFile(path.resolve('./eleJson/booking.json'));
})



