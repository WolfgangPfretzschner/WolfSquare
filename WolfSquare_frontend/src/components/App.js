import React, { Component } from 'react';
import Header from './Header';
import Navbar from './NavBar'
import NoteContainer from './NoteContainer';
import FourOhFour from './FourOhFour'
import { Switch, Route } from 'react-router-dom';
import RestaurantsContainer from './RestaurantsContainer'

class App extends Component {
    render() {
        return (
        <div className="app">
            <Navbar handleClick={this.handleClick} />
            <Header />
            <Switch>
                <Route exact path="/notes" component={NoteContainer} />
                <Route exact path="/restaurants" component={RestaurantsContainer} />
                <Route component={RestaurantsContainer} />
            </Switch>
        </div>
        );
    }
} 

export default App;

        //     <Route path="/profiles/:id" render={(routerProps) => (
        //     <Profile
        //       {...routerProps}
        //       name="Fake Hello Kitty"
        //       description="This one is a cat."
        //       avatar="Hello_Kitty.png"
        //     />
        //   )}/>