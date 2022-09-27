import * as React from "react";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import CardHeader from '@mui/material/CardHeader';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import {LocalizationProvider} from '@mui/x-date-pickers-pro';
import {AdapterDayjs} from '@mui/x-date-pickers-pro/AdapterDayjs';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';

import AddIcon from '@mui/icons-material/Add';

import formatDate from "@/util/formatDate";
import {Alert} from "@mui/material";

const cardStyle = {
    width: '100%',
    boxShadow: '0 3px 10px 2px lightgray'
}

const locationData = require('@/assets/locations.json');
const stateList = Object.keys(locationData);

const date = new Date();

const initSearchInfo = {
    city: '',
    state: '',
    checkIn: formatDate(date, 'yyyy-MM-dd'),
    checkOut: formatDate(new Date(date.getTime() + 24 * 60 * 60 * 1000), 'yyyy-MM-dd'),
    roomList: [{adult: 2, child: 0}],
    pageSize: 10,
    pageNum: 1
}

const Home = () => {
    const [searchInfo, setSearchInfo] = React.useState(initSearchInfo);
    const [cityList, setCityList] = React.useState([]);
    const [searchAlert, setSearchAlert] = React.useState(null);

    const onSearch = () => {
        setSearchAlert(null)
        var searchAlertText = '';
        // state
        if (searchInfo.state === '') {
            searchAlertText += "The state shouldn't be blank. "
        }
        // city
        if (searchInfo.city === '') {
            searchAlertText += "The city shouldn't be blank. "
        }
        // check-in & check-out
        const checkIn = searchInfo.checkIn.split('-');
        const checkOut = searchInfo.checkOut.split('-');
        if (Number(checkIn[0]) > Number(checkOut[0]) ||
            (Number(checkIn[0]) === Number(checkOut[0]) && Number(checkIn[1]) > Number(checkOut[1])) ||
            (Number(checkIn[0]) === Number(checkOut[0]) && Number(checkIn[1]) === Number(checkOut[1]) && Number(checkIn[2]) >= Number(checkOut[2]))) {
            searchAlertText += 'Check-out time should be later than check-in time.'
        }
        // room
        if (searchInfo.roomList.length === 0) {
            searchAlertText += 'There should be at least one room. '
        }

        if (searchAlertText !== '') {
            setSearchAlert(searchAlertText)
            return
        }
        // else search
    }

    return (
        <Card variant="outlined" sx={cardStyle}>
            <CardHeader title="Find your hotel"
                        subheader="Book a hotel with free cancellation for flexibility"
                        titleTypographyProps={{
                            fontSize: '2em',
                            fontWeight: 'bolder',
                            color: '#645CAA',
                            fontFamily: 'Montserrat, "Helvetica Neue", Helvetica, Arial, sans-serif'
                        }}/>
            <CardContent>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={6} lg={6}>
                        <Autocomplete
                            disablePortal
                            options={stateList}
                            sx={{width: '100%'}}
                            renderInput={(params) => <TextField {...params} label="State"/>}
                            value={searchInfo.state}
                            onChange={(e, val) => {
                                if (val === null) {
                                    setSearchInfo({...searchInfo, state: '', city: ''})
                                    setCityList([])
                                } else {
                                    setSearchInfo({...searchInfo, state: val, city: ''})
                                    setCityList(locationData[val])
                                }
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={6}>
                        {cityList.length > 0 &&
                            <Autocomplete disablePortal
                                          options={cityList}
                                          sx={{width: '100%'}}
                                          renderInput={(params) => <TextField {...params}
                                                                              label="City"/>}
                                          value={searchInfo.city}
                                          onChange={(e, val) => setSearchInfo({
                                              ...searchInfo,
                                              city: val
                                          })}
                            />}
                    </Grid>
                    <Grid item xs={6} sm={6} md={3} lg={3}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="Check-in"
                                value={searchInfo.checkIn}
                                onChange={(newValue) => {
                                    setSearchInfo({
                                        ...searchInfo,
                                        checkIn: formatDate(new Date(newValue), 'yyyy-MM-dd')
                                    });
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item xs={6} sm={6} md={3} lg={3}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}
                                              style={{width: '100%', backgroundColor: 'red'}}>
                            <DatePicker style={{width: '100%', backgroundColor: 'red'}} xs={{width: '100%'}}
                                        label="Check-out"
                                        value={searchInfo.checkOut}
                                        onChange={(newValue) => {
                                            setSearchInfo({
                                                ...searchInfo,
                                                checkOut: formatDate(new Date(newValue), 'yyyy-MM-dd')
                                            });
                                        }}
                                        renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <Button variant="text"
                                size="large"
                                startIcon={<AddIcon/>}
                                sx={{height: '100%', float: 'right'}}
                                onClick={() => {
                                    var newRoomList = searchInfo.roomList;
                                    newRoomList.push({adult: 1, child: 0})
                                    setSearchInfo({...searchInfo, roomList: newRoomList})
                                }}>
                            Add another room
                        </Button>
                    </Grid>
                    {function (rooms) {
                        let elements = [];
                        for (let i = 0; i < rooms.length; i++) {
                            elements.push(
                                <Grid item xs={12} sm={12} md={6} lg={6} key={i}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={12} md={12} lg={12}>
                                            <Grid container alignItems="center" justifyContent="space-between">
                                                <Grid item sx={{fontWeight: 'bold'}}>
                                                    <span>Room {i + 1}</span>
                                                </Grid>
                                                <Grid item>
                                                    <Button variant="text"
                                                            id={`remove-btn-${i}`}
                                                            size="large"
                                                            onClick={e => {
                                                                const idList = e.target.id.split('-')
                                                                searchInfo.roomList.splice(Number(idList[idList.length - 1]), 1)
                                                                setSearchInfo({...searchInfo})
                                                            }}>
                                                        remove
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={6} sm={6} md={6} lg={6}>
                                            <TextField
                                                id="outlined-number"
                                                label="Adults"
                                                type="number"
                                                InputLabelProps={{shrink: true}}
                                                sx={{width: '100%'}}
                                                inputProps={{min: 1}}
                                                value={searchInfo.roomList[i].adult}
                                                onChange={e => {
                                                    var newRoomList = searchInfo.roomList;
                                                    newRoomList[i].adult = e.target.value >= 1 ? e.target.value : 1;
                                                    setSearchInfo({...searchInfo, roomList: newRoomList})
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={6} sm={6} md={6} lg={6}>
                                            <TextField
                                                id="outlined-number"
                                                label="Children"
                                                type="number"
                                                InputLabelProps={{shrink: true}}
                                                sx={{width: '100%'}}
                                                inputProps={{min: 0}}
                                                value={searchInfo.roomList[i].child}
                                                onChange={e => {
                                                    var newRoomList = searchInfo.roomList;
                                                    newRoomList[i].child = e.target.value >= 0 ? e.target.value : 0;
                                                    setSearchInfo({...searchInfo, roomList: newRoomList})
                                                }}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            )
                        }
                        return elements;
                    }(searchInfo.roomList)}
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Grid container spacing={2} alignItems="center" justifyContent="space-between">
                            <Grid item xs={12} sm={12} md={9} lg={9}>
                                {searchAlert && <Alert variant="filled" severity="error">
                                    {searchAlert}
                                </Alert>}
                            </Grid>
                            <Grid item xs={12} sm={12} md={3} lg={3}>
                                <Button variant="contained"
                                        size="large"
                                        style={{width: '100%'}}
                                        onClick={onSearch}>
                                    Search
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}

export default Home;