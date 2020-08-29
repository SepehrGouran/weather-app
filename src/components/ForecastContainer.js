import React, {Component} from 'react';
import CardHeader
    from "@material-ui/core/CardHeader/CardHeader";
import CardContent
    from "@material-ui/core/CardContent/CardContent";
import Card
    from "@material-ui/core/Card/Card";
import Box from "@material-ui/core/Box";
import {withStyles} from "@material-ui/core";
import {
    ArrowDownward,
    ArrowUpward
} from "@material-ui/icons";
import {
    blue,
    red
} from "@material-ui/core/colors";
import Typography
    from "@material-ui/core/Typography/Typography";

const styles = theme => ({
    card: {
        margin: theme.spacing(2),
    },

});

class ForecastContainer extends Component {

    state = {
      currentDay: null
    };

    componentDidMount() {
        this.setState({currentDay: this.props.forecastLocation.forecast[0]});
    }

    setCurrentDayHandler = (index) => {
        this.setState({currentDay: this.props.forecastLocation.forecast[index]})
    };

    render() {
        const {classes} = this.props;
        return (
            <Card elevation={6} className={classes.card}>
                <CardHeader
                    title={this.props.forecastLocation.city}
                    subheader={this.props.forecastLocation.country} />
                <CardContent>
                    {this.state.currentDay !== null ?
                        <Box p={2} mt={-2} mb={2}>
                            <Typography variant="h2">
                                {this.state.currentDay.weekday}
                            </Typography>
                            <Typography variant="h5">
                                Temperature: {this.state.currentDay.comfort}&#176;C
                            </Typography>
                            <Typography>
                                Humidity: {this.state.currentDay.humidity}%
                            </Typography>
                            <Typography>
                                Wind: {this.state.currentDay.windSpeed}m/s  {this.state.currentDay.windDescShort}
                            </Typography>
                        </Box>
                        : null
                    }

                    <Box display="flex">
                    {this.props.forecastLocation.forecast.map((forecast, index) => {
                        return <Box component="div"
                                    display="inline"
                                    flexGrow={1}
                                    textAlign="center"
                                    key={index}
                                    style={{cursor: "pointer"}}
                                    onClick={()=>this.setCurrentDayHandler(index)}>
                            <Box textAlign="center">{forecast.weekday}</Box>
                            <img src={forecast.iconLink + `?apiKey=${process.env.REACT_APP_WEATHER_API_KEY}`} />
                            <Box display="flex" alignItems="center" justifyContent="center">
                                <ArrowUpward style={{ color: red[500] }}/>
                                <Typography
                                    color="textSecondary">
                                    {forecast.highTemperature} &#176;C
                                </Typography>
                            </Box>
                            <Box display="flex" alignItems="center" justifyContent="center">
                                <ArrowDownward style={{ color: blue[500] }}/>
                                <Typography
                                    color="textSecondary">
                                    {forecast.lowTemperature} &#176;C
                                </Typography>
                            </Box>
                        </Box>
                    })
                    }
                    </Box>
                </CardContent>
            </Card>
        )
    }
}

export default withStyles(styles)(ForecastContainer);