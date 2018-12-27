import { getInitialData } from '../utils/api'
import { receivePosts, sortPostsByVote } from './posts'
import { receiveCategories } from './categories'
import { showLoading, hideLoading } from 'react-redux-loading'

export function handleInitialData () {
	return (dispatch) => {
		dispatch(showLoading())
		return getInitialData()
			.then(({ posts, categories }) => {
				dispatch(receivePosts(posts))
				dispatch(sortPostsByVote(posts))
				dispatch(receiveCategories(categories))
				dispatch(hideLoading())
			})
	}
}