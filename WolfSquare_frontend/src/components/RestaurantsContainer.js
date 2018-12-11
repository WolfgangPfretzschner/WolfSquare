import React, { Component, Fragment } from 'react';
import Search from './Search'
import RestSidebar from './RestSidebar';
import RestContent from './RestContent';
import _ from 'lodash';

// https://api.foursquare.com/v2/venues/explore?oauth_token=OAHNAK10ZIN0UVCODPJQORTEA3IRST3ESAR5V4INZLCF04HK&v=20180817&limit=10&ll=40.704983, -74.013856&query=coffee
// https://api.foursquare.com/v2/venues/4a93fc49f964a520192020e3/photos?oauth_token=OAHNAK10ZIN0UVCODPJQORTEA3IRST3ESAR5V4INZLCF04HK&v=20180817


class RestaurantsContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            restaurants: [],
            activeRestaurant:[],
            searchTerm: 'Coffee',
            marker:{
                lat: 51.505,
                lng: -0.09,
                },
    
        }

        this.newFetch = _.debounce(this.newFetch, 800)
    }


    componentDidMount(){
        console.log("%ccalled","color:red;font-size:18px",)
        fetch('https://api.foursquare.com/v2/venues/explore?oauth_token=OAHNAK10ZIN0UVCODPJQORTEA3IRST3ESAR5V4INZLCF04HK&v=20180817&limit=8&ll=51.505,-0.09&query=coffee')
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(res => {
            console.log('Success on compdidmount', res)
            return res
        })
        .then(res => {
            this.setState({restaurants: res.response.groups[0].items})
            // return res
        } )
    }

    getUpdatedSearchterm = (term) => {
        
        this.setState({searchTerm: term},this.newFetch)
    }
    
    newFetch = () => {
        const url = 'https://api.foursquare.com/v2/venues/explore?oauth_token=OAHNAK10ZIN0UVCODPJQORTEA3IRST3ESAR5V4INZLCF04HK&v=20180817&limit='
        const limit = "10"
        const lat = this.state.marker.lat
        const lan = this.state.marker.lng
        const query = this.state.searchTerm
        const apiUrl = `https://api.foursquare.com/v2/venues/explore?oauth_token=OAHNAK10ZIN0UVCODPJQORTEA3IRST3ESAR5V4INZLCF04HK&v=20180817&limit=${limit}&ll=${lat},${lan}&query=${query}&sortByDistance=true`
        fetch(apiUrl)
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(res => {
            this.setState({restaurants: res.response.groups[0].items} )
            return res
        })
        .then(res => console.log("%cfetch for all restaurants","color:orange;font-size:14px",res) )

    }   
    
    getNewCooridantes = (marker) => {
        this.setState({marker}, () => this.newFetch() );
        
        
    }

    render(){
        console.log(this.state.restaurants);
        console.log(this.state.searchTerm);
        // const getUpdatedSearchterm = _.debounce((term) => { this.getUpdatedSearchterm(term) } ,400) 
        const getNewCooridantes = _.debounce( this.getNewCooridantes ,200) 
        // const throt =  _.debounce(this.newFetch, 2000 )
        return (
            <Fragment>
                <Search onSearchChange={this.getUpdatedSearchterm} searchTerm={this.state.searchTerm}/>
                <div className='container'>
                    <RestSidebar restaurants={this.state.restaurants}/> 
                    <RestContent getNewCooridantes={getNewCooridantes}/>
                </div>
            </Fragment>
        )
    } 
}

export default RestaurantsContainer;
