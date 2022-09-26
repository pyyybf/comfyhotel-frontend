import * as React from 'react';

import SearchCard from "./components/SearchCard";
import Grid from "@mui/material/Grid";

const Home = () => {
    return (
        <Grid container justifyContent="left" style={{marginTop:'2em'}}>
            <Grid item xs={12} sm={12} md={8} lg={8}>
                <SearchCard/>
            </Grid>
        </Grid>
    );
}

export default Home;