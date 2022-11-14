const SignInRouter = require('../routes/signIn');
const route = (app: any) => {
    app.use('/sign-in', SignInRouter);
}

module.exports = route;