import React, { Component, Fragment } from 'react';
import Search from './Search';
import Sidebar from './Sidebar';
import Content from './Content';
import '../assets/css/brooke.css'

class NoteContainer extends Component {
    state = {
        notes: [],
        searchTerm: '',
        activeNote: [],
        view: "view",
    }
    componentDidMount(){
        fetch('https://gentle-temple-63807.herokuapp.com/api/v1/notes').then(res => res.json()).then(res => this.setState({notes: res, filteredNotes: res}))
    }
    
    update = (id) => {
        fetch('https://gentle-temple-63807.herokuapp.com/api/v1/notes')
        .then(res => res.json())
        .then(res => this.setState({notes: res}))
        .then(() => this.editSelectedNote(id) )
    } 
    
    updateNoId = () => {
        fetch('https://gentle-temple-63807.herokuapp.com/api/v1/notes')
        .then(res => res.json())
        .then(res => this.setState({notes: res,filteredNotes: res}))
    }

    getUpdatedSearchterm = (term) => {
        this.setState({searchTerm: term}, () => this.runFilter(term))
    }

    runFilter = () => {
        const filteredNotes = this.state.notes.filter(note => note.title.includes(this.state.searchTerm) )
        return  <Sidebar notes={filteredNotes} func={this.viewSelectedNote} addNewDefaultNote={this.addNewDefaultNote}/>
    }
    
    viewSelectedNote = (id) => {
        const foundNote = this.state.notes.find(note => note.id === id)
        this.setState({activeNote: foundNote, view: "view"})
    }
    
    editSelectedNote = (id) => {
        const foundNote = this.state.notes.find(note => note.id === id)
        this.setState({activeNote: foundNote, view: "edit"})
    }

    addNewDefaultNote = () => {
        const user_id = 1
        const url = 'https://gentle-temple-63807.herokuapp.com/api/v1/notes/'
        fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                title: "default",
                body: "placeholder",
                user_id
            }),
            headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => console.log('Success:', response))
        .then( () => this.updateNoId())
    }
    
    changeView = () => {
        this.state.view === "edit" ? 
        this.setState({view:"view"}) :
        this.setState({view:"edit"})
    }

    render() {
        console.log(this.state.notes);
        
        return (
        <Fragment>
            <Search searchTerm={this.state.searchTerm} onSearchChange={this.getUpdatedSearchterm}/>
            <div className='container'>
                {this.runFilter()}
                <Content note={this.state.activeNote} changeView={this.changeView} view={this.state.view} update={this.update}/>
            </div>
        </Fragment>
        );
    }
}

export default NoteContainer;
