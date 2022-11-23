const signUpRouter = require('../routes/signUp');
const signInRouter = require('../routes/signIn');
const signOutRouter = require('../routes/signOut');
const productRouter = require('../routes/product');

const route = (app: any) => {
    app.use('/sign-up', signUpRouter);
    app.use('/sign-in', signInRouter);
    app.use('/sign-out', signOutRouter);
    app.use('/product', productRouter);
}

module.exports = route;