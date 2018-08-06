import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import YouTube from 'react-youtube';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
import { styles as recommendedVideosStyle, TitlebarGridList } from './Videos';

import { getRecommendedVideos } from '../api';

const RecommendedVideos = withStyles(recommendedVideosStyle)(TitlebarGridList);

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginRight: 30,
    marginLeft: 30,
    marginTop: 10
  }
});

class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {
      video: this.props.video,
      recommendedVideos: null
    };
    this.classes = this.props.classes;
    this.opts = {
      height: '400',
      width: '100%',
      playerVars: {
        autoplay: 1
      }
    };
  }

  componentDidMount() {
    this.fetchVideos();
  }

  changeVideo(video) {
    this.setState({ video });
    this.fetchVideos();
  }

  fetchVideos() {
    this.setState({ recommendedVideos: null });
    getRecommendedVideos(this.state.video.id)
      .then(data => this.setState({ recommendedVideos: data }))
      .catch(err => alert(err.message));
  }

  render() {
    return (
      <div className={this.classes.root}>
        <Grid container justify="center" alignItems="flex-start" spacing={0}>
          <Grid item xs={12} md={6}>
            <Grid container direction="column" justify="flex-start" alignItems="stretch">
              <YouTube
                videoId={this.state.video.id}
                opts={this.opts}
              />
              <Typography variant="subheading" gutterBottom>
                {this.state.video.title}
              </Typography>
              <Typography variant="body2" gutterBottom>
                {this.state.video.author}
              </Typography>
              <Hidden smDown>
                <Typography variant="body1" gutterBottom align="left">
                  {this.state.video.description}
                </Typography>
              </Hidden>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6}>
            {!this.state.recommendedVideos
              ? <RecommendedVideos tileData={[]} cols={1} playVideo={video => () => this.changeVideo(video)} />
              : <RecommendedVideos tileData={this.state.recommendedVideos} cols={1} playVideo={video => () => this.changeVideo(video)} />
            }
          </Grid>
        </Grid>
      </div>
    );
  }
}

Player.propTypes = {
  classes: PropTypes.object.isRequired,
  video: PropTypes.object.isRequired
};

export default withStyles(styles)(Player);
