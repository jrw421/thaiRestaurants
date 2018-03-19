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
    this.getZips = this.getZips.bind(this)
  }

  componentDidMount() {
    $.ajax({
      url: '/items',
      success: (data) => {
        this.setState({
          items: data
        })
      },
      error: (err) => {
        console.log('error in mount', err);
      }
    });
    this.getZips()
  }

getZips() {
  let zippie = []
  axios.get('/zip')
  .then((res) => {
    this.setState({
      zipcodeState: res.data
    })
  })
  .catch((err) => {
    console.log(err)
  })
}

  render () {
    let count = 0
    return (
      <div>
      <header className="header">Thai Restaurant List</header>
      <table id="table">
        <tbody>
        <tr>
          <th>#</th>
          <th>Restaurant Name</th>
          <th>Zipcode</th>
          <th>Grade</th>
        </tr>
      {this.state.items.map((item, i) => {
      count++

       return (
         <tr key={i}>
           <td> {count}</td>
           <td style={{ "cursor": "pointer", "textDecoration": "underline" }}
             onClick={() => {window.open(`https://www.yelp.com/search?find_desc=${item.name}&find_loc=${item.zipcode}`)}}>
             {item.name}</td>
           <td> {item.zipcode}</td>
           <td> {item.grade} </td>
         </tr>
       )
      })}
      </tbody>
    </table>
      {this.state.zipcodeState.length ?
        <Wrapper zips={this.state.zipcodeState}/>
        :  <div>loading...</div>}
      <div id="panel"></div>
    </div>)
  }
}


ReactDOM.render(<App />, document.getElementById('app'));
