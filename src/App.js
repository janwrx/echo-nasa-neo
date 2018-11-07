import React, { Component } from 'react';
import { PageHeader, Blockquote, Table} from 'react-bootstrap';
import neoData from './sample-neo';

class App extends Component {
  constructor(props){
    super(props)
    let today = new Date()
    this.state = {
      apiKey: "Cb6SvFiUSTAnMicBhjCzZCCzdeLR59CFmEIU1kt8",
      startDate:`${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`,
      apiUrl: "https://api.nasa.gov/neo/rest/v1/feed",
      rawData: neoData,
      asteroids: []
    }
  }

    componentWillMount(){
      console.log(`${this.state.apiUrl}?start_date=${this.state.startDate}&api_key=${this.state.apiKey}`)
      fetch(`${this.state.apiUrl}?start_date=${this.state.startDate}&api_key=${this.state.apiKey}`).then((rawResponse)=>{
    return rawResponse.json()
  }).then((parsedResponse) => {
    let neoData = parsedResponse.near_earth_objects
    let newAsteroids = []
    Object.keys(neoData).forEach((date)=>{
      neoData[date].forEach((asteroid) =>{
        newAsteroids.push({
          id: asteroid.neo_reference_id,
          name: asteroid.name,
          date: asteroid.close_approach_data[0].close_approach_date,
          diameterMin: asteroid.estimated_diameter.feet.estimated_diameter_min.toFixed(0),
          diameterMax: asteroid.estimated_diameter.feet.estimated_diameter_max.toFixed(0),
          closestApproach: asteroid.close_approach_data[0].miss_distance.miles,
          velocity: parseFloat(asteroid.close_approach_data[0].relative_velocity.miles_per_hour).toFixed(0),
          distance: asteroid.close_approach_data[0].miss_distance.miles
        })
      })
    })
    this.setState({asteroids: newAsteroids})
    })
  }
  render() {
    return (
      <div className="App">
        <PageHeader> <img src="https://images.theconversation.com/files/193808/original/file-20171108-14177-b9ea8f.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1012&h=668&fit=crop" height="167px" width="253px"/>Our Meteor Tracker </PageHeader>

        <blockquote>
        <p>Throw your dreams into space like a kite, and you do not know what it will bring back, a new life, a new friend, a new love, a new country.</p>
        <small>Anais Nin </small> </blockquote>
<table class="table table-striped table-hover ">
  <thead>
    <tr>
       <th class="success">Name</th>
       <th class="info">Estimated Diameter (feet)</th>
       <th class="warning">Date of Closest Approach</th>
       <th class="danger">Distance (miles)</th>
       <th class="success">Velocity (miles/hour)</th>
    </tr>
  </thead>
  <tbody>
    {this.state.asteroids.map((asteroid)=>{
      return(
        <tr key={asteroid.id}>
          <td>{asteroid.name}</td>
          <td>{asteroid.diameterMin} - {asteroid.diameterMax}</td>
          <td>{asteroid.date}</td>
          <td>{asteroid.distance}</td>
          <td>{asteroid.velocity}</td>
        </tr>
        )
      })
  }
  </tbody>
</table>
      </div>
    );
  }
}

export default App;
