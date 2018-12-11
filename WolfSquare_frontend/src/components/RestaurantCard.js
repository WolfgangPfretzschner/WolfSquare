import React, { Component, Fragment } from 'react'
import MySlider from './MySlider'


class RestaurantCard extends Component {
    constructor(props) {
        super(props)
        this.state= {
            id: this.props.res.venue.id,
            images:[]
        }
        
    };
    componentDidMount(){
        const photoId = this.state.id
        const url = `https://api.foursquare.com/v2/venues/${photoId}/photos?oauth_token=OAHNAK10ZIN0UVCODPJQORTEA3IRST3ESAR5V4INZLCF04HK&v=20180817&limit=15`
        
        fetch(url)
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(res => {
            console.log('Success from DidMount', res)
            return res
        } )
        .then(res => this.setState({images: res.response.photos.items},()=>console.log("%c didMountFetch","color:green;font-size:18px") ))
    }  

    //  console.log("%cI am red %cI am green", "color: red", "color: green")

    componentDidUpdate() {
        console.log("%cdid update","color:green;font-size:9px",)
        if(this.props.res.venue.id !== this.state.id){
            this.setState({id: this.props.res.venue.id}, this.newFetch)
            // this.newFetch()
        }
    }
    newFetch = () => {
        const photoId = this.state.id
        const url = `https://api.foursquare.com/v2/venues/${photoId}/photos?oauth_token=OAHNAK10ZIN0UVCODPJQORTEA3IRST3ESAR5V4INZLCF04HK&v=20180817&limit=15`
        let pics = []
        fetch(url)
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(res => {
            console.log("%cfetch for images","color:green;font-size:18px",)
            return res
        })
        .then(res => this.setState({images: res.response.photos.items}) )
        // .then(() => this.setState({id: this.props.res.venue.id}) )
        // .then(this.slideMaker)
            // .then(response => console.log('Success:', response))
            // .then(res => this.slideMaker(res))

        }
    slideMaker = () => {
        // console.log("%cslideMaker","color:green;font-size:12px",)
        if(!!this.state.images){
            console.log("%cimages!!!","color:brown;font-size:18px",this.state.images)
    return <MySlider pics={this.state.images}/>
        }
    }

    render() {
        return (
            <li >
            <h4>{this.props.res.venue.name}</h4>
            Distance: {this.props.res.venue.location.distance}<br/>
            Contact:<br/>
            Phone: {this.props.res.venue.contact.formattedPhone}<br/>
            Twitter: {this.props.res.venue.contact.twitter}<br/>
            webSite: {this.props.res.venue.url}<br/>
            Address: <br/>
            Street:{this.props.res.venue.location.address}<br/>
            City:{this.props.res.venue.location.city}<br/>
            zip:{this.props.res.venue.location.postalCode}<br/>
            Hours:<br/>

            {/* {this.props.res.venue.hours.status === undefined ? null : this.props.res.venue.hours.status }<br/> */}
            {this.slideMaker()}
            
            {/* <img src={`${this.props.res.prefix}height300${this.props.res.suffix}`}/> */}
            {/* <MySlider  pics={this.state.images}/> */}
            </li>
        )
    }
}

export default RestaurantCard
RestaurantCard.defaultProps = {
    name: "n/a",
    formattedPhone: "n/a",
    twitter: "n/a",
    url: "n/a",
    address: "n/a",
    city: "n/a",
    postalCode: "n/a",
    status: "n/a",
}

// makeImg = () => {
    //     this.props.res.map( res => {
        //         // debugger
        //         const src= res.prefix+"height300"+res.suffix 
        //         console.log(src);
        
        //     })
        // }
        // https://api.foursquare.com/v2/venues/4a93fc49f964a520192020e3/photos?oauth_token=OAHNAK10ZIN0UVCODPJQORTEA3IRST3ESAR5V4INZLCF04HK&v=20180817