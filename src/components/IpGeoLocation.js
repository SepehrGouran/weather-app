import React, {Component} from 'react';
import {withStyles} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import axios from 'axios';
import {ArrowDownward, ArrowUpward} from "@material-ui/icons";
import {blue, red} from "@material-ui/core/colors";

const styles = theme => ({
    card: {
        margin: theme.spacing(2),
    },

});

class IpGeoLocation extends Component {

    state = {
        countryName: null,
        cityName: null,
        forecast: null
    };

    componentDidMount() {
        axios.get('https://ipapi.co/json/').then((response) => {
            let data = response.data;
            this.setState({
                countryName: data.country_name,
                cityName: data.city,
            });

            axios.get(`https://weather.ls.hereapi.com/weather/1.0/report.json?product=observation&name=${data.city}&apiKey=${process.env.REACT_APP_WEATHER_API_KEY}`)
                .then((response) => {
                    if (response.data.observations.location.length > 0) {
                        this.setState({forecast: response.data.observations.location[0]});
                        console.log(response.data)
                    }
                });
        }).catch((error) => {
            console.log(error);
        });
    }

    render() {
        const {classes} = this.props;

        return (
            <Box mt={3}>
                <Box>
                    <Typography variant="h3">
                        {this.state.countryName}
                    </Typography>
                    <Typography variant="h5">
                        {this.state.cityName}
                    </Typography>
                </Box>

                {this.state.forecast !== null ?
                    <div>
                        <Typography variant="subtitle1">
                            {new Date(this.state.forecast.observation[0].utcTime)
                                .toISOString().replace('-', '/').split('T')[0].replace('-', '/')}
                        </Typography>
                        <Grid xs={12}>
                            <Box display="flex" alignItems="center" justifyContent="center">
                                <img src={this.state.forecast.observation[0].iconLink + `?apiKey=${process.env.REACT_APP_WEATHER_API_KEY}`} />
                            </Box>
                            <Box display="flex" alignItems="center" justifyContent="center">
                                <Typography>
                                    {this.state.forecast.observation[0].skyDescription}
                                </Typography>
                            </Box>
                            <Box display="flex" alignItems="center" justifyContent="center">
                                <Box m={2}>
                                    <Typography variant="h1">
                                        {Math.round(this.state.forecast.observation[0].temperature)}&#176;C
                                    </Typography>
                                </Box>
                            </Box>
                            <Box display="flex" alignItems="center" justifyContent="center">
                                <Box mr={2} mb={2} display="inline-flex">
                                    <ArrowUpward style={{color: red[500]}}/>
                                    <Typography
                                        color="textSecondary">
                                        {Math.round(this.state.forecast.observation[0].highTemperature)} &#176;C
                                    </Typography>

                                </Box>
                                <Box mb={2} display="inline-flex">
                                    <ArrowDownward style={{color: blue[500]}}/>
                                    <Typography
                                        color="textSecondary">
                                        {Math.round(this.state.forecast.observation[0].lowTemperature)} &#176;C
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>
                    </div>
                    : null}

            </Box>
        )
    }
}

export default withStyles(styles)(IpGeoLocation);