import React from 'react';
import ReactDOM from 'react-dom'
import {withGoogleMap, GoogleMap, Marker} from 'react-google-maps';
import axios from 'axios';
import zipcodes from 'zipcodes';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'

class Map extends React.Component {
  constructor(props) {
    super(props)
    this.getMap = this.getMap.bind(this)
  }

componentDidUpdate(prevProps, prevState) {
  if (prevProps.google !== this.props.google) {
    this.getMap();
  }
}

//Based on the props from the wrapper, render the map
getMap() {
    if (this.props && this.props.google) {
      const {google} = this.props;
      const maps = google.maps;
      const ref = this.refs.map;
      const findDiv = ReactDOM.findDOMNode(ref);

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
        //push the weight of each zipcode and the transformed zipcodes to the storage
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
      <header className="header2">Thai Restaurants per Zipcode with an A or B Rating</header>
      <div ref="map" id="map">
        loading map...
      </div>
    </div>
    )
  }
}

export default Map;
