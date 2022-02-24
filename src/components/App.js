import React, {Component} from "react";
import {
  BrowserRouter,
  Switch,
  Route, 
} from "react-router-dom";
import axios from 'axios';
import apiKey from './config';

//Components//
import Nav from './Nav';
import PhotoContainer from './PhotoContainer';
import NotFound from './NotFound';
import SearchForm from './SearchForm';

//Flickr API//
const photoKey = apiKey;


class App extends Component {
  
  constructor() {
    super();
    this.state = {
      photos: [], 
      cats: [],
      dogs: [], 
      horses: [],
      loading: true, 
      query: ''
    };
  }

  componentDidMount() {
    this.performSearch();
    this.performSearch('cats');
    this.performSearch('dogs');
    this.performSearch('horses');
  }


  //searching queries to provide correct photos using if/else if statements
  performSearch = (query) => {
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${photoKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
      .then(response => {
        if(query === 'cats') {
          this.setState({
          cats: response.data.photos.photo,
          loading: false,
          });
        } else if (query === 'dogs'){
          this.setState({
          dogs: response.data.photos.photo,
          loading: false,
          });
        } else if (query === 'horses') {
          this.setState({
          horses: response.data.photos.photo,
          loading: false,
          });
        } else {
          this.setState({
          photos: response.data.photos.photo,
          loading: false,
            });
        }
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error)
      });
  }


  //component routes being using in project
  render() {
    return (
      <BrowserRouter>
        <div className="container">
        <SearchForm onSearch={this.performSearch}/>
          <Nav />
          <Switch>
            <Route exact path="/" render={() =><PhotoContainer data={this.state.photos} query='cats' loading={this.state.loading} photos={this.state.photos} />}/>
            <Route path="/cats" render={() => <PhotoContainer data={this.state.cats} query='cats' loading={this.state.loading} photos={this.state.cats} />}/>
            <Route path="/dogs" render={() => <PhotoContainer data={this.state.dogs} query='dogs' loading={this.state.loading} photos={this.state.dogs} />}/>
            <Route path="/horses" render={() => <PhotoContainer data={this.state.horses} query='horses' loading={this.state.loading} photos={this.state.horses} />}/>
            <Route element={NotFound}/>
          </Switch>
        </div>
      </BrowserRouter>
      );
    }
    
}

export default App;


