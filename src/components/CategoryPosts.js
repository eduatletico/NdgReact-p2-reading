import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import PostMin from './PostMin'
import { handleReceiveCategoryPosts, sortPostsByDate, sortPostsByVote } from '../actions/posts'
import { Link } from "react-router-dom"

import { withStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing.unit * 2,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  link: {
    textDecoration: 'none',
    display: 'block'
  },
  select: {
    color: '#ffffff',
    '&:before': {
      borderColor: '#ffffff',
    },
    '&:after': {
      borderColor: '#ffffff',
    },
    '&:hover': {
      borderColor: '#ffffff !important',
      color: '#000000'
    }
  },
  icon: {
    fill: '#ffffff',
  },
});

class CategoryPosts extends Component {
  state = {
    order: 'v'
  }

  componentDidMount() {
    this.props.dispatch(handleReceiveCategoryPosts(this.props.match.params.category))
  }

  handleChange = name => event => {

    this.setState({order: 'v'})

    if (event.target.value !== '') {
      this.props.history.push(`/${event.target.value}`);
    } else {
      this.props.history.push(`/`)
    }
  };

  handleChangeOrder = name => event => {
    this.setState({ order: event.target.value })

    const { dispatch, posts } = this.props

    if (event.target.value === 'd') {
      dispatch(sortPostsByDate(posts))
    } else {
      dispatch(sortPostsByVote(posts))
    }
  }

  render() {
    window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true

    const { classes } = this.props;

    return (
      <Fragment>

        <AppBar position="static" style={{height:64}}>
          <Toolbar>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              Nanodegree React - [P2] Readable - [Filtered by category {this.props.match.params.category}]
            </Typography>
            <Link to={`/`} className={classes.link} style={{color:"inherit"}}>
              <Button color="inherit">Home</Button>
            </Link>
            <Link to={`/new`} className={classes.link} style={{color:"inherit"}}>
              <Button color="inherit">New Post</Button>
            </Link>

            <FormControl className={classes.formControl} style={{width:150}}>
              <InputLabel htmlFor="category_id" style={{color:'#ffffff'}}>Filter by Category</InputLabel>
              <Select
                className={classes.select}
                value={this.props.match.params.category}
                native
                onChange={this.handleChange('category')}
                inputProps={{
                  name: 'category',
                  id: 'category_id',
                  classes: {
                    icon: classes.icon,
                  },
                }}
              >
                <option value="" />
                {this.props.categories.map((category) => <option key={category.name} value={category.name}>{category.name}</option>)}
              </Select>
            </FormControl>

            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="order_by" style={{color:'#ffffff'}}>Order by</InputLabel>
              <Select
                className={classes.select}
                native
                onChange={this.handleChangeOrder('order_by')}
                value={this.state.order}
                inputProps={{
                  name: 'order_by',
                  id: 'order_by',
                  classes: {
                    icon: classes.icon,
                  },
                }}
              >
                <option value="v">Vote Score</option>
                <option value="d">Date</option>
              </Select>
            </FormControl>

          </Toolbar>
        </AppBar>

        <Grid container className={classes.root} spacing={16}>
          <Grid item xs={12}>
            <Paper className={classes.control}>
              <Grid container className={classes.demo} justify="center" spacing={24}>
                {this.props.postsIds.length > 0 ? (
                  this.props.postsIds.map((id) => (
                    <Grid key={id} item>
                      <PostMin id={id} />
                    </Grid>
                  ))
                ) : 'There are no posts inside this category'}

              </Grid>
            </Paper>
          </Grid>
        </Grid>

      </Fragment>
    )
  }
}

function mapStateToProps ({ posts, categories }, props) {
  const { category } = props.match.params

  return {
    posts,
    postsIds: Object.keys(posts).filter(id => posts[id].category === category).filter((id) => posts[id].deleted === false),
    categories: Object.entries(categories).map(([idx, category]) => category)
  }
}

export default withStyles(styles)(connect(mapStateToProps)(CategoryPosts))