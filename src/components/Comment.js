import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { formatDate } from '../utils/helpers'
import { handleVoteComment, handleDisableComment } from '../actions/comments'

import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import ThumbUp from '@material-ui/icons/ThumbUp'
import ThumbDown from '@material-ui/icons/ThumbDown'
import Create from '@material-ui/icons/Create'
import Block from '@material-ui/icons/Block'
import Typography from '@material-ui/core/Typography'

import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

class Comment extends Component {
  state = {
    openDialog: false
  }

	voteComment = (e, vote) => {
    e.preventDefault()
    const { dispatch, comment } = this.props
    dispatch(handleVoteComment(comment, vote))
  }

  editComment = (e) => {
    e.preventDefault()
    const { comment, fnUpdate } = this.props
    fnUpdate(comment.id)
  }

  disableComment = (e) => {
    e.preventDefault()
    const { dispatch, comment } = this.props
    dispatch(handleDisableComment(comment))
  }

  handleClickOpenDialog = () => {
    this.setState({ openDialog: true });
  };
  handleCloseDialog = () => {
    this.setState({ openDialog: false });
  };

  render() {
  	const { comment } = this.props

  	const {
  		timestamp, body, author, voteScore
  	} = comment

    return (
      <Fragment>
      	<Typography variant="subtitle2" color="textSecondary" style={{width:'100%'}}>
          <b>{author}</b> at {formatDate(timestamp)} says:&nbsp;
        </Typography>
        <Typography variant="body2" style={{width:'100%',marginLeft:'5px'}}>
          {body}
        </Typography>
        <Typography color="textSecondary" style={{width:'72%'}}>
          <IconButton onClick={(e) => this.voteComment(e, true)}>
            <ThumbUp style={{fontSize: 15}}/>
          </IconButton>
          {voteScore}
          <IconButton onClick={(e) => this.voteComment(e, false)}>
            <ThumbDown style={{fontSize: 15}}/>
          </IconButton>
        </Typography>
        <Typography color="textSecondary">
          <IconButton onClick={this.editComment} style={{fontSize: 13}}>
            <Create style={{fontSize: 15}}/>
            Edit
          </IconButton>
        </Typography>
        <Typography color="textSecondary">
          <IconButton onClick={this.handleClickOpenDialog} style={{fontSize: 13}}>
            <Block style={{fontSize: 15}}/>
            Disable
          </IconButton>
        </Typography>

        <Dialog
          open={this.state.openDialog}
          onClose={this.handleCloseDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Disable this comment?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Do you want to disable this comment?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseDialog} color="primary">
              No
            </Button>
            <Button onClick={this.disableComment} color="primary" autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    )
  }
}

function mapStateToProps ({ comments }, { id, fnUpdate }) {
  const comment = comments[id]

  return {
  	comment
  }
}

export default connect(mapStateToProps)(Comment)