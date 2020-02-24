import React from 'react';
import {BrowserRouter, Route} from "react-router-dom";
import Navbar from "./components/layouts/Navbar";
import NotesList from "./components/notes/NotesList";
import CreateNote from "./components/notes/CreateEditNote"
import NoteDetail from "./components/notes/NoteDetail"
import ChooseDataProvider from "./components/dataProvider/ChooseDataProvider"


function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Navbar />
                <main role="main" className="container">
                    <Route exact path='/' component={ NotesList } />
                    <Route exact path='/create_note' component={ CreateNote } />
                    <Route exact path='/choose_provider' component={ ChooseDataProvider } />
                    <Route exact path='/note_detail/:id' component={ NoteDetail } />
                </main>
            </div>
        </BrowserRouter>
    );
}

export default App;
