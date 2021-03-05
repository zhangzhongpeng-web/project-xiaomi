const categoryRouter = require('./category.js');
const productRouter = require('./product.js');
const userRouter = require('./user.js');
const cartRouter = require('./cart.js');
const addressRouter = require('./address.js');
const orderRouter = require('./order.js');

module.exports = [
    categoryRouter,
    productRouter,
    userRouter,
    cartRouter,
    addressRouter,
    orderRouter
];