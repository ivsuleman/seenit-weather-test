import React from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends React.Component {
  state = {
    lat: null,
    long: null,
    description: null,
    name: null,
    temp: null,
    humidity: null,
    errorMsg: ""
  };

  componentDidMount() {
    this.getLocation();
  }

  componentDidUpdate() {
    if (!this.state.description) {
      this.getWeather();
    }
  }

  getWeather() {
    const APIKEY = process.env.REACT_APP_APIKEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${
      this.state.lat
    }&lon=${this.state.long}&units=metric&appid=${APIKEY}`;

    fetch(url)
      .then(response => response.json())
      .then(data =>
        this.setState({
          description: data.weather[0].description,
          name: data.name,
          temp: data.main.temp,
          humidity: data.main.humidity,
          sunrise: data.sys.sunrise,
          sunset: data.sys.sunset
        })
      );
  }

  getLocation() {
    window.navigator.geolocation.getCurrentPosition(
      position =>
        this.setState({
          lat: position.coords.latitude,
          long: position.coords.longitude
        }), //return success
      err => this.setState({ errorMsg: err.message }) // return failure
    );
  }

  renderContent() {
    const {
      errorMsg,
      description,
      lat,
      long,
      name,
      temp,
      humidity
    } = this.state;

    if (errorMsg) {
      return <div>Error: {errorMsg}</div>;
    }

    if (description) {
      return (
        <div>
          <p>Your Latitude is: {lat}</p>
          <p>Your Longitude is: {long}</p>
          <p>Location Name: {name}</p>
          <p>Today's Weather Summary: {description}</p>
          <p>Current Temperature (c): {temp}</p>
          <p>Humidity: {humidity}</p>
        </div>
      );
    } else {
      return <div> Loading ...</div>;
    }
  }

  render() {
    return <div>{this.renderContent()}</div>;
  }
}

export default App;
