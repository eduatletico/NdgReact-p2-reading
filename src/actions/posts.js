import { getCategoryPosts, savePost, updatePost, saveDisablePost, saveVotePost } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'

export const ADD_POST = 'ADD_POST'
export const EDIT_POST = 'EDIT_POST'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const SORT_POSTS_BY_DATE = 'SORT_POSTS_BY_DATE'
export const SORT_POSTS_BY_VOTE = 'SORT_POSTS_BY_VOTE'
export const RECEIVE_CATEGORY_POSTS = 'RECEIVE_CATEGORY_POSTS'
export const DISABLE_POST = 'DISABLE_POST'
export const VOTE_POST = 'VOTE_POST'

function addPost (post) {
	return {
		type: ADD_POST,
		post
	}
}

export function handleAddPost (title, body, author, category) {
	return (dispatch, getState) => {

		dispatch(showLoading())

		return savePost(
			title,
			body,
			author,
			category
		).then((post) => {
			dispatch(addPost(post))
			dispatch(sortPostsByVote(getState().posts))
			dispatch(hideLoading())
		})
	}
}

function editPost (post) {
	return {
		type: EDIT_POST,
		post
	}
}

export function handleEditPost (id, title, body) {
	return (dispatch, getState) => {

		dispatch(showLoading())

		return updatePost(
			id,
			title,
			body
		).then((post) => {
			dispatch(editPost(post))
			dispatch(sortPostsByVote(getState().posts))
			dispatch(hideLoading())
		})
	}
}

export function receivePosts (posts) {
	return {
		type: RECEIVE_POSTS,
		posts
	}
}
export function sortPostsByDate (posts) {
	return {
		type: SORT_POSTS_BY_DATE,
		posts
	}
}
export function sortPostsByVote (posts) {
	return {
		type: SORT_POSTS_BY_VOTE,
		posts
	}
}

export function receiveCategoryPosts (posts) {
	return {
		type: RECEIVE_CATEGORY_POSTS,
		posts
	}
}

export function handleReceiveCategoryPosts (category) {
	return (dispatch, getState) => {

		dispatch(showLoading())

		return getCategoryPosts(
			category
		).then((posts) => dispatch(receiveCategoryPosts(posts)))
			.then(() => dispatch(hideLoading()))
	}
}

function disablePost (post) {
	return {
		type: DISABLE_POST,
		post
	}
}

export function handleDisablePost (post) {
	return (dispatch, getState) => {

		return saveDisablePost(post)
			.catch((e) => {
				console.warn('Error in handleDisablePost: ', e)
				alert('There was an error disabling the post. Try again.')
			}).then((post) => {
				dispatch(disablePost(post))
				dispatch(sortPostsByVote(getState().posts))
			})
	}
}

function votePost (post, vote) {
	return {
		type: VOTE_POST,
		post,
		vote
	}
}

export function handleVotePost (post, vote) {
	return (dispatch, getState) => {

		dispatch(showLoading())

		return saveVotePost(post, vote)
			.catch((e) => {
				console.warn('Error in handleVotePost: ', e)
				dispatch(votePost(post, !vote))
				dispatch(hideLoading())
				alert('There was an error voting the post. Try again.')
			}).then((post) => {
				dispatch(votePost(post, vote))
				dispatch(sortPostsByVote(getState().posts))
				dispatch(hideLoading())
			})
	}
}