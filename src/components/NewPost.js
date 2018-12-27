import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { handleAddPost, handleEditPost } from '../actions/posts'
import { Redirect, Link } from 'react-router-dom'

import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    alignItems: 'center',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 600,
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
    maxWidth: 620
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
  button: {
    margin: theme.spacing.unit,
  },grow: {
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

class NewPost extends Component {
	state = {
    title: '',
    body: '',
    author: '',
    category: '',
    toHome: false
  }

	isDisabled = () => {
    return this.state.title === '' || this.state.body === '' || this.state.author === '' || this.state.category === '';
  };


  handleValidateTitle = (event) => {
    this.setState({ title: event.target.value });
  }
  handleValidateBody = (event) => {
    this.setState({ body: event.target.value });
  }
  handleValidateAuthor = (event) => {
    this.setState({ author: event.target.value });
  }
  handleValidateCategory = (event) => {
    this.setState({ category: event.target.value });
  }

  handleSubmit = (e) => {
		e.preventDefault()

		const { title, body, author, category } = this.state
		const { dispatch } = this.props

		dispatch(handleAddPost(title, body, author, category))

		this.setState(() => ({
			title: '',
	    body: '',
	    author: '',
	    category: ''
		}))
	}

	clearState = () => {
		this.setState(() => ({
			title: '',
	    body: '',
	    author: '',
	    category: ''
		}))
	}

	handleEditPost = (e) => {
    e.preventDefault()

    const { dispatch, match } = this.props
    const { title, body } = this.state

    dispatch(handleEditPost(match.params.id, title, body))

    this.setState({ toHome: true })
  }

  componentDidMount () {
  	if (this.props.post) {
  		this.setState(() => ({
				title: this.props.post.title,
		    body: this.props.post.body,
		    author: this.props.post.author,
		    category: this.props.post.category
			}))
  	}
  }

	render () {
		window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true

		const { classes, categories, post } = this.props
		const { title, body, author, category, toHome } = this.state

		if (toHome === true) {
			return <Redirect to='/' />
		}

		return (
			<Fragment>

				<AppBar position="static" style={{height:64}}>
          <Toolbar>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              Nanodegree React - [P2] Readable - [{post===null ? 'New' : 'Edit'} Post]
            </Typography>
            <Link to={`/`} className={classes.link} style={{color:"inherit"}}>
              <Button color="inherit">Home</Button>
            </Link>
            { post !== null &&
            <Link to={`/new`} className={classes.link} style={{color:"inherit"}}>
              <Button onClick={this.clearState} color="inherit">New Post</Button>
            </Link>
          	}

          </Toolbar>
        </AppBar>

        <Grid container className={classes.root} spacing={16}>
          <Grid item xs={12}>
            <Paper className={classes.control}>
              <Grid container className={classes.demo} justify="center" spacing={24}>

								<form className={classes.container} noValidate autoComplete="off">
									<FormControl className={classes.formControl} >
						        <TextField
						          id="title"
						          label="Title"
						          value={title}
						          className={classes.textField}
						          margin="normal"
						          onChange={this.handleValidateTitle}
						        />
					        </FormControl>

					        <FormControl className={classes.formControl} >
						        <TextField
						          id="body"
						          label="Body"
						          value={body}
						          multiline
						          rows="4"
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
						          disabled={post!==null}
						          className={classes.textField}
						          margin="normal"
						          onChange={this.handleValidateAuthor}
						        />
					        </FormControl>

									<FormControl className={classes.formControl} >
						        <InputLabel htmlFor="category">Category</InputLabel>
					          <Select
					            native
					            value={category}
					            className={classes.textField}
					            disabled={post!==null}
					            onChange={this.handleValidateCategory}
					            inputProps={{
					              name: 'category',
					              id: 'category',
					            }}
					          >
					            <option value="" />
					            {categories.map((category) => <option key={category.name} value={category.name}>{category.name}</option>)}
					          </Select>
				          </FormControl>

					      	<FormControl className={classes.formControl} >
						      	<Button
						      		variant="contained"
						      		color="primary"
						      		className={classes.button}
						      		disabled={this.isDisabled()}
						      		onClick={post===null?this.handleSubmit:this.handleEditPost}
						      	>
							        Save
							      </Button>
						      </FormControl>

				      	</form>
	      			</Grid>
            </Paper>
          </Grid>
        </Grid>

			</Fragment>
		)
	}
}

function mapStateToProps ({ posts, categories }, props) {
	const { id } = props.match.params
	const post = id ? posts[id] : null

  return {
  	post,
    categories: Object.entries(categories).map(([idx, category]) => category)
  }
}

export default withStyles(styles)(connect(mapStateToProps)(NewPost))