import React from 'react';
import ReactDOM from 'react-dom'
import {withGoogleMap, GoogleMap, Marker} from 'react-google-maps';
import axios from 'axios';
import zipcodes from 'zipcodes';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'

class Map extends React.Component {
  constructor(props) {
    super(props)
  }

componentDidUpdate(prevProps, prevState) {
  if (prevProps.google !== this.props.google) {
    this.loadMap();
  }
}

loadMap() {
    if (this.props && this.props.google) {
      const {google} = this.props;
      const maps = google.maps;
      const mapRef = this.refs.map;
      const findDiv = ReactDOM.findDOMNode(mapRef);
      const mapConfig = Object.assign({}, {
        center: {lat: zipcodes.lookup(this.props.zips[0].zipcode).latitude, lng: zipcodes.lookup(this.props.zips[0].zipcode).longitude},
        zoom: 11,
        gestureHandling: "cooperative"
      })
      this.map = new maps.Map(findDiv, mapConfig);
      var zipData = [];
      let zips = this.props.zips

      zips.map((zip) => {
        let latLong = zipcodes.lookup(zip.zipcode)
        let num
        if (zip.count < 20) { num = 3 } else if (zip.count > 20) {num = 10} else {num = 5}
        zipData.push({
          location: new google.maps.LatLng(latLong.latitude, latLong.longitude),
          weight: num
        })

      })
      var heatmap = new google.maps.visualization.HeatmapLayer({
        data: zipData,
        radius: 40
      });
      heatmap.setMap(this.map);
    }
  }

  render() {
    return (
      <div>
      <header className="header2">Number of Thai Restaurants per Zipcode with an A or B Rating</header>
      <br></br>
      <div ref="map" id="map">
        loading map...
      </div>
    </div>
    )
  }
}

export default Map;
