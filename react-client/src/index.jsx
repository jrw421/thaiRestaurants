import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Map from './components/Map.jsx';
import axios from 'axios';
import Wrapper from './components/mapWrapper.jsx';
import { GoogleApiWrapper } from 'google-maps-react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      zipcodeState: []
    }
  }

  componentDidMount() {
    $.ajax({
      url: '/items',
      success: (data) => {
        console.log('here is your data success in mount', data)
        this.setState({
          items: data
        })
      },
      error: (err) => {
        console.log('we erroring?', err);
      }
    });
    this.getZips()
  }

getZips() {
  let zippie = []
  axios.get('/zip')
  .then((res) => {
    console.log('res ', res.data)
    this.setState({
      zipcodeState: res.data
    })
  })
}

  render () {
    let count = 0
    return (
      <div>
      <header className="header">    Thai Restaurant List  </header>
      <table id="table">
        <tr>
          <th>#</th>
          <th>Restaurant Name</th>
          <th>Zipcode</th>
          <th>Grade</th>
        </tr>
      {this.state.items.map((item, i) => {
        {console.log('item score ', item.score)}
        count++

       return (
         <tr>
           <td> {count}</td>
           <td> {item.name}</td>
           <td> {item.zipcode}</td>
           <td> {item.grade} </td>
         </tr>
       )
      })}
    </table>
      {this.state.zipcodeState.length ?
        <Wrapper zips={this.state.zipcodeState}/>
        :  <div>loading...</div>}
      <div id="panel"></div>
    </div>)
  }
}


ReactDOM.render(<App />, document.getElementById('app'));
