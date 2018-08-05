import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import { getVideos } from './api';

import Header from './components/Header';
import Videos from './components/Videos';
import Player from './components/Player';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#ffffff',
      main: '#fafafa',
      dark: '#c7c7c7',
      contrastText: '#f44336',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#fafafa',
    },
  },
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      searchQuery: '',
      videos: null,
      id: ''
    };
  }

  componentDidMount() {
    this.fetchVideos();
  }

  fetchVideos() {
    this.setState({ videos: null, searchQuery: this.state.search });
    getVideos(this.state.search)
      .then(data => this.setState({ videos: data }))
      .catch(err => alert(err.message));
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <React.Fragment>
          <CssBaseline />
          <Header 
            search={this.state.search} 
            changeSearch={search => this.setState({ search })} 
            fetch={this.fetchVideos.bind(this)} 
            goHome={() => this.setState({ id: '' })}
          />
          { this.state.id 
            ? <Player id={this.state.id} /> 
            : !this.state.videos || 
              <Videos 
                tileData={this.state.videos} 
                searchQuery={this.state.searchQuery} 
                playVideo={id => () => this.setState({ id })}
              /> 
          }
        </React.Fragment>
      </MuiThemeProvider>
    );
  }
}

export default (App);
