import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import Hidden from '@material-ui/core/Hidden';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    marginTop: 10,
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flex: 0.9,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
  video: {
    cursor: 'pointer',
    height: 400
  }
});

const TitlebarGridList = ({ classes, tileData, cols, searchQuery, playVideo }) => (
  <div className={classes.root}>
    <GridList cellHeight={'auto'} className={classes.gridList} cols={cols} cellHeight={400} >
      <GridListTile key="Subheader" cols={cols} style={{ height: 'auto' }}>
        <ListSubheader component="div">{searchQuery ? `Results for ${searchQuery}` : 'Recommended videos'}</ListSubheader>
      </GridListTile>
      {tileData.map(tile => (
        <GridListTile key={tile.img} onClick={playVideo(tile.id)} className={classes.video}>
          <img src={tile.img} alt={tile.title} />
          <GridListTileBar
            title={tile.title}
            subtitle={<span>by: {tile.author}</span>}
          />
        </GridListTile>
      ))}
    </GridList>
  </div>
);

// Wrapper to select 2 columns or 1 depending on screen size
const Videos = (props) => (
  <div>
    <Hidden smDown>
      <TitlebarGridList {...props} cols={2} />
    </Hidden>
    <Hidden mdUp>
      <TitlebarGridList {...props} cols={1} />
    </Hidden>
  </div>
);

Videos.propTypes = {
  classes: PropTypes.object.isRequired,
  tileData: PropTypes.array.isRequired,
  searchQuery: PropTypes.string.isRequired,
  playVideo: PropTypes.func.isRequired
};

export default withStyles(styles)(Videos);