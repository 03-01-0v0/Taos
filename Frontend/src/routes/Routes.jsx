import React from 'react';

import {Route, Switch} from 'react-router-dom';

import Home from '../pages/Home';
import Cart from '../pages/Cart';
import Product from '../pages/Product';
import IpadCatalog from '../pages/IpadCatalog';
import IphoneCatalog from '../pages/IphoneCatalog';
import WatchCatalog from '../pages/WatchCatalog';
import Payment from '../pages/Payment';

const Routes = () => {
    return (
        <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/catalog/:id' component={Product} />
            <Route path='/iphone' component={IphoneCatalog} />
            <Route path='/ipad' component={IpadCatalog} />
            <Route path='/watch' component={WatchCatalog} />
            <Route path='/cart' component={Cart} />
            <Route path='/payment' component={Payment} />
        </Switch>
    );
};

export default Routes;
