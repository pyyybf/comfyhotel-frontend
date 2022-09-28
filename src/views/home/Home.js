import * as React from 'react';

import SearchCard from "./components/SearchCard";
import Grid from "@mui/material/Grid";

import home_bg from '@/assets/home_bg.png';

const Home = () => {
    return (
        <React.Fragment>
            <img src={home_bg}
                 alt="bg"
                 style={{
                     background: '#A084CA',
                     width: 'auto',
                     height: 'auto',
                     maxWidth: '100%',
                     maxHeight: '100%',
                     marginTop: '5em',
                 }}/>
            <Grid item xs={12} sm={12} md={11} lg={10}
                  style={{
                      position: 'absolute',
                      top: '5em',
                  }}>
                <Grid container spacing={2} style={{marginTop: '1em'}}>
                    <Grid item xs={12} sm={12} md={9} lg={8}>
                        <SearchCard/>
                    </Grid>
                    <Grid item xs={12} sm={12} md={10} lg={10} style={{height:'50px'}}></Grid>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default Home;