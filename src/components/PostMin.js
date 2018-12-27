import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatDate } from '../utils/helpers'
import { handleVotePost, handleDisablePost } from '../actions/posts'
import { Link } from 'react-router-dom'

import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardActions from '@material-ui/core/CardActions'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import ThumbUp from '@material-ui/icons/ThumbUp'
import ThumbDown from '@material-ui/icons/ThumbDown'
import Typography from '@material-ui/core/Typography'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

const styles = {
  card: {
    minWidth: 420,
    maxWidth: 420,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    textAlign: 'right',
    marginLeft: 'auto',
  },
  link: {
    textDecoration: 'none',
    display: 'block'
  }
};

class PostMin extends Component {
  state = {
    anchorEl: null,
    openDialog: false
  }

  votePost = (e, vote) => {
    e.preventDefault()
    const { dispatch, post } = this.props
    dispatch(handleVotePost(post, vote))
  }

  disablePost = (e) => {
    e.preventDefault()
    const { dispatch, post } = this.props
    dispatch(handleDisablePost(post))
    this.handleCloseDialog()
  }

  handleClickMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };
  handleCloseMenu = () => {
    this.setState({ anchorEl: null });
  };

  handleClickOpenDialog = () => {
    this.handleCloseMenu()
    this.setState({ openDialog: true });
  };
  handleCloseDialog = () => {
    this.setState({ openDialog: false });
  };

  render() {
    window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true

  	const { classes, post } = this.props
    const { anchorEl } = this.state

  	if (post === null) {
  		return <p>Post doesn't exist</p>
  	}

  	const {
  		id, timestamp, title, category, voteScore, author
  	} = post

    const subHeader = "At " + formatDate(timestamp) + " - In " + category + " - By " + author

    return (
      <Card className={classes.card}>
        <CardHeader
          action={
            <IconButton
              aria-owns={anchorEl ? 'simple-menu' : undefined}
              aria-haspopup="true"
              onClick={this.handleClickMenu}
            >
              <MoreVertIcon />
            </IconButton>
          }
          title={title}
          subheader={subHeader}
        />
        <CardActions>
          <Link to={`/post/${id}`} className={classes.link}>
            <Button size="small">View more</Button>
          </Link>
          <Typography className={classes.pos} color="textSecondary">
            <IconButton onClick={(e) => this.votePost(e, true)}>
              <ThumbUp />
            </IconButton>
            {voteScore}
            <IconButton onClick={(e) => this.votePost(e, false)}>
              <ThumbDown />
            </IconButton>
          </Typography>
        </CardActions>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleCloseMenu}
        >
          <MenuItem onClick={this.handleClickOpenDialog}>Disable</MenuItem>
          <Link to={`/new/${id}`} className={classes.link}>
            <MenuItem onClick={this.handleCloseMenu}>Edit</MenuItem>
          </Link>
        </Menu>
        <Dialog
          open={this.state.openDialog}
          onClose={this.handleCloseDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Disable this Post?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Do you want to disable this post?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseDialog} color="primary">
              No
            </Button>
            <Button onClick={this.disablePost} color="primary" autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </Card>
    )

  }
}

function mapStateToProps ({ posts }, { id }) {
  const post = posts[id]

  return {
  	post: post
  		? post
  		: null
  }
}

export default withStyles(styles)(connect(mapStateToProps)(PostMin))