import React from 'react';
import {BrowserRouter,Route} from 'react-router-dom';
import Home from '../components/Home';
import Search from '../components/Search';
import Details from '../components/Details';
import Header from '../components/Headers';

const Router=()=>{
    return(
        <BrowserRouter>
        <Header />
        <Route exact path="/" component={Home}/>
        <Route path="/search" component={Search}/>
        <Route path="/details" component={Details}/>
        </BrowserRouter>
    )
}
export default Router;