import {Router, Route,Switch,IndexRoute} from "dva/router";
import React from 'react';
import Home from './component/home';
import Asset from './component/coupon/Asset'
function RouterConfig({history}){
    return (
        <Router history={history}>
            <Switch>
            <Route path="/home" component={Home}/>
            <Route path="/Asset" component={Asset}/>
            </Switch>
        </Router>    
    )
}

export default RouterConfig;