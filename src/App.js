import React, {Component} from 'react';
import './App.css';
import {withStyles} from '@material-ui/core/styles';
import AppBar
    from '@material-ui/core/AppBar';
import Toolbar
    from '@material-ui/core/Toolbar';
import Typography
    from '@material-ui/core/Typography';
import Button
    from '@material-ui/core/Button';
import TextField
    from '@material-ui/core/TextField';
import Autocomplete
    from '@material-ui/lab/Autocomplete';
import Container
    from '@material-ui/core/Container';
import Box
    from '@material-ui/core/Box';
import Card
    from '@material-ui/core/Card';
import CardActions
    from '@material-ui/core/CardActions';
import CardContent
    from '@material-ui/core/CardContent';
import Grid
    from '@material-ui/core/Grid';
import {
    LocationOn,
    ArrowUpward,
    ArrowDownward,
    InvertColors,
    Waves
} from '@material-ui/icons';
import {
    red,
    blue
} from '@material-ui/core/colors';
import axios from 'axios';
import ForecastContainer
    from "./components/ForecastContainer";
import LocationForecast from "./components/LocationForecast";
import IpGeoLocation from "./components/IpGeoLocation";

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 2,
    },
    card: {
        margin: theme.spacing(2),
    },
});

const WAIT_INTERVAL = 1000;

class App extends Component {

    state = {
        value: '',
        open: false,
        loading: false,
        cities: [],
        observations: null,
        forecastLocation: null
    };

    componentWillMount() {
        this.timer = null;
    }

    onCitySelectHandler = (event, newValue) => {
        if (newValue !== null) {
            clearTimeout(this.timer);
            this.setOpen(false);
            axios.get(`https://weather.ls.hereapi.com/weather/1.0/report.json?product=observation&name=${newValue}&apiKey=${process.env.REACT_APP_WEATHER_API_KEY}`)
                .then((response) => {
                    this.setState({observations: response.data});
                });
        }
    };

    onInputChangeHandler = (event) => {
        if (event.key !== 'Enter') {
            clearTimeout(this.timer);
            this.setState({value: event.target.value})

            this.timer = setTimeout(() => {
                    this.setState({loading: true});
                    this.setState({cities: []});
                    axios.get('https://wft-geo-db.p.rapidapi.com/v1/geo/cities?limit=10&namePrefix=' + this.state.value,
                        {
                            headers: {
                                'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com',
                                'x-rapidapi-key': `${process.env.REACT_APP_LOCATION_API_KEY}`
                            },
                        }).then((response) => {

                        this.setState({cities: response.data.data});
                        this.setOpen(true);
                        this.setState({loading: false});
                    }).catch(e => {
                        this.setState({loading: false});
                    });
                }, WAIT_INTERVAL
            );
        }
    };

    setOpen = (value) => {
        this.setState({open: value});
    };

    sevenDayForecastHandler = (city) => {

        axios.get(`https://weather.ls.hereapi.com/weather/1.0/report.json?product=forecast_7days_simple&name=${city}&apiKey=${process.env.REACT_APP_WEATHER_API_KEY}`)
            .then((response) => {
                    this.setState({
                        observations: null,
                        forecastLocation: response.data.dailyForecasts.forecastLocation
                    });
                }
            )
    };

    render() {
        const {classes} = this.props;
        return (
            <div
                className={classes.root}>
                <AppBar
                    position="static">
                    <Toolbar>
                        <Typography
                            variant="h6"
                            className={classes.title}>
                            Weather-app
                        </Typography>
                    </Toolbar>
                </AppBar>

                <Container
                    maxWidth="sm">
                    <Autocomplete
                        freeSolo
                        options={this.state.cities.map((city) => city.city)}
                        renderInput={(params) => (
                            <TextField {...params}
                                       label="Search City"
                                       margin="normal"
                                       variant="outlined"/>
                        )}
                        onKeyUp={this.onInputChangeHandler}
                        open={this.state.open}
                        onOpen={() => {
                            this.setOpen(true);
                        }}
                        onClose={() => {
                            this.setOpen(false);
                        }}
                        getOptionSelected={(option, value) => option.name === value.name}
                        onChange={this.onCitySelectHandler}
                        loading={this.state.loading}
                    />
                </Container>

                {this.state.observations === null && this.state.forecastLocation === null ?
                    <Container>
                        <IpGeoLocation/>
                    </Container>
                    : null
                }

                <Container
                    maxWidth="lg">

                    {this.state.observations !== null ?
                        this.state.observations.observations.location.map((location) => {
                            return <LocationForecast
                                location={location}
                                sevenDayForecast={() => this.sevenDayForecastHandler(location.city)}/>
                        }) : null
                    }

                    {this.state.forecastLocation !== null ?
                        <ForecastContainer
                            forecastLocation={this.state.forecastLocation}/>
                        : null
                    }
                </Container>

            </div>
        );
    }
}

export default withStyles(styles)(App);
