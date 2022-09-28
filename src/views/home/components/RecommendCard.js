import * as React from "react";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";

const cardStyle = {
    width: '100%',
    height: '13vw',
    boxShadow: '0 3px 10px 2px lightgray',
    borderRadius: '10px',
}

const RecommendCard = (props) => {
    return (
        <Card sx={cardStyle}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    image={props.hotelInfo.coverImage}
                    alt={props.hotelInfo.name}
                    sx={{height: '13vw', width: '13vw', float: 'left'}}
                />
                <CardContent style={{display: 'flex', flexDirection: 'column', position: 'relative', height: '13vw'}}>
                    <Typography sx={{
                        marginTop:'-0.5em',
                        fontSize: '1.5em',
                        lineHeight:'1.2em',
                        fontFamily: 'Montserrat, "Helvetica Neue", Helvetica, Arial, sans-serif',
                        fontWeight: 500
                    }}>
                        {props.hotelInfo.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{marginTop:'0.2em'}}>
                        {props.hotelInfo.address}<br/>{`${props.hotelInfo.city}, ${props.hotelInfo.state}`}
                    </Typography>
                    {/*<Typography>*/}

                    {/*</Typography>*/}
                    <Typography sx={{
                        width: 'calc(100% - 2em)',
                        position: 'absolute',
                        bottom: '0.5em',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems:'center'
                    }}>
                        <Box>
                            <Rating defaultValue={props.hotelInfo.rate / 2}
                                    precision={0.1}
                                    readOnly
                                    sx={{float: 'left'}}/>
                            <Box sx={{ml: 1, float: 'left',fontSize:'1em'}}>{props.hotelInfo.rate}</Box>
                        </Box>
                        <Box sx={{
                            float: 'right',
                            fontSize: '1.3em',
                            fontWeight:'bolder',
                            fontFamily: '"Centra No2", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                            color:'#645CAA'
                        }}>
                            ${props.hotelInfo.price}
                        </Box>
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default RecommendCard;