import React, { Component } from 'react'
import RestList from './RestList'

export default class RestSidebar extends Component {
    constructor(props) {
        super(props)
    }

    render() {

        return (
            <div className='master-detail-element sidebar'>
                <RestList restaurants={this.props.restaurants}/>
            </div>
        )
}
}
