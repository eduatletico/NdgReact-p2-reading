import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
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
		        	: <Switch>
		        			<Route path='/' exact component={Home} />
		        			<Route path='/new/:id?' exact component={NewPost} />
		        			<Route path='/:category/:id' exact component={PostPage} />
		        			<Route path='/:category' exact component={CategoryPosts} />
		        		</Switch>
		      	}
		      </div>
		    </Fragment>
      </Router>
    )
  }
}

function mapStateToProps () {
	return {
		loading: false
	}
}

export default connect(mapStateToProps)(App)