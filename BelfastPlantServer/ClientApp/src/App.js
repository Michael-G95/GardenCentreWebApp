import React from 'react'
import Nav from './Nav/Nav'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import Home from './Home/Home';
import PlantsSearch from './PlantsSearch/PlantsSearch';
import PlantsResults from './PlantsResults/PlantsResults';
import PlantsView from './PlantsView/PlantsView';
import Weather from './Weather/Weather';

const App = () => {
    return (
        <BrowserRouter>
            <Switch>
                
                <Route path="/plants" component={PlantsSearch} exact/>
                <Route path="/results/:mode/:term" component={PlantsResults}  exact />
                <Route path="/plants/id/:id" component={PlantsView} exact />
                <Route path="/weather/:mode/:loc" component={Weather} exact />
                <Route path="/weather/:mode/:loc/:latLoc" component={Weather} exact />
                <Route path="/weather" component={Weather} exact />
                
                <Route path="/" component={Home} />
            </Switch>
        </BrowserRouter>
    );
}

export default App