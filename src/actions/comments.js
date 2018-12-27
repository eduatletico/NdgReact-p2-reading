import { getPostComments, saveComment, updateComment, saveDisableComment, saveVoteComment } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'

export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS'
export const ADD_COMMENT = 'ADD_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const DISABLE_COMMENT = 'DISABLE_COMMENT'
export const VOTE_COMMENT = 'VOTE_COMMENT'

function addComment (comment) {
	return {
		type: ADD_COMMENT,
		comment
	}
}

export function handleAddComment (body, author, parentId) {
	return (dispatch, getState) => {

		dispatch(showLoading())

		return saveComment(
			body,
			author,
			parentId
		).then((comment) => {
			dispatch(addComment(comment))
			dispatch(hideLoading())
		})

	}
}

function editComment (comment) {
	return {
		type: EDIT_COMMENT,
		comment
	}
}

export function handleEditComment (id, body) {
	return (dispatch, getState) => {

		dispatch(showLoading())

		return updateComment(
			id,
			body
		).then((comment) => {
			dispatch(editComment(comment))
			dispatch(hideLoading())
		})
	}
}

export function receiveComments (comments) {
	return {
		type: RECEIVE_COMMENTS,
		comments
	}
}

export function handleReceiveComments (parentId) {
	return (dispatch, getState) => {

		dispatch(showLoading())

		return getPostComments(
			parentId
		).then((comments) => dispatch(receiveComments(comments)))
			.then(() => dispatch(hideLoading()))
	}
}

function disableComment (comment) {
	return {
		type: DISABLE_COMMENT,
		comment
	}
}

export function handleDisableComment (comment) {
	return (dispatch) => {

		return saveDisableComment(comment)
			.catch((e) => {
				console.warn('Error in handleDisableComment: ', e)
				alert('There was an error disabling the comment. Try again.')
			}).then((comment) => {
				dispatch(disableComment(comment))
			})
	}
}

function voteComment (comment, vote) {
	return {
		type: VOTE_COMMENT,
		comment,
		vote
	}
}

export function handleVoteComment (comment, vote) {
	return (dispatch, getState) => {

		dispatch(showLoading())

		return saveVoteComment(comment, vote)
			.catch((e) => {
				console.warn('Error in handleVoteComment: ', e)
				dispatch(voteComment(comment, !vote))
				dispatch(hideLoading())
				alert('There was an error voting the comment. Try again.')
			}).then((comment) => {
				dispatch(voteComment(comment, vote))
				dispatch(hideLoading())
			})
	}
}