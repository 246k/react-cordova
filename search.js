import React from "react";
import { Component } from "react";
import axios from "axios";
import { geolocated } from "react-geolocated";
import GoogleMapReact from "google-map-react";
import {
  Button,
  TextField,
  IconButton,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import GpsFixedOutlinedIcon from "@material-ui/icons/GpsFixedOutlined";
import BeachAccessOutlinedIcon from "@material-ui/icons/BeachAccessOutlined";
import CloudOutlinedIcon from "@material-ui/icons/CloudOutlined";
import WbSunnyOutlinedIcon from "@material-ui/icons/WbSunnyOutlined";
import BarChartOutlinedIcon from "@material-ui/icons/BarChartOutlined";
import OpacityOutlinedIcon from "@material-ui/icons/OpacityOutlined";
import WavesOutlinedIcon from "@material-ui/icons/WavesOutlined";
import SwapVertOutlinedIcon from "@material-ui/icons/SwapVertOutlined";

// const Header = () => (
//   <div>
//     <a
//       onClick={this.onClick}
//       style={{ textDecoration: "none", color: "unset" }}
//     >
//       <h1 style={{ fontSize: "40px", fontWeight: 400, color: "gray" }}>
//         Weath
//         <BeachAccessOutlinedIcon />r App
//       </h1>
//     </a>
//     <hr />
//   </div>
// );

class Search extends Component {
  static defaultProps = {
    url: "https://api.openweathermap.org/data/2.5/weather",
    appid: "bfff4028c5c6863452078ca543b4f0e0",
    googleMapsKey: "AIzaSyD9AziGNYT10D5TXQqoZoi3jeo6jLfq64s",
    errorMessage: "No results found.",
    zoom: 12,
  };
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      input: "",
      weather: null,
      main: null,
      description: null,
      latitude: null,
      longitude: null,
      temperature: null,
      humidity: null,
      name: null,
      wind_speed: null,
      feels_like: 0,
      error: false,
      cloudiness: null,
      pressure: null,
    };
  }

  onKeyUp = (event) => {
    this.setState({ input: event.target.value });
    if (!event) event = window.event;
    var keyCode = event.code || event.key;
    if (keyCode == "Enter") {
      console.log(keyCode);
      this.getData();
    }
  };

  setData = ({ response }) => {
    const data = response.data;
    const weather = response.data.weather;
    const name = response.data.name;
    const description = response.data.weather[0].description;
    const main = response.data.weather[0].main;
    const latitude = response.data.coord.lat;
    const longitude = response.data.coord.lon;
    const temperature = response.data.main.temp + "° F";
    const feels_like = response.data.main.feels_like + "° F";
    const humidity = response.data.main.humidity;
    const wind_speed = response.data.wind.speed;
    const cloudiness =
      response.data.clouds.all < 50
        ? response.data.clouds.all > 15 && response.data.clouds.all < 50
          ? "Partially Cloudy"
          : "Clear"
        : "Cloudy";
    const pressure = response.data.main.pressure;
    this.setState({ data });
    this.setState({ description });
    this.setState({ name });
    this.setState({ weather });
    this.setState({ main });
    this.setState({ latitude });
    this.setState({ longitude });
    this.setState({ temperature });
    this.setState({ feels_like });
    this.setState({ humidity });
    this.setState({ wind_speed });
    this.setState({ cloudiness });
    this.setState({ pressure });
    this.setState({ error: false });
  };

  getData() {
    if (isNaN(this.state.input)) {
      axios
        .get(this.props.url, {
          params: {
            appid: this.props.appid,
            q: this.state.input,
            units: "imperial",
          },
        })
        .then((response) => {
          this.setData({ response });
        })
        .catch((response) => {
          this.setState({ error: true });
        });
    } else {
      axios
        .get(this.props.url, {
          params: {
            appid: this.props.appid,
            zip: this.state.input,
            units: "imperial",
          },
        })
        .then((response) => {
          this.setData({ response });
        })
        .catch((response) => {
          this.setState({ error: true });
        });
    }
  }

  onClick = () => {
    this.setState({ weather: null });
    this.setState({ data: null });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.getData();
  };

  handleLocationSubmit = (event) => {
    event.preventDefault();
    axios
      .get(this.props.url, {
        params: {
          appid: this.props.appid,
          lat: this.props.coords.latitude,
          lon: this.props.coords.longitude,
          units: "imperial",
        },
      })
      .then((response) => {
        this.setData({ response });
      })
      .catch((response) => {
        this.setState({ error: true });
      });
  };

  render() {
    const results = this.state.weather != null ? true : false;
    return (
      <div>
        <div style={{ textAlign: "center" }}>
          <div>
            <a
              onClick={this.onClick}
              style={{ textDecoration: "none", color: "unset" }}
            >
              <h1 style={{ fontSize: "40px", fontWeight: 400, color: "gray" }}>
                Weath
                <BeachAccessOutlinedIcon />r App
              </h1>
            </a>
            <hr />
          </div>
          {!results && (
            <div>
              <Grid
                container
                spacing={2}
                direction="column"
                alignItems="center"
                justify="flex-start"
                style={{ padding: "20px 0px" }}
              >
                <Grid
                  container
                  item
                  sm={12}
                  style={{ display: "inline-block" }}
                >
                  <form style={{ display: "inline-block" }}>
                    <TextField
                      label="City, State, or Zip Code"
                      color="primary"
                      onKeyUp={this.onKeyUp}
                    />
                    <IconButton onClick={this.handleSubmit}>
                      <SearchIcon fontSize="large" />
                    </IconButton>
                  </form>
                </Grid>
                <Grid
                  container
                  item
                  sm={12}
                  style={{ display: "inline-block" }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<GpsFixedOutlinedIcon />}
                    onClick={this.handleLocationSubmit}
                  >
                    Current Location
                  </Button>
                </Grid>
              </Grid>
              <p>{this.state.error && <p>{this.props.errorMessage}</p>}</p>
            </div>
          )}
        </div>
        {!this.state.error && this.state.data != null && (
          <Grid
            container
            direction="column"
            alignItems="center"
            justify="flex-start"
            style={{ padding: "20px" }}
          >
            <h2 style={{ color: "gray", margin: "0px" }}>
              Weather in {this.state.name}
            </h2>
            <h3
              style={{
                textTransform: "capitalize",
                fontWeight: 200,
                color: "gray",
                marginTop: "0px",
              }}
            >
              {this.state.description}
            </h3>
            <List style={{ padding: "20px" }}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <BarChartOutlinedIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    this.state.temperature +
                    " feels like " +
                    this.state.feels_like
                  }
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    {this.state.cloudiness == "Clear" && (
                      <WbSunnyOutlinedIcon />
                    )}
                    {this.state.cloudiness != "Clear" && <CloudOutlinedIcon />}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={this.state.cloudiness} />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <OpacityOutlinedIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={"Humidity: " + this.state.humidity + "%"}
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <WavesOutlinedIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={"Wind speed: " + this.state.wind_speed + " mph"}
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <LocationOnOutlinedIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    "Geographic Coordinates: " +
                    this.state.longitude +
                    ", " +
                    this.state.latitude
                  }
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <SwapVertOutlinedIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    "Atmospheric Pressure: " + this.state.pressure + " atm"
                  }
                />
              </ListItem>
            </List>
          </Grid>
        )}

        {!this.state.error &&
          this.state.data != null &&
          this.state.latitude != null &&
          this.state.longitude != null && (
            <div
              style={{
                height: "50vh",
                padding: "20px",
                margin: "20px",
              }}
            >
              <GoogleMapReact
                bootstrapURLKeys={{
                  key: this.props.googleMapsKey,
                }}
                defaultCenter={{
                  lat: this.state.latitude,
                  lng: this.state.longitude,
                }}
                defaultZoom={this.props.zoom}
              >
                <div>
                  <LocationOnOutlinedIcon fontSize="large" color="secondary" />
                </div>
              </GoogleMapReact>
            </div>
          )}
        <footer style={{ backgroundColor: "grey" }}>
          <div
            style={{
              padding: "30px",
              textAlign: "center",
              color: "whitesmoke",
            }}
          >
            Kate Kraynak
            <br />
            Z23148954
          </div>
        </footer>
      </div>
    );
  }
}
export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(Search);
