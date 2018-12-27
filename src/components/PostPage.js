import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import Post from './Post'
import { Link } from "react-router-dom"

import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  grow: {
    flexGrow: 1,
  },
  control: {
    padding: theme.spacing.unit * 2,
  },
  link: {
    textDecoration: 'none',
    display: 'block'
  },
});

class PostPage extends Component {
	render() {
		window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true

		const { id, classes } = this.props

		return (
			<Fragment>
				<AppBar position="static" style={{height:64}}>
          <Toolbar>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              Nanodegree React - [P2] Readable - [Post Details]
            </Typography>
            <Link to={`/`} className={classes.link} style={{color:"inherit"}}>
              <Button color="inherit">Home</Button>
            </Link>
            <Link to={`/new/${id}`} className={classes.link} style={{color:"inherit"}}>
              <Button color="inherit">Edit Post</Button>
            </Link>
          </Toolbar>
        </AppBar>

        <Grid container className={classes.root} spacing={16}>
          <Grid item xs={12}>
            <Paper className={classes.control}>
              <Grid container className={classes.demo} justify="center" spacing={24}>
                <Post id={id} />
              </Grid>
            </Paper>
          </Grid>
        </Grid>

			</Fragment>
		)
	}
}

function mapStateToProps ({ posts }, props) {
	const { id } = props.match.params

	return {
		id
	}
}

export default withStyles(styles)(connect(mapStateToProps)(PostPage))