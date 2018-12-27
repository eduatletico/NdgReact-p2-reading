import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddComment, handleEditComment } from '../actions/comments'

import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

import Typography from '@material-ui/core/Typography'
import FormControl from '@material-ui/core/FormControl'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

const styles = theme => ({
	root: {
		marginTop: '15px',
		display: 'flex',
    flexWrap: 'wrap',
	},
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    alignItems: 'center',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 300,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
  button: {
    margin: theme.spacing.unit,
  },
});

class NewComment extends Component {
	state = {
    body: '',
    author: ''
  }

	isDisabled = () => {
    return this.state.body === '' || this.state.author === '';
  };


  handleValidateBody = (event) => {
    this.setState({ body: event.target.value });
  }
  handleValidateAuthor = (event) => {
    this.setState({ author: event.target.value });
  }

  handleSubmit = (e) => {
		e.preventDefault()

		const { body, author } = this.state
		const { dispatch, parentId } = this.props

		dispatch(handleAddComment(body, author, parentId))

		this.setState(() => ({
	    body: '',
	    author: ''
		}))
	}

	cancelEdit = (e) => {
    e.preventDefault()

    const { fnUpdate } = this.props

    fnUpdate(null)

    this.setState(() => ({
	    body: '',
	    author: ''
		}))
  }

  handleEditComment = (e) => {
    e.preventDefault()

    const { dispatch, comment, fnUpdate } = this.props
    const { body } = this.state

    dispatch(handleEditComment(comment.id, body))

    fnUpdate(null)

    this.setState(() => ({
	    body: '',
	    author: ''
		}))
  }

  componentWillReceiveProps (props) {
  	if (props.id !== null) {
  		this.setState(() => ({
		    body: props.comment.body,
		    author: props.comment.author
			}))
  	}
  }

  componentDidMount () {
  	if (this.props.comment) {
  		this.setState(() => ({
		    body: this.props.comment.body,
		    author: this.props.comment.author
			}))
  	}
  }

	render () {
		const { classes, comment } = this.props
		const { body, author } = this.state

		return (
			<Grid container className={classes.root} spacing={16}>
        <Grid item xs={12}>
          <Paper className={classes.control}>
            <Grid container className={classes.demo} justify="center" spacing={24}>

            	<Typography variant="h5" color="textSecondary" style={{width: '100%', textAlign: 'center', marginTop: '10px'}}>
            		{comment===null ? 'New ' : 'Edit '}Comment
            	</Typography>

							<form className={classes.container} noValidate autoComplete="off">
								<FormControl className={classes.formControl} >
					        <TextField
					          id="body"
					          label="Body"
					          value={body}
					          multiline
					          rows="3"
					          className={classes.textField}
					          margin="normal"
					          onChange={this.handleValidateBody}
					        />
				        </FormControl>

								<FormControl className={classes.formControl} >
					        <TextField
					          id="author"
					          label="Author"
					          value={author}
					          disabled={comment!==null}
					          className={classes.textField}
					          margin="normal"
					          onChange={this.handleValidateAuthor}
					        />
				        </FormControl>

				      	<FormControl className={classes.formControl} >
					      	<Button
					      		variant="contained"
					      		color="primary"
					      		className={classes.button}
					      		disabled={this.isDisabled()}
					      		onClick={comment===null?this.handleSubmit:this.handleEditComment}
					      	>
						        Save Comment
						      </Button>
					      </FormControl>

					      { comment !== null &&
						      <FormControl className={classes.formControl} >
						      	<Button
						      		variant="contained"
						      		color="primary"
						      		className={classes.button}
						      		onClick={this.cancelEdit}
						      	>
							        Cancel
							      </Button>
						      </FormControl>
					    	}

			      	</form>
      			</Grid>
          </Paper>
        </Grid>
      </Grid>
		)
	}
}

function mapStateToProps ({ comments }, { id, parentId, fnUpdate }) {
	const comment = id ? comments[id] : null

  return {
  	comment
  }
}

export default withStyles(styles)(connect(mapStateToProps)(NewComment))