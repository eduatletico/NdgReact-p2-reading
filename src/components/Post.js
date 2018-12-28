import React, { Component } from 'react'
import Comment from './Comment'
import NewComment from './NewComment'
import { connect } from 'react-redux'
import { formatDate } from '../utils/helpers'
import { handleReceiveComments } from '../actions/comments'
import { handleVotePost, handleDisablePost } from '../actions/posts'
import { Redirect } from 'react-router'

import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
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

import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

const styles = theme => ({
  card: {
    width: 600,
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
  },
  control: {
    padding: theme.spacing.unit * 2,
    marginBottom: '5px'
  },
});

class Post extends Component {
  state = {
    toHome: false,
    editComment: null,
    anchorEl: null,
    openDialog: false
  }

  componentDidMount() {
    this.props.dispatch(handleReceiveComments(this.props.id))
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
    this.setState({ toHome: true })
  }

  updateStateEditComment = (idComment) => {
    this.setState({ editComment: idComment })
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

  	const { classes, post, comments } = this.props
    const { anchorEl, toHome, editComment } = this.state

    if (toHome === true) {
      return <Redirect to='/' />
    }

  	if (post === null) {
  		return <Card className={classes.card}><CardContent>Post doesn't exist</CardContent></Card>
  	}

  	const {
  		id, timestamp, title, body, author, category, voteScore, commentCount
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
        <CardContent>
          <Typography component="p">
            {body}
          </Typography>
        </CardContent>
        <CardActions>
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
        <CardContent>
          <Typography className={classes.pos} color="textSecondary">
            {commentCount} comment(s)
          </Typography>
          {comments && comments.length > 0 ? (
            comments.map((comment) => (
              comment.parentId === post.id && comment.deleted === false
              ?
                <Paper key={comment.id} className={classes.control}>
                  <Grid container spacing={24}>
                    <Comment id={comment.id} fnUpdate={this.updateStateEditComment} />
                  </Grid>
                </Paper>
              : null
            ))
          ) : null}

          <NewComment id={editComment} parentId={id} fnUpdate={this.updateStateEditComment} />

        </CardContent>

        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleCloseMenu}
        >
          <MenuItem onClick={this.handleClickOpenDialog}>Disable</MenuItem>
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

function mapStateToProps ({ posts, comments }, { id }) {
  const post = posts[id]
  const commentsPost = comments ? Object.keys(comments).map(id => comments[id]).sort((a,b) => b.voteScore - a.voteScore) : null

  return {
  	post: post
  		? post
  		: null,
    comments: commentsPost
  }
}

export default withStyles(styles)(connect(mapStateToProps)(Post))