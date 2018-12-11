import React, { Component } from 'react';
import MyMap from './MyMap'

class Content extends Component {
    constructor(props){
        super(props)
    }

    renderContent = () => {
        // if (this.props.view === "edit") {
        //     return <NoteEditor note={this.props.note} func={this.props.changeView} update={this.props.update}/>;
        // } else if (this.props.view ==="view" && this.props.note.id) {
        //     return ''
        // } else {
        //     return ''
        // }
    }
    
    render() {
        return (
            <div className='master-detail-element detail'>
                <div id="mapid">
                    <MyMap getNewCooridantes={this.props.getNewCooridantes}/>
                </div>
            {this.renderContent()}
            </div>
        );
    }
}

export default Content;
