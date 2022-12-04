import signUpRouter from './signUp';
import signInRouter from './signIn';
import signOutRouter from './signOut';
import productRouter from './product';
import userRouter from './user';
import accountRouter from './account';
import orderBillRouter from './orderBill';

const route = (app: any) => {
    app.use('/sign-up', signUpRouter);
    app.use('/sign-in', signInRouter);
    app.use('/sign-out', signOutRouter);
    app.use('/product', productRouter);
    app.use('/users', userRouter);
    app.use('/account', accountRouter);
    app.use('/order-bill', orderBillRouter);
};

module.exports = route;
