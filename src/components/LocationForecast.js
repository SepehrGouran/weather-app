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
    ArrowUpward, InvertColors, LocationOn, Waves
} from "@material-ui/icons";
import {
    blue,
    red
} from "@material-ui/core/colors";
import Typography
    from "@material-ui/core/Typography/Typography";
import Grid from "@material-ui/core/Grid/Grid";
import CardActions from "@material-ui/core/CardActions/CardActions";
import Button from "@material-ui/core/Button/Button";

const styles = theme => ({
    card: {
        margin: theme.spacing(2),
    },

});

class LocationForecast extends Component {

    render() {
        const {classes} = this.props;
        return (
            <Card
                elevation={6}
                className={classes.card}>
                <CardContent>
                    <Grid
                        container
                        spacing={3}>
                        <Grid
                            item
                            md={6}>
                            <Typography
                                color="textSecondary"
                                gutterBottom>
                                {this.props.location.country}
                            </Typography>
                            <Typography
                                variant="h5"
                                component="h2">
                                {this.props.location.city}
                            </Typography>

                            <Box
                                display="flex"
                                mt={2}>
                                <LocationOn/>
                                <Typography
                                    color="textSecondary">
                                    Lat:{this.props.location.latitude} Long:{this.props.location.longitude}
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid
                            item
                            md={3}>
                            {this.props.location.observation.length > 0 ?
                                <Typography
                                    variant="h5"
                                    component="h2">
                                    {this.props.location.observation[0].temperature} &#176;C
                                </Typography> : null}

                            <Box
                                display="flex"
                                mt={2}>
                                <ArrowUpward
                                    style={{color: red[500]}}/>
                                <Typography
                                    color="textSecondary">
                                    {this.props.location.observation[0].highTemperature} &#176;C
                                </Typography>
                            </Box>
                            <Box
                                display="flex"
                                mt={2}>
                                <ArrowDownward
                                    style={{color: blue[500]}}/>
                                <Typography
                                    color="textSecondary">
                                    {this.props.location.observation[0].lowTemperature} &#176;C
                                </Typography>
                            </Box>

                        </Grid>

                        <Grid
                            item
                            md={3}>
                            {this.props.location.observation.length > 0 ?
                                <Typography
                                    variant="h5"
                                    component="h2">
                                    {this.props.location.observation[0].description}
                                </Typography> : null}

                            <Box
                                display="flex"
                                mt={2}>
                                <InvertColors/>
                                <Typography
                                    color="textSecondary">
                                    {this.props.location.observation[0].humidity}%
                                </Typography>
                            </Box>
                            <Box
                                display="flex"
                                mt={2}>
                                <Waves/>
                                <Typography
                                    color="textSecondary">
                                    {this.props.location.observation[0].windSpeed}m/s {this.props.location.observation[0].windDescShort}
                                </Typography>
                            </Box>

                        </Grid>
                    </Grid>

                </CardContent>
                <CardActions>
                    <Button
                        variant="outlined"
                        size="small"
                        onClick={this.props.sevenDayForecast}
                    >View 7 day forecast</Button>
                </CardActions>
            </Card>
        )
    }
}

export default withStyles(styles)(LocationForecast);