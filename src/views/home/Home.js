import * as React from 'react';

import SearchCard from "./components/SearchCard";
import Grid from "@mui/material/Grid";

import home_bg from '@/assets/home_bg.png';

import {useDispatch} from "react-redux";
import {getTop2HotelByReservationNum} from "@/store/modules/hotel";
import RecommendCard from "./components/RecommendCard";

const Home = () => {
    const [top2HotelByReservationNum, setTop2HotelByReservationNum] = React.useState([]);

    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(getTop2HotelByReservationNum()).then(res => {
            setTop2HotelByReservationNum(res)
        }).catch(err => {
            console.log(err)
        })
    }, [])

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
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <h2 style={{
                            color: '#645CAA',
                            fontFamily: 'Montserrat, "Helvetica Neue", Helvetica, Arial, sans-serif'
                        }}>
                            Don't miss these hotels
                        </h2>
                        <Grid container spacing={2} style={{width: '100%'}}>
                            {function (hotels) {
                                var elements = [];
                                for (let hotel of hotels) {
                                    elements.push(
                                        <Grid item xs={12} sm={6} md={6} lg={6} key={hotel.hotelId}>
                                            <RecommendCard hotelInfo={hotel}/>
                                        </Grid>
                                    )
                                }
                                return elements;
                            }(top2HotelByReservationNum)}
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={12} md={10} lg={10} style={{height:'50px'}}></Grid>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default Home;