import { RECEIVE_COMMENTS, ADD_COMMENT, EDIT_COMMENT, DISABLE_COMMENT, VOTE_COMMENT } from '../actions/comments'

export default function posts (state = {}, action) {
	switch (action.type) {
		case RECEIVE_COMMENTS:
			return {
				...state,
				...action.comments
			}
		case ADD_COMMENT:
			return {
				...state,
				[action.comment.id]: action.comment
			}
		case EDIT_COMMENT:
			return {
				...state,
				[action.comment.id]: action.comment
			}
		case VOTE_COMMENT:
			return {
				...state,
				[action.comment.id]: action.comment
			}
		case DISABLE_COMMENT:
			return {
				...state,
				[action.comment.id]: {
					...state[action.comment.id],
					deleted: action.comment.deleted
				}
			}
		default:
			return state
	}
}