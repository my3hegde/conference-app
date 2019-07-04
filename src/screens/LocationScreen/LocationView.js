import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MapView } from 'expo'
import config from '../../config';

class LocationView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      conference: {},
      markers: [{
        "title": "Chinese Cultural Centre",
        "coordinates": {
          "latitude": 43.794994,
          "longitude": -79.233486
        }
      },
      {
          "title": "Picnic - Thomson Memorial Park",
          "coordinates": {
            "latitude": 43.75819310000001,
            "longitude": -79.253826
        }
      },
      {
        "title": "Edwards Hotel",
        "coordinates": {
          "latitude": 43.84741809999996,
          "longitude": -79.3649714
      }
    },
    {
      "title": "Centennial Place Residence",
      "coordinates": {
        "latitude": 43.78494840000004,
        "longitude": -79.22999709999999
    }
  }]
    };
  }

  componentDidMount() {
    const { getInfo } = this.props;
    getInfo();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.completed) {
      this.setState({
        conference: nextProps.conference,
        error: nextProps.error,
        completed: nextProps.completed
      });
    }
  }

  setMarkerRef = (ref) => {
    this.marker = ref;
    if (this.marker) {
      this.marker.showCallout();
    }
  }

  render() {
    const location = (this.props.conference.location || {});
    return (
      <MapView
        style={{ flex: 1 }}
        loadingEnabled={true}
        region={{
          latitude: location.latitude || 43.794994,
          longitude:location.longitude || -79.233486,
          latitudeDelta: 0.015,
          longitudeDelta: 0.015
        }}
        loadingBackgroundColor={config.PRIMARY_BG_COLOR}
        loadingIndicatorColor={config.PRIMARY_TEXT_COLOR}>
        {this.state.markers.map((marker, index) => (<MapView.Marker key={index} coordinate={marker.coordinates} title={marker.title} ref={this.setMarkerRef} />))}
      </MapView>
    );
  }

}

LocationView.propTypes = {
  getInfo: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired,
  conference: PropTypes.object.isRequired
};

export default LocationView;