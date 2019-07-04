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
        "title": "Chinese Cultural Centre of Greater Toronto",
        "description": "5183 Sheppard Ave E, Scarborough, ON M1B 5Z5",
        "coordinates": {
          "latitude": 43.794994,
          "longitude": -79.233486
        }
      },
      {
          "title": "Picnic - Thomson Memorial Park",
          "description": "1005 Brimley Rd, Scarborough, ON M1P 3E9",
          "coordinates": {
            "latitude": 43.75819310000001,
            "longitude": -79.253826
        }
      },
      {
        "title": "Edwards Hotel",
        "description": "50 E Valhalla Dr, Markham, ON L3R 0A3",
        "coordinates": {
          "latitude": 43.84741809999996,
          "longitude": -79.3649714
      }
    },
    {
      "title": "Centennial Place Residence",
      "description": "937 Progress Ave, Scarborough, ON M1G 3T8",
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
        {this.state.markers.map((marker, index) => (<MapView.Marker key={index} coordinate={marker.coordinates} title={marker.title} description={marker.description} ref={this.setMarkerRef} />))}
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