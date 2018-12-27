import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Home from './Home'
import LoadingBar from 'react-redux-loading'
import NewPost from './NewPost'
import CategoryPosts from './CategoryPosts'
import PostPage from './PostPage'


class App extends Component {
	componentDidMount() {
		this.props.dispatch(handleInitialData())
	}
  render() {
    return (
    	<Router>
    		<Fragment>
	      	<LoadingBar />
		      <div className='container'>

		      	{this.props.loading === true
		      		? null
		        	: <div>
		        			<Route path='/' exact component={Home} />
		        			<Route path='/post/:id' component={PostPage} />
		        			<Route path='/category/:category' component={CategoryPosts} />
		        			<Route path='/new/:id?' component={NewPost} />
		        		</div>
		      	}
		      </div>
		    </Fragment>
      </Router>
    )
  }
}

function mapStateToProps ({ authedUser }) {
	return {
		loading: false
	}
}

export default connect(mapStateToProps)(App)