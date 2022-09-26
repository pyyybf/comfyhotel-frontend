import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardHeader from '@mui/material/CardHeader';
import Box from "@mui/material/Box";
import * as React from "react";

const bull = (
    <Box
        component="span"
        sx={{display: 'inline-block', mx: '2px', transform: 'scale(0.8)'}}
    >
        •
    </Box>
);

const cardStyle = {
    width: '100%',
    boxShadow: '0 3px 10px 2px lightgray'
}

const Home = () => {
    return (
        <Card variant="outlined" sx={cardStyle}>
            <CardHeader title="Find your hotel"
                        subheader="Book a hotel with free cancellation for flexibility"
                        titleTypographyProps={{
                            fontSize: '2em',
                            fontWeight: 'bolder',
                            // color: '#2196f3',
                            fontFamily: 'Montserrat, "Helvetica Neue", Helvetica, Arial, sans-serif'
                        }}/>
            <CardContent>
                <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                    Word of the Day
                </Typography>
                <Typography variant="h5" component="div">
                    be{bull}nev{bull}o{bull}lent
                </Typography>
                <Typography sx={{mb: 1.5}} color="text.secondary">
                    adjective
                </Typography>
                <Typography variant="body2">
                    well meaning and kindly.
                    <br/>
                    {'"a benevolent smile"'}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Learn More</Button>
            </CardActions>
        </Card>
    );
}

export default Home;