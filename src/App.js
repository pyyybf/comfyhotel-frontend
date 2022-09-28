import * as React from 'react';
import './App.css';
import Grid from '@mui/material/Grid';
import {Route, HashRouter as Router, Routes} from 'react-router-dom';

import Header from "@/components/Header";
import Home from "@/views/home/Home";
import MyHome from "@/views/myHome/MyHome";

function App() {
    return (
        <Router>
            <Header/>
            <Grid container alignItems="center" justifyContent="center">
                <Routes>
                    <Route path="/" element={Home()}/>
                    <Route path="/myHome" element={MyHome()}/>
                </Routes>
            </Grid>
        </Router>
    );
}

export default App;
