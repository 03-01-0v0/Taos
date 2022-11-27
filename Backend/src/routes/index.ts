import signUpRouter from './signUp';
import signInRouter from './signIn';
import signOutRouter from './signOut';
import productRouter from './product';
import userRouter from './user';

const route = (app: any) => {
    app.use('/sign-up', signUpRouter);
    app.use('/sign-in', signInRouter);
    app.use('/sign-out', signOutRouter);
    app.use('/product', productRouter);
    app.use('/user', userRouter);
}

module.exports = route;