import React from 'react';
import ReactDOM from 'react-dom'
import Map from './Map.jsx';
import { GoogleApiWrapper } from 'google-maps-react';

class Wrapper extends React.Component{
  constructor(props) {
    super(props)
  }

  render() {
    return (<Map google={this.props.google} zips={this.props.zips}/>)
  }
}

export default GoogleApiWrapper({
   apiKey:  'AIzaSyBUGsx7UGJYA0b_DDZAL9sIl3EM44ysaLs',
   libraries: ['visualization']
 })(Wrapper)
