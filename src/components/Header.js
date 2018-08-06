import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import LiveTv from '@material-ui/icons/LiveTv';
import Search from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Hidden from '@material-ui/core/Hidden';

const styles = {
  root: {
    flexGrow: 1
  },
  name: {
    flexGrow: 1.5
  },
  search: {
    flexGrow: 1
  },
  logo: {
    marginRight: 10
  }
};

const Header = ({ classes, search, changeSearch, fetch, goHome }) => (
  <div className={classes.root}>
    <AppBar position="static" >
      <Toolbar>
        <IconButton className={classes.logo} onClick={goHome} >
          <LiveTv />
        </IconButton>
        <Hidden smDown>
          <Typography variant="title" color="inherit" className={classes.name}>
            YouTube Clone
          </Typography>
        </Hidden>
        <div className={classes.search}>
          <TextField
            placeholder="Type here"
            autoFocus
            fullWidth
            onChange={e => changeSearch(e.target.value)}
            value={search}
            onKeyPress={e =>
              { if (e.key === 'Enter') fetch(); }
            }
          />
        </div>
        <IconButton onClick={fetch} >
          <Search />
        </IconButton>
      </Toolbar>
    </AppBar>
  </div>
);

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  search: PropTypes.string.isRequired,
  changeSearch: PropTypes.func.isRequired,
  fetch: PropTypes.func.isRequired,
  goHome: PropTypes.func.isRequired
};

export default withStyles(styles)(Header);